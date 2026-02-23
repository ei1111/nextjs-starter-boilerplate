"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"

export default function JoinPage() {
  const t = useTranslations("auth")
  const router = useRouter()
  const { signup } = useAuth()
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== passwordConfirm) {
      setError(t("password_mismatch"))
      return
    }

    if (password.length < 8) {
      setError(t("password_min"))
      return
    }

    setIsLoading(true)
    const result = await signup(nickname, email, password)
    setIsLoading(false)

    if (result.success) {
      router.push("/")
    } else {
      setError(result.error || t("signup_failed"))
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
          </Link>
          <h1 className="mt-4 text-xl font-bold text-foreground">{t("signup_title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("signup_desc")}</p>
        </div>

        {/* Social Signup */}
        <div className="space-y-2.5">
          <Button variant="outline" className="w-full gap-2 h-11" type="button">
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {t("google_signup")}
          </Button>
          <Button
            variant="outline"
            className="w-full gap-2 h-11 bg-[#FEE500] border-[#FEE500] text-[#3C1E1E] hover:bg-[#FDD835] hover:border-[#FDD835] hover:text-[#3C1E1E]"
            type="button"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#3C1E1E" aria-hidden="true">
              <path d="M12 3C6.48 3 2 6.36 2 10.44c0 2.62 1.75 4.93 4.38 6.24-.19.73-.7 2.64-.8 3.05-.13.52.19.51.4.37.17-.11 2.61-1.77 3.67-2.49.75.11 1.54.17 2.35.17 5.52 0 10-3.36 10-7.34S17.52 3 12 3z" />
            </svg>
            {t("kakao_signup")}
          </Button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">또는</span>
          <Separator className="flex-1" />
        </div>

        {/* Email Signup */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-sm font-medium">{t("nickname")}</Label>
            <Input
              id="nickname"
              type="text"
              placeholder={t("nickname_placeholder")}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              className="h-11"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("password_min_hint")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="h-11"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="passwordConfirm" className="text-sm font-medium">{t("confirm_password")}</Label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder={t("password_placeholder")}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              minLength={8}
              className="h-11"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full h-11 rounded-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("signup_loading")}
              </>
            ) : (
              t("signup_btn")
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t("have_account")}{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            {t("login_btn")}
          </Link>
        </p>
      </div>
    </div>
  )
}
