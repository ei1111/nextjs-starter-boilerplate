"use client"

import Link from "next/link"
import { Lock, ShoppingCart } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Badge } from "@/components/ui/badge"
import type { Prompt, AIModel } from "@/lib/mock-data"

const MODEL_COLORS: Record<AIModel, string> = {
  ChatGPT: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Midjourney: "bg-blue-50 text-blue-700 border-blue-200",
  "DALL-E": "bg-orange-50 text-orange-700 border-orange-200",
  "Stable Diffusion": "bg-pink-50 text-pink-700 border-pink-200",
  Claude: "bg-amber-50 text-amber-700 border-amber-200",
  Gemini: "bg-indigo-50 text-indigo-700 border-indigo-200",
}

const CARD_GRADIENTS = [
  "from-blue-50 via-indigo-50 to-blue-100",
  "from-emerald-50 via-teal-50 to-emerald-100",
  "from-orange-50 via-amber-50 to-orange-100",
  "from-pink-50 via-rose-50 to-pink-100",
  "from-indigo-50 via-violet-50 to-indigo-100",
  "from-teal-50 via-cyan-50 to-teal-100",
  "from-amber-50 via-yellow-50 to-amber-100",
  "from-sky-50 via-blue-50 to-sky-100",
]

export function PromptCard({ prompt, index }: { prompt: Prompt; index: number }) {
  const t = useTranslations("prompts")
  const tDetail = useTranslations("prompt_detail")
  const locale = useLocale()
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length]

  return (
    <Link href={`/${locale}/prompts/${prompt.id}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Thumbnail */}
        <div className={`relative aspect-[4/3] bg-gradient-to-br ${gradient}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
              <Lock className="h-8 w-8" />
              <span className="text-xs font-medium">{tDetail("preview")}</span>
            </div>
          </div>
          <div className="absolute left-3 top-3">
            <Badge
              variant="outline"
              className={`border text-xs font-medium ${MODEL_COLORS[prompt.model]}`}
            >
              {prompt.model}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {prompt.title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {prompt.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-base font-bold text-foreground">
              {prompt.price.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground ml-0.5">{t("price_unit")}</span>
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ShoppingCart className="h-3 w-3" />
              <span>{prompt.salesCount.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
              {prompt.sellerName[0]}
            </div>
            <span className="text-xs text-muted-foreground">{prompt.sellerName}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
