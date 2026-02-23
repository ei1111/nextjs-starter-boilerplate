"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

const AUTH_STORAGE_KEY = "promptly_user"

export interface User {
  id: string
  nickname: string
  email: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (nickname: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simulated user store (in real app, this would be a database)
const STORED_USERS: { email: string; password: string; nickname: string; role: "user" | "admin" }[] = [
  { email: "admin@promptly.kr", password: "admin1234", nickname: "관리자", role: "admin" },
  { email: "user@promptly.kr", password: "user1234", nickname: "프롬프트마스터", role: "user" },
]

function loadStoredUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const u = JSON.parse(raw) as User
    return u?.email ? u : null
  } catch {
    return null
  }
}

function saveUser(user: User | null) {
  if (typeof window === "undefined") return
  if (user) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  else localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadStoredUser())

  useEffect(() => {
    // 혹시 hydration 이후 동기화가 필요한 경우를 대비
    const stored = loadStoredUser()
    if (stored && !user) setUser(stored)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const found = STORED_USERS.find((u) => u.email === email && u.password === password)
    if (found) {
      const newUser: User = {
        id: found.email === "admin@promptly.kr" ? "admin-1" : "user-" + Date.now(),
        nickname: found.nickname,
        email: found.email,
        role: found.role,
      }
      setUser(newUser)
      saveUser(newUser)
      return { success: true }
    }
    return { success: false, error: "이메일 또는 비밀번호가 올바르지 않습니다." }
  }, [])

  const signup = useCallback(async (nickname: string, email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const exists = STORED_USERS.find((u) => u.email === email)
    if (exists) {
      return { success: false, error: "이미 가입된 이메일입니다." }
    }

    STORED_USERS.push({ email, password, nickname, role: "user" })
    const newUser: User = {
      id: "user-" + Date.now(),
      nickname,
      email,
      role: "user",
    }
    setUser(newUser)
    saveUser(newUser)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    saveUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
