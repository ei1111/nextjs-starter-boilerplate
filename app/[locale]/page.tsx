import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection, PromptGrid } from "@/components/home-sections"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <PromptGrid />
      </main>
      <SiteFooter />
    </div>
  )
}
