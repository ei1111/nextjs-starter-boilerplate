"use client"

import { useState } from "react"
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PromptCard } from "@/components/prompt-card"
import { PROMPTS, AI_MODELS } from "@/lib/mock-data"
import type { AIModel } from "@/lib/mock-data"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 dark:opacity-10" />
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-6 gap-1.5 border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            {t("badge")}
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t("title_1")}
            <br />
            <span className="text-primary">{t("title_2")}</span>
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="rounded-full gap-2 px-6" asChild>
              <a href="#prompts">
                {t("cta_browse")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-6" asChild>
              <Link href="/prompts/new">{t("cta_sell")}</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold text-foreground">2,400+</span>
              </div>
              <span className="text-xs text-muted-foreground">{t("stat_prompts")}</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold text-foreground">15,000+</span>
              </div>
              <span className="text-xs text-muted-foreground">{t("stat_transactions")}</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <span className="text-2xl font-bold text-foreground">4,800+</span>
              <p className="text-xs text-muted-foreground">{t("stat_users")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ModelFilter({
  selected,
  onSelect,
}: {
  selected: AIModel | null
  onSelect: (model: AIModel | null) => void
}) {
  const t = useTranslations("prompts")

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          selected === null
            ? "bg-foreground text-background"
            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
        }`}
      >
        {t("all")}
      </button>
      {AI_MODELS.map((model) => (
        <button
          key={model.name}
          onClick={() => onSelect(model.name)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selected === model.name
              ? "bg-foreground text-background"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          {model.name}
        </button>
      ))}
    </div>
  )
}

export function PromptGrid() {
  const t = useTranslations("prompts")
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null)

  const filteredPrompts = selectedModel
    ? PROMPTS.filter((p) => p.model === selectedModel)
    : PROMPTS

  return (
    <section id="prompts" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{t("popular_title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("popular_desc")}</p>
          </div>
          <ModelFilter selected={selectedModel} onSelect={setSelectedModel} />
        </div>

        {filteredPrompts.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPrompts.map((prompt, index) => (
              <PromptCard key={prompt.id} prompt={prompt} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center gap-3 py-12">
            <p className="text-lg font-medium text-muted-foreground">{t("no_results")}</p>
            <p className="text-sm text-muted-foreground">{t("no_results_desc")}</p>
          </div>
        )}
      </div>
    </section>
  )
}
