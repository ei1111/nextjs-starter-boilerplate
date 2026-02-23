"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { Prompt } from "@/lib/mock-data"

const CART_STORAGE_KEY = "promptly_cart"

export interface CartItem {
  prompt: Prompt
  addedAt: string
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  totalPrice: number
  addToCart: (prompt: Prompt) => void
  removeFromCart: (promptId: string) => void
  clearCart: () => void
  isInCart: (promptId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function loadStoredCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CartItem[]
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    setItems(loadStoredCart())
  }, [])

  const addToCart = useCallback((prompt: Prompt) => {
    setItems((prev) => {
      if (prev.some((item) => item.prompt.id === prompt.id)) return prev
      const next = [...prev, { prompt, addedAt: new Date().toISOString() }]
      saveCart(next)
      return next
    })
  }, [])

  const removeFromCart = useCallback((promptId: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.prompt.id !== promptId)
      saveCart(next)
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    saveCart([])
  }, [])

  const isInCart = useCallback(
    (promptId: string) => items.some((item) => item.prompt.id === promptId),
    [items]
  )

  const totalPrice = items.reduce((sum, item) => sum + item.prompt.price, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount: items.length,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
