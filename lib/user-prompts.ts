import type { Prompt } from "./mock-data"

const STORAGE_KEY = "promptly_user_prompts"

function safeParse(value: string | null): Prompt[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    // 최소한 id와 title이 있는 객체만 유효한 프롬프트로 간주
    return parsed.filter(
      (p) => p && typeof p === "object" && "id" in p && "title" in p,
    ) as Prompt[]
  } catch {
    return []
  }
}

export function getUserPrompts(): Prompt[] {
  if (typeof window === "undefined") return []
  const raw = window.localStorage.getItem(STORAGE_KEY)
  return safeParse(raw)
}

export function saveUserPrompts(prompts: Prompt[]): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts))
  } catch {
    // localStorage가 가득 찼거나 비활성화된 경우는 조용히 무시
  }
}

export function addUserPrompt(prompt: Prompt): Prompt {
  const current = getUserPrompts()
  const next = [...current, prompt]
  saveUserPrompts(next)
  return prompt
}

export function findUserPromptById(id: string): Prompt | undefined {
  const current = getUserPrompts()
  return current.find((p) => p.id === id)
}

