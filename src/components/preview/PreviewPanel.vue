<script setup lang="ts">
import type { ResumeData } from '@/types/resume'
import ResumePreview from './ResumePreview.vue'

defineProps<{
  resume: ResumeData
}>()
</script>

<template>
  <div class="flex justify-center">
    <ResumePreview :resume="resume" />
  </div>
</template>
