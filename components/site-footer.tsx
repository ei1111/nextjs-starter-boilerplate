"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Sparkles } from "lucide-react"

export function SiteFooter() {
  const t = useTranslations("footer")

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">PromptLy</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">{t("marketplace")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">{t("browse")}</Link></li>
              <li><Link href="/prompts/new" className="hover:text-foreground">{t("sell")}</Link></li>
              <li><Link href="/mypage" className="hover:text-foreground">{t("mypage")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">{t("ai_models")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-default">ChatGPT</span></li>
              <li><span className="cursor-default">Midjourney</span></li>
              <li><span className="cursor-default">DALL-E</span></li>
              <li><span className="cursor-default">Stable Diffusion</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">{t("support")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-default">{t("terms")}</span></li>
              <li><span className="cursor-default">{t("privacy")}</span></li>
              <li><span className="cursor-default">{t("faq")}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/40 pt-6">
          <p className="text-center text-xs text-muted-foreground">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
