import { redirect } from "next/navigation"

// proxy.ts handles locale detection and redirects to /ko/admin or /en/admin
export default function AdminRootPage() {
  redirect("/ko/admin")
}
