"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import {
  ArrowLeft,
  Lock,
  Copy,
  Check,
  ShoppingCart,
  CreditCard,
  User,
  Calendar,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PROMPTS } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"
import type { AIModel } from "@/lib/mock-data"

const MODEL_COLORS: Record<AIModel, string> = {
  ChatGPT: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Midjourney: "bg-blue-50 text-blue-700 border-blue-200",
  "DALL-E": "bg-orange-50 text-orange-700 border-orange-200",
  "Stable Diffusion": "bg-pink-50 text-pink-700 border-pink-200",
  Claude: "bg-amber-50 text-amber-700 border-amber-200",
  Gemini: "bg-indigo-50 text-indigo-700 border-indigo-200",
}

const CARD_GRADIENTS: Record<string, string> = {
  "1": "from-blue-50 via-indigo-50 to-blue-100",
  "2": "from-emerald-50 via-teal-50 to-emerald-100",
  "3": "from-orange-50 via-amber-50 to-orange-100",
  "4": "from-pink-50 via-rose-50 to-pink-100",
  "5": "from-indigo-50 via-violet-50 to-indigo-100",
  "6": "from-teal-50 via-cyan-50 to-teal-100",
  "7": "from-amber-50 via-yellow-50 to-amber-100",
  "8": "from-sky-50 via-blue-50 to-sky-100",
}

export default function PromptDetailPage() {
  const t = useTranslations("prompt_detail")
  const params = useParams()
  const id = params.id as string
  const prompt = PROMPTS.find((p) => p.id === id)
  const [isPurchased, setIsPurchased] = useState(false)
  const [copied, setCopied] = useState(false)
  const { isLoggedIn } = useAuth()
  const { addToCart, isInCart } = useCart()

  if (!prompt) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">{t("not_found")}</h1>
            <p className="mt-2 text-muted-foreground">{t("not_found_desc")}</p>
            <Button asChild className="mt-6 rounded-full">
              <Link href="/">{t("back_home")}</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const handleCopy = () => {
    if (prompt.content) {
      navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error(t("login_required"), { description: t("login_required_desc") })
      return
    }
    addToCart(prompt)
    toast.success(t("added_to_cart"), { description: prompt.title })
  }

  const inCart = isInCart(prompt.id)
  const gradient = CARD_GRADIENTS[prompt.id] || "from-blue-50 via-indigo-50 to-blue-100"

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/prompts"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left: Image & Description */}
            <div className="lg:col-span-3">
              <div className={`aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br ${gradient}`}>
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground/40">
                    <Lock className="h-12 w-12" />
                    <span className="text-sm font-medium">{t("preview")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground">{t("detail_desc")}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {prompt.fullDescription || prompt.description}
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground">{t("prompt_content")}</h2>
                {isPurchased ? (
                  <div className="mt-3">
                    <div className="relative rounded-lg border border-border bg-foreground/[0.03] p-4">
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground font-mono">
                        {prompt.content}
                      </pre>
                      <button
                        onClick={handleCopy}
                        className="absolute right-3 top-3 rounded-md border border-border bg-white p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={t("copy")}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{t("variable_hint")}</p>
                  </div>
                ) : (
                  <div className="mt-3 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-12">
                    <Lock className="h-10 w-10 text-muted-foreground/40" />
                    <p className="mt-3 text-sm font-medium text-muted-foreground">{t("unlock_hint")}</p>
                    <p className="mt-1 text-xs text-muted-foreground/60">{t("unlock_sub")}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Purchase Panel */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm dark:bg-secondary/30">
                <Badge
                  variant="outline"
                  className={`mb-3 text-xs font-medium ${MODEL_COLORS[prompt.model]}`}
                >
                  {prompt.model}
                </Badge>
                <h1 className="text-xl font-bold leading-snug text-foreground">{prompt.title}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{prompt.description}</p>

                <Separator className="my-5" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{t("seller")}</span>
                    <span className="ml-auto font-medium text-foreground">{prompt.sellerName}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <ShoppingCart className="h-4 w-4" />
                    <span>{t("sales")}</span>
                    <span className="ml-auto font-medium text-foreground">
                      {prompt.salesCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{t("registered")}</span>
                    <span className="ml-auto font-medium text-foreground">{prompt.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    <span>{t("ai_model")}</span>
                    <span className="ml-auto font-medium text-foreground">{prompt.model}</span>
                  </div>
                </div>

                <Separator className="my-5" />

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {prompt.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">{t("price_unit")}</span>
                </div>

                {isPurchased ? (
                  <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
                    <p className="text-sm font-medium text-emerald-700">
                      {t("purchased_badge")} {t("purchased_desc")}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-2.5">
                    <Button
                      size="lg"
                      className="w-full gap-2 rounded-full text-base"
                      onClick={() => setIsPurchased(true)}
                    >
                      <CreditCard className="h-4 w-4" />
                      {t("purchase")}
                    </Button>
                    {inCart ? (
                      <Button size="lg" variant="outline" className="w-full gap-2 rounded-full text-base" asChild>
                        <Link href="/cart">
                          <ShoppingCart className="h-4 w-4" />
                          {t("view_cart")}
                        </Link>
                      </Button>
                    ) : (
                      <Button size="lg" variant="outline" className="w-full gap-2 rounded-full text-base" onClick={handleAddToCart}>
                        <ShoppingCart className="h-4 w-4" />
                        {t("add_to_cart")}
                      </Button>
                    )}
                  </div>
                )}

                <p className="mt-3 text-center text-xs text-muted-foreground">{t("unlock_hint")}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
