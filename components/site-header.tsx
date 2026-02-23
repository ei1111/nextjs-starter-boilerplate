"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Search, Menu, X, Sparkles, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { LocaleSwitcher } from "@/components/locale-switcher"

export function SiteHeader() {
  const t = useTranslations("nav")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { isLoggedIn, user, logout } = useAuth()
  const { itemCount } = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/prompts?q=${encodeURIComponent(searchQuery.trim())}`)
      setMobileMenuOpen(false)
    }
  }

  const loggedIn = mounted && isLoggedIn
  const cartCount = mounted ? itemCount : 0

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">PromptLy</span>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-full border-border/60 bg-secondary/50 pl-9 pr-4 text-sm focus-visible:ring-primary/30"
            />
          </form>
        </div>

        {/* Actions - Desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" asChild className="text-sm text-muted-foreground hover:text-foreground">
            <Link href="/prompts/new">{t("sell")}</Link>
          </Button>
          <ThemeToggle />
          <LocaleSwitcher />
          {user?.role === "admin" && mounted && (
            <Button variant="ghost" size="sm" asChild className="text-sm text-muted-foreground hover:text-foreground">
              <Link href="/admin" className="gap-1.5">
                <LayoutDashboard className="h-4 w-4" />
                {t("admin")}
              </Link>
            </Button>
          )}
          {loggedIn ? (
            <>
              <Button variant="ghost" size="sm" asChild className="relative rounded-full text-muted-foreground hover:text-foreground">
                <Link href="/cart" className="flex items-center gap-1.5">
                  <span className="text-base">🛒</span>
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="rounded-full">
                <Link href="/mypage">👤</Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-muted-foreground hover:text-foreground"
                onClick={() => logout()}
              >
                <LogOut className="h-4 w-4 md:mr-1" />
                <span className="hidden md:inline">{t("logout")}</span>
              </Button>
            </>
          ) : (
            <Button size="sm" asChild className="rounded-full">
              <Link href="/auth/login">{t("login")}</Link>
            </Button>
          )}
        </nav>

        {/* Mobile: Theme + Locale + Menu Toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <LocaleSwitcher />
          <button
            className="flex items-center justify-center p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t("menu_close") : t("menu_open")}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background px-4 pb-4 pt-3 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-full bg-secondary/50 pl-9 pr-4 text-sm"
            />
          </form>
          <div className="flex flex-col gap-2">
            <Link
              href="/prompts/new"
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("sell")}
            </Link>
            {user?.role === "admin" && mounted && (
              <Link
                href="/admin"
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                {t("admin")}
              </Link>
            )}
            {loggedIn ? (
              <>
                <Link
                  href="/cart"
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-base">🛒</span>
                  {t("cart")}
                  {cartCount > 0 && (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/mypage"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-primary flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-base">👤</span>
                  {t("mypage")}
                </Link>
                <button
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary flex items-center gap-2 w-full text-left"
                  onClick={() => { logout(); setMobileMenuOpen(false) }}
                >
                  <LogOut className="h-4 w-4" />
                  {t("logout")}
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("login")}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
