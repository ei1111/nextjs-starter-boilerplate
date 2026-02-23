// This layout is a placeholder.
// proxy.ts (middleware) handles locale detection and redirects
// all /admin requests to /ko/admin or /en/admin automatically.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
