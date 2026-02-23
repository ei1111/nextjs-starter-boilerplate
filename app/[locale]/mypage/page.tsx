"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import {
  ShoppingBag,
  Store,
  Wallet,
  ArrowLeft,
  ArrowRight,
  Banknote,
  TrendingUp,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MY_PURCHASES, MY_SALES } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"

export default function MyPage() {
  const t = useTranslations("mypage")
  const tUnit = useTranslations("prompt_detail")
  const router = useRouter()
  const { user, isLoggedIn } = useAuth()
  const totalRevenue = MY_SALES.reduce((sum, s) => sum + s.totalRevenue, 0)
  const totalSalesCount = MY_SALES.reduce((sum, s) => sum + s.salesCount, 0)

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoggedIn) {
      router.replace("/auth/login?redirect=/mypage")
    }
  }, [isLoggedIn, router])

  if (typeof window !== "undefined" && !isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center">
            <p className="text-muted-foreground">{t("title")}</p>
            <Button asChild className="mt-4 rounded-full">
              <Link href="/auth/login">{t("back_home")}</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const displayName = user?.nickname ?? "User"
  const displayEmail = user?.email ?? ""

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
            {t("back_home")}
          </Link>

          {/* Profile Header */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              {displayName[0]?.toUpperCase() ?? "P"}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{displayName}</h1>
              <p className="text-sm text-muted-foreground">{displayEmail}</p>
            </div>
          </div>

          {/* Revenue Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-white p-5 dark:bg-secondary/30">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4" />
                <span>{t("monthly_revenue")}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {totalRevenue.toLocaleString()}
                <span className="ml-1 text-sm font-normal text-muted-foreground">{t("unit_won")}</span>
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 dark:bg-secondary/30">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>{t("total_sales")}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {totalSalesCount.toLocaleString()}
                <span className="ml-1 text-sm font-normal text-muted-foreground">{t("unit_count")}</span>
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 dark:bg-secondary/30">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <ShoppingBag className="h-4 w-4" />
                <span>{t("purchased_prompts")}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {MY_PURCHASES.length}
                <span className="ml-1 text-sm font-normal text-muted-foreground">{t("unit_count")}</span>
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="purchases" className="w-full">
            <TabsList className="w-full justify-start rounded-lg bg-secondary/50 p-1">
              <TabsTrigger value="purchases" className="gap-1.5 rounded-md text-sm">
                <ShoppingBag className="h-3.5 w-3.5" />
                {t("tab_purchases")}
              </TabsTrigger>
              <TabsTrigger value="sales" className="gap-1.5 rounded-md text-sm">
                <Store className="h-3.5 w-3.5" />
                {t("tab_sales")}
              </TabsTrigger>
              <TabsTrigger value="revenue" className="gap-1.5 rounded-md text-sm">
                <Banknote className="h-3.5 w-3.5" />
                {t("tab_revenue")}
              </TabsTrigger>
            </TabsList>

            {/* Purchases Tab */}
            <TabsContent value="purchases" className="mt-6">
              {MY_PURCHASES.length > 0 ? (
                <div className="space-y-3">
                  {MY_PURCHASES.map((purchase) => (
                    <Link
                      key={purchase.id}
                      href={`/prompts/${purchase.promptId}`}
                      className="group flex items-center justify-between rounded-xl border border-border bg-white p-4 transition-all hover:shadow-md dark:bg-secondary/30"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {purchase.promptTitle}
                        </h3>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {purchase.purchasedAt}
                          </span>
                          <span className="font-medium text-foreground">
                            {purchase.price.toLocaleString()}{tUnit("price_unit")}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground/30" />
                  <p className="mt-3 text-sm text-muted-foreground">{t("no_purchases")}</p>
                  <Button asChild variant="outline" className="mt-4 rounded-full" size="sm">
                    <Link href="/">{t("browse_prompts")}</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Sales Tab */}
            <TabsContent value="sales" className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{t("my_prompts")}</p>
                <Button asChild size="sm" className="rounded-full" variant="outline">
                  <Link href="/prompts/new">{t("register_new")}</Link>
                </Button>
              </div>
              {MY_SALES.length > 0 ? (
                <div className="space-y-3">
                  {MY_SALES.map((sale) => (
                    <div
                      key={sale.id}
                      className="flex items-center justify-between rounded-xl border border-border bg-white p-4 dark:bg-secondary/30"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground truncate">
                          {sale.promptTitle}
                        </h3>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{t("sales_count", { count: sale.salesCount.toLocaleString() })}</span>
                          <span className="font-medium text-foreground">
                            {t("revenue_amount", { amount: sale.totalRevenue.toLocaleString() })}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                        {t("status_on_sale")}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <Store className="h-10 w-10 text-muted-foreground/30" />
                  <p className="mt-3 text-sm text-muted-foreground">{t("no_sales")}</p>
                  <Button asChild variant="outline" className="mt-4 rounded-full" size="sm">
                    <Link href="/prompts/new">{t("start_selling")}</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Revenue Tab */}
            <TabsContent value="revenue" className="mt-6">
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-white p-6 dark:bg-secondary/30">
                  <h3 className="text-base font-semibold text-foreground">{t("revenue_summary")}</h3>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("total_sales_amount")}</span>
                      <span className="font-medium text-foreground">
                        {(totalRevenue / 0.8).toLocaleString()}{tUnit("price_unit")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("commission")}</span>
                      <span className="font-medium text-red-500">
                        -{(totalRevenue / 0.8 * 0.2).toLocaleString()}{tUnit("price_unit")}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">{t("settlement_amount")}</span>
                      <span className="text-lg font-bold text-primary">
                        {totalRevenue.toLocaleString()}{tUnit("price_unit")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-white p-6 dark:bg-secondary/30">
                  <h3 className="text-base font-semibold text-foreground">{t("settlement_info")}</h3>
                  <Separator className="my-4" />
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>{t("settlement_cycle")}</p>
                    <p>{t("settlement_min")}</p>
                    <p>{t("settlement_fee")}</p>
                  </div>
                  <Button variant="outline" className="mt-4 rounded-full" size="sm">
                    {t("register_account")}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
