export type AIModel = "ChatGPT" | "Midjourney" | "DALL-E" | "Stable Diffusion" | "Claude" | "Gemini"

export interface Prompt {
  id: string
  title: string
  description: string
  model: AIModel
  price: number
  thumbnailUrl: string
  sellerName: string
  sellerAvatar: string
  salesCount: number
  createdAt: string
  content?: string
  fullDescription?: string
}

export const AI_MODELS: { name: AIModel; icon: string; color: string }[] = [
  { name: "ChatGPT", icon: "MessageSquare", color: "bg-emerald-100 text-emerald-700" },
  { name: "Midjourney", icon: "Image", color: "bg-blue-100 text-blue-700" },
  { name: "DALL-E", icon: "Palette", color: "bg-orange-100 text-orange-700" },
  { name: "Stable Diffusion", icon: "Sparkles", color: "bg-pink-100 text-pink-700" },
  { name: "Claude", icon: "Brain", color: "bg-amber-100 text-amber-700" },
  { name: "Gemini", icon: "Gem", color: "bg-indigo-100 text-indigo-700" },
]

export const PROMPTS: Prompt[] = [
  {
    id: "1",
    title: "블로그 글 자동 생성 프롬프트",
    description: "SEO 최적화된 블로그 글을 자동으로 생성하는 프롬프트입니다. 주제만 입력하면 완벽한 구조의 글이 생성됩니다.",
    model: "ChatGPT",
    price: 5900,
    thumbnailUrl: "",
    sellerName: "프롬프트마스터",
    sellerAvatar: "",
    salesCount: 342,
    createdAt: "2026-01-15",
    fullDescription: "이 프롬프트는 SEO에 최적화된 블로그 글을 자동으로 생성합니다. 주제, 키워드, 톤앤매너를 입력하면 서론-본론-결론 구조의 완벽한 블로그 글이 생성됩니다. H2/H3 태그 구조, 메타 디스크립션까지 자동으로 포함됩니다.",
    content: "당신은 SEO 전문 블로그 작가입니다. 다음 조건에 따라 블로그 글을 작성하세요:\n\n1. 주제: {{topic}}\n2. 핵심 키워드: {{keywords}}\n3. 톤앤매너: {{tone}}\n4. 글 길이: {{length}}자 이상\n\n작성 규칙:\n- H2, H3 소제목을 적절히 활용\n- 각 단락은 3-4문장으로 구성\n- 자연스러운 키워드 배치 (밀도 1-2%)\n- 독자의 궁금증을 유발하는 서론\n- 실행 가능한 팁이 담긴 결론\n- 메타 디스크립션 (150자 이내) 별도 작성",
  },
  {
    id: "2",
    title: "시네마틱 풍경 사진 생성",
    description: "영화 같은 분위기의 풍경 이미지를 생성하는 Midjourney 프롬프트입니다.",
    model: "Midjourney",
    price: 8900,
    thumbnailUrl: "",
    sellerName: "AI아티스트",
    sellerAvatar: "",
    salesCount: 567,
    createdAt: "2026-01-20",
    fullDescription: "할리우드 영화의 한 장면 같은 시네마틱 풍경 사진을 생성합니다. 다양한 시간대, 계절, 장소를 설정할 수 있으며, 항상 영화적인 색감과 구도를 유지합니다.",
    content: "cinematic landscape of {{location}}, golden hour lighting, shot on Arri Alexa, anamorphic lens flare, {{season}} atmosphere, volumetric fog, dramatic clouds, color grading like {{movie_reference}}, 8k resolution, photorealistic --ar 21:9 --v 6 --style raw",
  },
  {
    id: "3",
    title: "마케팅 카피라이팅 마스터",
    description: "설득력 있는 마케팅 카피를 자동으로 생성합니다. 제품/서비스에 맞는 최적의 카피를 제안합니다.",
    model: "ChatGPT",
    price: 12900,
    thumbnailUrl: "",
    sellerName: "카피장인",
    sellerAvatar: "",
    salesCount: 891,
    createdAt: "2026-01-25",
    fullDescription: "AIDA, PAS 등 검증된 카피라이팅 프레임워크를 활용하여 설득력 있는 마케팅 카피를 생성합니다. SNS 광고, 랜딩페이지, 이메일 마케팅 등 다양한 채널에 맞는 카피를 제안합니다.",
    content: "당신은 10년차 카피라이터입니다. {{framework}} 프레임워크를 사용하여 다음 제품의 마케팅 카피를 작성하세요.\n\n제품/서비스: {{product}}\n타겟 고객: {{target}}\n주요 혜택: {{benefits}}\n채널: {{channel}}\n톤: {{tone}}",
  },
  {
    id: "4",
    title: "제품 사진 리터칭 프롬프트",
    description: "상품 사진을 프로페셔널하게 편집하는 DALL-E 프롬프트입니다.",
    model: "DALL-E",
    price: 6900,
    thumbnailUrl: "",
    sellerName: "디자인프로",
    sellerAvatar: "",
    salesCount: 234,
    createdAt: "2026-02-01",
    fullDescription: "e커머스에 최적화된 제품 사진을 생성합니다. 깔끔한 배경, 전문적인 라이팅, 그림자 처리까지 완벽한 제품 이미지를 만들어냅니다.",
    content: "professional product photography of {{product}}, clean white background, soft studio lighting, subtle shadow, commercial quality, high-end look, 4k, sharp details",
  },
  {
    id: "5",
    title: "AI 코드 리뷰어 프롬프트",
    description: "시니어 개발자처럼 코드를 리뷰해주는 프롬프트입니다. 버그, 성능, 보안 이슈를 탐지합니다.",
    model: "Claude",
    price: 9900,
    thumbnailUrl: "",
    sellerName: "개발의신",
    sellerAvatar: "",
    salesCount: 456,
    createdAt: "2026-02-05",
    fullDescription: "시니어 개발자 수준의 코드 리뷰를 제공합니다. 버그 탐지, 성능 최적화 제안, 보안 취약점 분석, 클린 코드 원칙 적용 등을 포함한 종합적인 코드 리뷰를 수행합니다.",
    content: "당신은 15년 경력의 시니어 소프트웨어 엔지니어입니다. 다음 코드를 리뷰하세요:\n\n```{{language}}\n{{code}}\n```\n\n다음 기준으로 리뷰하세요:\n1. 버그 및 논리적 오류\n2. 성능 최적화 포인트\n3. 보안 취약점\n4. 코드 가독성 및 유지보수성\n5. 디자인 패턴 적용 가능성",
  },
  {
    id: "6",
    title: "판타지 캐릭터 일러스트",
    description: "게임이나 소설에 사용할 수 있는 고퀄리티 판타지 캐릭터를 생성합니다.",
    model: "Stable Diffusion",
    price: 7900,
    thumbnailUrl: "",
    sellerName: "아트마법사",
    sellerAvatar: "",
    salesCount: 678,
    createdAt: "2026-02-10",
    fullDescription: "게임 아트, 소설 표지, 캐릭터 컨셉에 활용할 수 있는 고품질 판타지 캐릭터 일러스트를 생성합니다. 다양한 종족, 직업, 스타일을 지원합니다.",
    content: "fantasy character portrait, {{race}} {{class}}, {{art_style}} style, detailed armor and weapons, dynamic pose, magical aura, intricate details, masterpiece quality, best quality, ultra-detailed",
  },
  {
    id: "7",
    title: "비즈니스 이메일 자동 작성",
    description: "상황에 맞는 비즈니스 이메일을 전문적으로 작성해주는 프롬프트입니다.",
    model: "Gemini",
    price: 4900,
    thumbnailUrl: "",
    sellerName: "비즈니스헬퍼",
    sellerAvatar: "",
    salesCount: 345,
    createdAt: "2026-02-12",
    fullDescription: "비즈니스 상황별 (미팅 요청, 제안서 발송, 사과, 감사 등) 전문적인 이메일을 자동으로 작성합니다. 영어/한국어 모두 지원합니다.",
    content: "당신은 글로벌 기업에서 10년간 커뮤니케이션을 담당한 전문가입니다.\n\n다음 상황에 맞는 비즈니스 이메일을 작성하세요:\n\n상황: {{situation}}\n수신자: {{recipient}}\n관계: {{relationship}}\n언어: {{language}}\n톤: {{tone}}",
  },
  {
    id: "8",
    title: "인스타그램 피드 디자인",
    description: "통일감 있는 인스타그램 피드 이미지를 생성하는 프롬프트입니다.",
    model: "Midjourney",
    price: 11900,
    thumbnailUrl: "",
    sellerName: "SNS마스터",
    sellerAvatar: "",
    salesCount: 789,
    createdAt: "2026-02-15",
    fullDescription: "브랜드 아이덴티티에 맞는 통일감 있는 인스타그램 피드 이미지를 생성합니다. 컬러 팔레트, 스타일, 구도 등을 일관성 있게 유지하여 전문적인 SNS 피드를 만들 수 있습니다.",
    content: "minimalist Instagram feed layout, {{brand_color}} color palette, {{style}} aesthetic, clean typography, modern design, flat lay composition, consistent visual identity --ar 1:1 --v 6",
  },
]

export interface Purchase {
  id: string
  promptId: string
  promptTitle: string
  purchasedAt: string
  price: number
}

export interface Sale {
  id: string
  promptId: string
  promptTitle: string
  salesCount: number
  totalRevenue: number
}

export const MY_PURCHASES: Purchase[] = [
  { id: "p1", promptId: "1", promptTitle: "블로그 글 자동 생성 프롬프트", purchasedAt: "2026-02-10", price: 5900 },
  { id: "p2", promptId: "2", promptTitle: "시네마틱 풍경 사진 생성", purchasedAt: "2026-02-12", price: 8900 },
  { id: "p3", promptId: "5", promptTitle: "AI 코드 리뷰어 프롬프트", purchasedAt: "2026-02-18", price: 9900 },
]

export const MY_SALES: Sale[] = [
  { id: "s1", promptId: "3", promptTitle: "마케팅 카피라이팅 마스터", salesCount: 891, totalRevenue: 891 * 12900 * 0.8 },
  { id: "s2", promptId: "7", promptTitle: "비즈니스 이메일 자동 작성", salesCount: 345, totalRevenue: 345 * 4900 * 0.8 },
]

/** 관리자: 달별 매출 (총 매출액 = 판매가 합계, 플랫폼 수수료 20% 제외 후 판매자 정산) */
export interface MonthlyRevenue {
  yearMonth: string
  totalSalesAmount: number
  platformFee: number
  sellerPayout: number
  orderCount: number
}

export const ADMIN_MONTHLY_REVENUE: MonthlyRevenue[] = [
  { yearMonth: "2026-02", totalSalesAmount: 12_450_000, platformFee: 2_490_000, sellerPayout: 9_960_000, orderCount: 342 },
  { yearMonth: "2026-01", totalSalesAmount: 18_320_000, platformFee: 3_664_000, sellerPayout: 14_656_000, orderCount: 521 },
  { yearMonth: "2025-12", totalSalesAmount: 15_100_000, platformFee: 3_020_000, sellerPayout: 12_080_000, orderCount: 418 },
  { yearMonth: "2025-11", totalSalesAmount: 9_800_000, platformFee: 1_960_000, sellerPayout: 7_840_000, orderCount: 276 },
  { yearMonth: "2025-10", totalSalesAmount: 7_200_000, platformFee: 1_440_000, sellerPayout: 5_760_000, orderCount: 198 },
]
