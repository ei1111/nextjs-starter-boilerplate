"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { routing } from "@/i18n/routing"

export function LocaleSwitcher() {
  const t = useTranslations("locale")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full w-9 h-9 p-0 text-muted-foreground hover:text-foreground"
          aria-label={locale === "ko" ? "언어 변경" : "Change language"}
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleChange(loc)}
            className={locale === loc ? "font-semibold text-primary" : ""}
          >
            {t(loc)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
