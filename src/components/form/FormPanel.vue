<script setup lang="ts">
import type { ResumeData } from '@/types/resume'
import BasicsForm from './BasicsForm.vue'
import EducationForm from './EducationForm.vue'
import ProjectsForm from './ProjectsForm.vue'
import CompetitionForm from './CompetitionForm.vue'
import AwardForm from './AwardForm.vue'

defineProps<{
  resume: ResumeData
}>()

const emit = defineEmits<{
  addEducation: []
  removeEducation: [id: string]
  addProject: []
  removeProject: [id: string]
  addCompetition: []
  removeCompetition: [id: string]
  addAward: []
  removeAward: [id: string]
}>()
</script>

<template>
  <div class="pb-8">
    <BasicsForm
      :basics="resume.basics"
      :basics-field-order="resume.basicsFieldOrder"
      @update:basics-field-order="resume.basicsFieldOrder = $event"
    />
    <EducationForm
      :list="resume.education"
      @add="emit('addEducation')"
      @remove="(id: string) => emit('removeEducation', id)"
    />
    <ProjectsForm
      :list="resume.projects"
      @add="emit('addProject')"
      @remove="(id: string) => emit('removeProject', id)"
    />
    <CompetitionForm
      :list="resume.competitions"
      @add="emit('addCompetition')"
      @remove="(id: string) => emit('removeCompetition', id)"
    />
    <AwardForm
      :list="resume.awards"
      @add="emit('addAward')"
      @remove="(id: string) => emit('removeAward', id)"
    />
  </div>
</template>
