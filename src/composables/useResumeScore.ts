import { ref } from 'vue'
import type { ResumeData } from '@/types/resume'

export interface ScoreDimension {
  key: string
  label: string
  score: number
  suggestions: string[]
}

export interface ScoreResult {
  total: number
  dimensions: ScoreDimension[]
  aiSuggestions: string[]
}

const AI_KEY_STORAGE = 'resume-ai-key'
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions'

function scoreBasics(basics: ResumeData['basics']): ScoreDimension {
  const fields = ['name', 'email', 'phone', 'title', 'location'] as const
  const labels: Record<string, string> = { name: '姓名', email: '邮箱', phone: '电话', title: '求职意向', location: '地址' }
  const filled = fields.filter(k => basics[k])
  const suggestions: string[] = []
  for (const k of fields) {
    if (!basics[k]) suggestions.push(`请填写${labels[k]}`)
  }
  return {
    key: 'basics',
    label: '基本信息完整度',
    score: Math.round((filled.length / fields.length) * 100),
    suggestions,
  }
}

function scoreEducation(list: ResumeData['education']): ScoreDimension {
  const suggestions: string[] = []
  if (list.length === 0) {
    suggestions.push('请添加教育经历')
    return { key: 'education', label: '教育经历', score: 0, suggestions }
  }
  let total = 0
  for (const item of list) {
    if (!item.school || !item.major) {
      if (!item.school) suggestions.push('请填写学校名称')
      if (!item.major) suggestions.push('请填写专业名称')
      continue
    }
    let s = 100
    if (!item.school) s -= 25
    if (!item.major) s -= 25
    if (!item.degree) s -= 25
    if (!item.startDate || !item.endDate) s -= 25
    total += Math.max(0, s)
  }
  return { key: 'education', label: '教育经历', score: Math.round(total / list.length), suggestions }
}

function scoreProjects(list: ResumeData['projects']): ScoreDimension {
  const suggestions: string[] = []
  if (list.length === 0) {
    suggestions.push('请添加项目经历')
    return { key: 'projects', label: '项目经历', score: 0, suggestions }
  }
  let total = 0
  for (const item of list) {
    let s = 0
    if (item.name) s += 30
    if (item.role) s += 15
    const hl = item.highlights?.filter(Boolean) ?? []
    if (hl.length > 0) s += Math.min(hl.length * 15, 40)
    if (item.description && item.description.length > 10) s += 15
    total += s
  }
  if (list.every(p => !p.highlights?.filter(Boolean).length)) suggestions.push('项目经历建议补充具体工作亮点')
  return { key: 'projects', label: '项目经历', score: Math.round(total / list.length), suggestions }
}

function scoreAwards(competitions: ResumeData['competitions'], awards: ResumeData['awards']): ScoreDimension {
  const suggestions: string[] = []
  const total = competitions.length + awards.length
  if (total === 0) {
    suggestions.push('建议补充竞赛或奖励经历以增强竞争力')
    return { key: 'awards', label: '竞赛奖励', score: 0, suggestions }
  }
  const score = Math.min(total * 25, 100)
  return { key: 'awards', label: '竞赛奖励', score, suggestions }
}

function scoreRichness(resume: ResumeData): ScoreDimension {
  const suggestions: string[] = []
  const allFields = [
    resume.basics.name, resume.basics.email, resume.basics.phone,
    resume.basics.title, resume.basics.location, resume.basics.summary,
    ...resume.education.flatMap(e => [e.school, e.major, e.degree]),
    ...resume.projects.flatMap(p => [p.name, p.description, ...(p.highlights ?? [])]),
    ...resume.competitions.flatMap(c => [c.name, c.description, ...(c.highlights ?? [])]),
    ...resume.awards.flatMap(a => [a.name, a.description]),
  ]
  const nonEmpty = allFields.filter(Boolean).length
  const score = Math.min(Math.round((nonEmpty / Math.max(allFields.length, 1)) * 100), 100)
  if (nonEmpty < 5) suggestions.push('整体内容较少，建议补充更多详细信息')
  return { key: 'richness', label: '总体丰富度', score, suggestions }
}

export function scoreResume(resume: ResumeData): ScoreResult {
  const dims = [
    scoreBasics(resume.basics),
    scoreEducation(resume.education),
    scoreProjects(resume.projects),
    scoreAwards(resume.competitions, resume.awards),
    scoreRichness(resume),
  ]
  const weights = [0.25, 0.20, 0.25, 0.15, 0.15]
  const total = Math.round(dims.reduce((sum, d, i) => sum + d.score * weights[i], 0))
  return { total, dimensions: dims, aiSuggestions: [] }
}

export function getApiKey(): string {
  return localStorage.getItem(AI_KEY_STORAGE) || ''
}

export function setApiKey(key: string): void {
  localStorage.setItem(AI_KEY_STORAGE, key)
}

export async function fetchAISuggestions(resume: ResumeData, apiKey: string): Promise<string[]> {
  const prompt = `你是一位资深HR/简历顾问。请分析以下简历数据，从招聘者的角度给出3-5条具体的改进建议。

简历数据：
\`\`\`json
${JSON.stringify({
    基本信息: { 姓名: resume.basics.name, 邮箱: resume.basics.email, 电话: resume.basics.phone, 求职意向: resume.basics.title, 地址: resume.basics.location, 个人简介: resume.basics.summary },
    教育经历: resume.education.map(e => ({ 学校: e.school, 专业: e.major, 学历: e.degree, 时间: `${e.startDate}-${e.endDate}` })),
    项目经历: resume.projects.map(p => ({ 名称: p.name, 角色: p.role, 时间: `${p.startDate}-${p.endDate}`, 描述: p.description, 亮点: p.highlights })),
    竞赛经历: resume.competitions.map(c => ({ 名称: c.name, 角色: c.role, 时间: c.date, 描述: c.description, 亮点: c.highlights })),
    奖励荣誉: resume.awards.map(a => ({ 名称: a.name, 描述: a.description, 时间: a.date })),
   }, null, 2)}
\`\`\`

要求：
1. 每条建议用一句话，不超过50字
2. 按优先级从高到低排列
3. 返回JSON数组格式：["建议1", "建议2", ...]`

  const response = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    }),
  })
  if (!response.ok) throw new Error(`API 请求失败: ${response.status}`)
  const data = await response.json()
  const content = data.choices?.[0]?.message?.content || '[]'
  const cleaned = content.replace(/```(?:json)?\s*/g, '').trim()
  try {
    const parsed = JSON.parse(cleaned)
    return Array.isArray(parsed) ? parsed : [content]
  } catch {
    return [content]
  }
}

export function useResumeScore() {
  const result = ref<ScoreResult | null>(null)
  const aiLoading = ref(false)
  const aiError = ref('')

  function score(resume: ResumeData) {
    result.value = scoreResume(resume)
  }

  async function scoreWithAI(resume: ResumeData) {
    const apiKey = getApiKey()
    if (!apiKey) {
      aiError.value = '请先配置 API Key'
      return
    }
    score(resume)
    aiLoading.value = true
    aiError.value = ''
    try {
      const suggestions = await fetchAISuggestions(resume, apiKey)
      if (result.value) result.value.aiSuggestions = suggestions
    } catch (e: any) {
      aiError.value = e.message || 'AI 评分失败'
    } finally {
      aiLoading.value = false
    }
  }

  return { result, aiLoading, aiError, score, scoreWithAI }
}
