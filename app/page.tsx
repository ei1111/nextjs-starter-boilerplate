import { redirect } from "next/navigation"

// middleware.ts handles locale detection and redirection.
// This is a fallback for edge cases.
export default function RootPage() {
  redirect("/ko")
}
