"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Upload, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AI_MODELS } from "@/lib/mock-data"

export default function NewPromptPage() {
  const t = useTranslations("prompt_new")
  const [title, setTitle] = useState("")
  const [model, setModel] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [promptContent, setPromptContent] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = e.dataTransfer.files
    if (files?.[0]) setFileName(files[0].name)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.[0]) setFileName(files[0].name)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center bg-background">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{t("success_title")}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t("success_desc")}</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button asChild className="rounded-full">
                <Link href="/">{t("success_home")}</Link>
              </Button>
              <Button variant="outline" asChild className="rounded-full">
                <Link href="/mypage">{t("success_mypage")}</Link>
              </Button>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("title")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                {t("field_title")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder={t("field_title_placeholder")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model" className="text-sm font-medium">
                {t("field_model")} <span className="text-red-500">*</span>
              </Label>
              <Select value={model} onValueChange={setModel} required>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={t("field_model_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {AI_MODELS.map((m) => (
                    <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                {t("field_price")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="5900"
                min={0}
                step={100}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">{t("field_price_hint")}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                {t("field_description")} <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder={t("field_description_placeholder")}
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="promptContent" className="text-sm font-medium">
                {t("field_content")} <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="promptContent"
                placeholder={t("field_content_placeholder")}
                rows={8}
                value={promptContent}
                onChange={(e) => setPromptContent(e.target.value)}
                required
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">{t("field_content_hint")}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("field_image")}</Label>
              <div
                className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {fileName ? (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{fileName}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">
                      {t("image_drag")}{" "}
                      <label className="cursor-pointer font-medium text-primary hover:underline">
                        {t("image_select")}
                        <input type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
                      </label>
                      하세요
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/60">{t("image_hint")}</p>
                  </>
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full text-base"
              disabled={isSubmitting || !title || !model || !price || !description || !promptContent}
            >
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
