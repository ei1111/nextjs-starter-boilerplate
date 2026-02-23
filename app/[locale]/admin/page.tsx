"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, LayoutDashboard, TrendingUp, Banknote, ShoppingCart, Calendar } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ADMIN_MONTHLY_REVENUE } from "@/lib/mock-data"

export default function AdminPage() {
  const t = useTranslations("admin")
  const totalRevenue = ADMIN_MONTHLY_REVENUE.reduce((sum, m) => sum + m.totalSalesAmount, 0)
  const totalOrders = ADMIN_MONTHLY_REVENUE.reduce((sum, m) => sum + m.orderCount, 0)
  const totalPlatformFee = ADMIN_MONTHLY_REVENUE.reduce((sum, m) => sum + m.platformFee, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back_home")}
          </Link>

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <LayoutDashboard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
              <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
            </div>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-secondary/30">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>{t("total_revenue")}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {totalRevenue.toLocaleString()}
                <span className="ml-1 text-sm font-normal text-muted-foreground">{t("unit_won")}</span>
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-secondary/30">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Banknote className="h-4 w-4" />
                <span>{t("platform_fee")}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-primary">
                {totalPlatformFee.toLocaleString()}
                <span className="ml-1 text-sm font-normal text-muted-foreground">{t("unit_won")}</span>
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-secondary/30">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <ShoppingCart className="h-4 w-4" />
                <span>{t("total_orders")}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {totalOrders.toLocaleString()}
                <span className="ml-1 text-sm font-normal text-muted-foreground">{t("unit_count")}</span>
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden dark:bg-secondary/30">
            <div className="border-b border-border bg-muted/30 px-5 py-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {t("monthly_table_title")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("monthly_table_desc")}</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("col_period")}</TableHead>
                  <TableHead className="text-right">{t("col_sales")}</TableHead>
                  <TableHead className="text-right">{t("col_fee")}</TableHead>
                  <TableHead className="text-right">{t("col_payout")}</TableHead>
                  <TableHead className="text-right">{t("col_orders")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ADMIN_MONTHLY_REVENUE.map((row) => (
                  <TableRow key={row.yearMonth}>
                    <TableCell className="font-medium">{row.yearMonth}</TableCell>
                    <TableCell className="text-right">
                      {row.totalSalesAmount.toLocaleString()}{t("unit_won")}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      -{row.platformFee.toLocaleString()}{t("unit_won")}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.sellerPayout.toLocaleString()}{t("unit_won")}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.orderCount.toLocaleString()}{t("unit_count")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-white p-5 dark:bg-secondary/30">
            <h3 className="text-sm font-semibold text-foreground">{t("settlement_info")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t("settlement_desc")}</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
