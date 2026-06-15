<script setup lang="ts">
import type { ResumeData } from '@/types/resume'
import BasicsForm from './BasicsForm.vue'
import EducationForm from './EducationForm.vue'
import ExperienceForm from './ExperienceForm.vue'
import SkillsForm from './SkillsForm.vue'
import ProjectsForm from './ProjectsForm.vue'

defineProps<{
  resume: ResumeData
}>()

const emit = defineEmits<{
  addEducation: []
  removeEducation: [id: string]
  addExperience: []
  removeExperience: [id: string]
  addProject: []
  removeProject: [id: string]
}>()
</script>

<template>
  <div class="pb-8">
    <BasicsForm :basics="resume.basics" />
    <EducationForm
      :list="resume.education"
      @add="emit('addEducation')"
      @remove="(id: string) => emit('removeEducation', id)"
    />
    <ExperienceForm
      :list="resume.experience"
      @add="emit('addExperience')"
      @remove="(id: string) => emit('removeExperience', id)"
    />
    <SkillsForm :skills="resume.skills" />
    <ProjectsForm
      :list="resume.projects"
      @add="emit('addProject')"
      @remove="(id: string) => emit('removeProject', id)"
    />
  </div>
</template>
