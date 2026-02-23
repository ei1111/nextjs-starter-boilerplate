"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Trash2, ShoppingCart, CreditCard, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import type { AIModel } from "@/lib/mock-data"

const MODEL_COLORS: Record<AIModel, string> = {
  ChatGPT: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Midjourney: "bg-blue-50 text-blue-700 border-blue-200",
  "DALL-E": "bg-orange-50 text-orange-700 border-orange-200",
  "Stable Diffusion": "bg-pink-50 text-pink-700 border-pink-200",
  Claude: "bg-amber-50 text-amber-700 border-amber-200",
  Gemini: "bg-indigo-50 text-indigo-700 border-indigo-200",
}

export default function CartPage() {
  const t = useTranslations("cart")
  const tUnit = useTranslations("prompt_detail")
  const { isLoggedIn } = useAuth()
  const { items, totalPrice, removeFromCart, clearCart } = useCart()

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center bg-background">
          <div className="text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground/30" />
            <h1 className="mt-4 text-xl font-bold text-foreground">{t("login_required")}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t("login_required_desc")}</p>
            <Button asChild className="mt-6 rounded-full">
              <Link href="/auth/login">{t("login_btn")}</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("continue_shopping")}
          </Link>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("title")}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("items_count", { count: items.length })}
              </p>
            </div>
            {items.length > 0 && (
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={clearCart}>
                <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                {t("clear_all")}
              </Button>
            )}
          </div>

          {items.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.prompt.id}
                    className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 dark:bg-secondary/30"
                  >
                    <Link
                      href={`/prompts/${item.prompt.id}`}
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-secondary"
                    >
                      <Package className="h-6 w-6 text-muted-foreground/40" />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/prompts/${item.prompt.id}`}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.prompt.title}
                      </Link>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline" className={`text-[10px] ${MODEL_COLORS[item.prompt.model]}`}>
                          {item.prompt.model}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.prompt.sellerName}</span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-sm font-bold text-foreground">
                        {item.prompt.price.toLocaleString()}{tUnit("price_unit")}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.prompt.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
                        aria-label={t("remove")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-xl border border-border bg-white p-6 dark:bg-secondary/30">
                  <h2 className="text-base font-semibold text-foreground">{t("order_summary")}</h2>
                  <Separator className="my-4" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>{t("items_count", { count: items.length })}</span>
                      <span>{totalPrice.toLocaleString()}{tUnit("price_unit")}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>{t("discount")}</span>
                      <span>0{tUnit("price_unit")}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{t("total_payment")}</span>
                      <span className="text-xl font-bold text-primary">
                        {totalPrice.toLocaleString()}{tUnit("price_unit")}
                      </span>
                    </div>
                  </div>

                  <Button size="lg" className="mt-6 w-full gap-2 rounded-full">
                    <CreditCard className="h-4 w-4" />
                    {t("pay_with_card")}
                  </Button>

                  <p className="mt-3 text-center text-[11px] text-muted-foreground">
                    {t("instant_access")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <ShoppingCart className="h-12 w-12 text-muted-foreground/30" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">{t("empty")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("empty_desc")}</p>
              <Button asChild className="mt-6 rounded-full" variant="outline">
                <Link href="/prompts">{t("browse")}</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
