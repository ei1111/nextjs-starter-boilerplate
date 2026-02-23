const PURCHASE_KEY = "promptly_purchased_prompt_ids"

function safeParseIds(value: string | null): string[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id) => typeof id === "string")
  } catch {
    return []
  }
}

export function getPurchasedPromptIds(): string[] {
  if (typeof window === "undefined") return []
  const raw = window.localStorage.getItem(PURCHASE_KEY)
  return safeParseIds(raw)
}

export function savePurchasedPromptIds(ids: string[]): void {
  if (typeof window === "undefined") return
  try {
    const unique = Array.from(new Set(ids))
    window.localStorage.setItem(PURCHASE_KEY, JSON.stringify(unique))
  } catch {
    // localStorage 오류는 조용히 무시
  }
}

export function addPurchasedPromptIds(ids: string[]): void {
  if (ids.length === 0) return
  const current = getPurchasedPromptIds()
  savePurchasedPromptIds([...current, ...ids])
}

export function isPromptPurchased(id: string): boolean {
  if (!id) return false
  const current = getPurchasedPromptIds()
  return current.includes(id)
}

