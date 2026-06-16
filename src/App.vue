<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import MainLayout from './components/MainLayout.vue'
import FormPanel from './components/form/FormPanel.vue'
import PreviewPanel from './components/preview/PreviewPanel.vue'
import { useResume } from './composables/useResume'

const { resume, addEducation, removeEducation, addProject, removeProject, addCompetition, removeCompetition, addAward, removeAward, exportPDF } = useResume()
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :on-export="exportPDF" />
    <MainLayout>
      <template #form>
        <FormPanel
          :resume="resume"
          @add-education="addEducation"
          @remove-education="removeEducation"
          @add-project="addProject"
          @remove-project="removeProject"
          @add-competition="addCompetition"
          @remove-competition="removeCompetition"
          @add-award="addAward"
          @remove-award="removeAward"
        />
      </template>
      <template #preview>
        <PreviewPanel :resume="resume" />
      </template>
    </MainLayout>
  </div>
</template>
