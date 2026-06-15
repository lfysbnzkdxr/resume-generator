import { useLocalStorage } from '@vueuse/core'
import { createEmptyResume, type ResumeData, type Education, type Experience, type Project } from '@/types/resume'

export function useResume() {
  const resume = useLocalStorage<ResumeData>('resume-data', createEmptyResume())

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

  function addExperience(): void {
    const newItem: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: [],
    }
    resume.value.experience.push(newItem)
  }

  function removeExperience(id: string): void {
    resume.value.experience = resume.value.experience.filter(e => e.id !== id)
  }

  function addProject(): void {
    const newItem: Project = {
      id: crypto.randomUUID(),
      name: '',
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

  function exportPDF(): void {
    window.print()
  }

  return {
    resume,
    addEducation,
    removeEducation,
    addExperience,
    removeExperience,
    addProject,
    removeProject,
    exportPDF,
  }
}
