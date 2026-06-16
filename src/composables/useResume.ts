import { useLocalStorage } from '@vueuse/core'
import { createEmptyResume, BASIC_FIELD_KEYS, type ResumeData, type Education, type Project, type Competition, type Award } from '@/types/resume'

export function useResume() {
  const resume = useLocalStorage<ResumeData>('resume-data', createEmptyResume())

  // 数据迁移：补齐旧 localStorage 数据中可能缺失的新字段
  if (!resume.value.basicsFieldOrder) {
    resume.value.basicsFieldOrder = [...BASIC_FIELD_KEYS]
  }
  if (resume.value.basics.birthday === undefined) {
    resume.value.basics.birthday = ''
  }
  if (!resume.value.competitions) {
    resume.value.competitions = []
  }
  if (!resume.value.awards) {
    resume.value.awards = []
  }
  // 数据迁移：为已有 project 条目补齐 url 字段
  for (const p of resume.value.projects) {
    if ((p as any).url === undefined) (p as any).url = ''
  }

  function addEducation(): void {
    const newItem: Education = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
    }
    resume.value.education.push(newItem)
  }

  function removeEducation(id: string): void {
    resume.value.education = resume.value.education.filter(e => e.id !== id)
  }

  function addProject(): void {
    const newItem: Project = {
      id: crypto.randomUUID(),
      name: '',
      url: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      highlights: [],
    }
    resume.value.projects.push(newItem)
  }

  function removeProject(id: string): void {
    resume.value.projects = resume.value.projects.filter(p => p.id !== id)
  }

  function addCompetition(): void {
    const newItem: Competition = {
      id: crypto.randomUUID(),
      name: '',
      role: '',
      date: '',
      description: '',
      highlights: [],
    }
    resume.value.competitions.push(newItem)
  }

  function removeCompetition(id: string): void {
    resume.value.competitions = resume.value.competitions.filter(c => c.id !== id)
  }

  function addAward(): void {
    const newItem: Award = {
      id: crypto.randomUUID(),
      name: '',
      date: '',
      description: '',
    }
    resume.value.awards.push(newItem)
  }

  function removeAward(id: string): void {
    resume.value.awards = resume.value.awards.filter(a => a.id !== id)
  }

  function exportPDF(): void {
    const previewEl = document.querySelector('.print-page')
    if (!previewEl) return

    const iframe = document.createElement('iframe')
    iframe.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:210mm;height:297mm;border:none;'
    document.body.appendChild(iframe)

    const iframeDoc = iframe.contentWindow!.document
    iframeDoc.open()
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @page { size: A4; margin: 15mm 20mm; }
          html, body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background: white;
            margin: 0;
            padding: 0;
          }
          ${Array.from(document.styleSheets).map(sheet => {
            try {
              const rules = sheet.cssRules || sheet.rules
              if (rules) return Array.from(rules).map(r => r.cssText).join('')
            } catch {}
            return ''
          }).join('')}
        </style>
      </head>
      <body>${previewEl.outerHTML}</body>
      </html>
    `)
    iframeDoc.close()

    iframe.contentWindow!.onafterprint = () => {
      document.body.removeChild(iframe)
    }

    setTimeout(() => {
      iframe.contentWindow!.print()
    }, 100)
  }

  return {
    resume,
    addEducation,
    removeEducation,
    addProject,
    removeProject,
    addCompetition,
    removeCompetition,
    addAward,
    removeAward,
    exportPDF,
  }
}
