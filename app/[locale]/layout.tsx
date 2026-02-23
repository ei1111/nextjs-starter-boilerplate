import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { AuthProvider } from "@/lib/auth-context"
import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { routing } from "@/i18n/routing"
import type { Locale } from "@/i18n/routing"
import "../globals.css"

const siteMetadata: Record<Locale, { title: string; description: string }> = {
  ko: {
    title: "PromptLy - AI 프롬프트 마켓플레이스",
    description:
      "최고의 AI 프롬프트를 사고팔 수 있는 마켓플레이스. ChatGPT, Midjourney, DALL-E 등 다양한 AI 모델의 프롬프트를 만나보세요.",
  },
  en: {
    title: "PromptLy - AI Prompt Marketplace",
    description:
      "The marketplace to buy and sell the best AI prompts. Discover verified prompts for ChatGPT, Midjourney, DALL-E and more.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const meta = siteMetadata[locale as Locale] ?? siteMetadata.en

  return {
    title: meta.title,
    description: meta.description,
    icons: {
      icon: [
        { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
        { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon.png",
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <CartProvider>
                {children}
                <Toaster />
              </CartProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
