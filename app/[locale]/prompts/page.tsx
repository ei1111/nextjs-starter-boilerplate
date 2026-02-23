"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Search, SlidersHorizontal, ArrowUpDown, Grid3X3, LayoutList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PromptCard } from "@/components/prompt-card"
import { PROMPTS, AI_MODELS } from "@/lib/mock-data"
import type { AIModel } from "@/lib/mock-data"

type SortOption = "popular" | "newest" | "price-asc" | "price-desc"
type ViewMode = "grid" | "list"

export default function BrowsePage() {
  const t = useTranslations("prompts")
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("q") ?? "")
  const [selectedModel, setSelectedModel] = useState<AIModel | "all">("all")
  const [sortBy, setSortBy] = useState<SortOption>("popular")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  useEffect(() => {
    const q = searchParams.get("q")
    if (q) setSearch(q)
  }, [searchParams])

  const filteredPrompts = useMemo(() => {
    let result = [...PROMPTS]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sellerName.toLowerCase().includes(q)
      )
    }

    if (selectedModel !== "all") {
      result = result.filter((p) => p.model === selectedModel)
    }

    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.salesCount - a.salesCount)
        break
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
    }

    return result
  }, [search, selectedModel, sortBy])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t("browse_title")}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {t("browse_desc_total", { total: PROMPTS.length, filtered: filteredPrompts.length })}
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("search_placeholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 pl-9 pr-4"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-1 flex-wrap items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
                <button
                  onClick={() => setSelectedModel("all")}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    selectedModel === "all"
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {t("all")}
                </button>
                {AI_MODELS.map((model) => (
                  <button
                    key={model.name}
                    onClick={() => setSelectedModel(model.name)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      selectedModel === model.name
                        ? "bg-foreground text-background"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="h-9 w-[140px] gap-1 text-xs">
                    <ArrowUpDown className="h-3 w-3" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">{t("sort_popular")}</SelectItem>
                    <SelectItem value="newest">{t("sort_newest")}</SelectItem>
                    <SelectItem value="price-asc">{t("sort_price_asc")}</SelectItem>
                    <SelectItem value="price-desc">{t("sort_price_desc")}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center rounded-lg border border-border">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex h-9 w-9 items-center justify-center transition-colors ${
                      viewMode === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label={t("grid_view")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex h-9 w-9 items-center justify-center transition-colors ${
                      viewMode === "list" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label={t("list_view")}
                  >
                    <LayoutList className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredPrompts.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPrompts.map((prompt, index) => (
                  <PromptCard key={prompt.id} prompt={prompt} index={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPrompts.map((prompt) => (
                  <Link
                    key={prompt.id}
                    href={`/prompts/${prompt.id}`}
                    className="group flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-all hover:shadow-md dark:bg-secondary/30"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-muted-foreground">
                      {prompt.model.substring(0, 3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {prompt.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground truncate">{prompt.description}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <Badge variant="outline" className="text-xs">
                        {prompt.model}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {t("sales_count", { count: prompt.salesCount.toLocaleString() })}
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {prompt.price.toLocaleString()}{t("price_unit")}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <Search className="h-10 w-10 text-muted-foreground/30" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">{t("no_search_results")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("no_search_desc")}</p>
              <Button
                variant="outline"
                className="mt-4 rounded-full"
                onClick={() => {
                  setSearch("")
                  setSelectedModel("all")
                }}
              >
                {t("reset_filter")}
              </Button>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
