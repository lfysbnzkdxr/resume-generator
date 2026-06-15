<script setup lang="ts">
import type { ResumeData } from '@/types/resume'

defineProps<{
  resume: ResumeData
}>()

function formatDate(start: string, end: string, current?: boolean): string {
  if (current) return `${start} - 至今`
  if (!start && !end) return ''
  return `${start} - ${end}`
}
</script>

<template>
  <div class="print-page mx-auto w-[210mm] bg-white px-[20mm] py-[15mm] shadow-lg" style="min-height: 297mm;">
    <!-- 基本信息区 -->
    <div class="mb-6 border-b-2 border-primary pb-4">
      <h1 class="text-3xl font-bold text-gray-900">{{ resume.basics.name || '你的姓名' }}</h1>
      <p class="mt-1 text-lg text-gray-600">{{ resume.basics.title || '求职意向' }}</p>
      <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
        <span v-if="resume.basics.email">{{ resume.basics.email }}</span>
        <span v-if="resume.basics.phone">{{ resume.basics.phone }}</span>
        <span v-if="resume.basics.location">{{ resume.basics.location }}</span>
      </div>
    </div>

    <!-- 个人简介 -->
    <div v-if="resume.basics.summary" class="print-section mb-5">
      <p class="text-sm leading-relaxed text-gray-700">{{ resume.basics.summary }}</p>
    </div>

    <!-- 教育经历 -->
    <div v-if="resume.education.length > 0" class="print-section mb-5">
      <h2 class="mb-2 text-sm font-bold uppercase tracking-wider text-primary">教育经历</h2>
      <div v-for="item in resume.education" :key="item.id" class="mb-3">
        <div class="flex items-baseline justify-between">
          <div>
            <span class="font-semibold text-gray-900">{{ item.school }}</span>
            <span class="ml-2 text-sm text-gray-600">{{ item.major }}</span>
          </div>
          <span class="text-xs text-gray-500">{{ formatDate(item.startDate, item.endDate) }}</span>
        </div>
        <p class="text-xs text-gray-500">{{ item.degree }}</p>
        <p v-if="item.description" class="mt-1 text-sm text-gray-600">{{ item.description }}</p>
      </div>
    </div>

    <!-- 工作经历 -->
    <div v-if="resume.experience.length > 0" class="print-section mb-5">
      <h2 class="mb-2 text-sm font-bold uppercase tracking-wider text-primary">工作经历</h2>
      <div v-for="item in resume.experience" :key="item.id" class="mb-4">
        <div class="flex items-baseline justify-between">
          <div>
            <span class="font-semibold text-gray-900">{{ item.company }}</span>
            <span class="ml-2 text-sm text-gray-600">{{ item.position }}</span>
          </div>
          <span class="text-xs text-gray-500">{{ formatDate(item.startDate, item.endDate, item.current) }}</span>
        </div>
        <ul v-if="item.highlights.length > 0" class="mt-1 list-disc pl-4 text-sm text-gray-700">
          <li v-for="(h, i) in item.highlights.filter(Boolean)" :key="i">{{ h }}</li>
        </ul>
      </div>
    </div>

    <!-- 专业技能 -->
    <div v-if="resume.skills.length > 0" class="print-section mb-5">
      <h2 class="mb-2 text-sm font-bold uppercase tracking-wider text-primary">专业技能</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="(skill, i) in resume.skills.filter(Boolean)" :key="i" class="rounded bg-accent px-2.5 py-1 text-sm text-gray-800">
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- 项目经历 -->
    <div v-if="resume.projects.length > 0" class="print-section mb-5">
      <h2 class="mb-2 text-sm font-bold uppercase tracking-wider text-primary">项目经历</h2>
      <div v-for="item in resume.projects" :key="item.id" class="mb-4">
        <div class="flex items-baseline justify-between">
          <div>
            <span class="font-semibold text-gray-900">{{ item.name }}</span>
            <span class="ml-2 text-sm text-gray-600">{{ item.role }}</span>
          </div>
          <span class="text-xs text-gray-500">{{ formatDate(item.startDate, item.endDate) }}</span>
        </div>
        <p v-if="item.description" class="mt-1 text-sm text-gray-600">{{ item.description }}</p>
        <ul v-if="item.highlights.length > 0" class="mt-1 list-disc pl-4 text-sm text-gray-700">
          <li v-for="(h, i) in item.highlights.filter(Boolean)" :key="i">{{ h }}</li>
        </ul>
      </div>
    </div>

    <!-- 空状态提示 -->
    <div v-if="!resume.basics.summary && resume.education.length === 0 && resume.experience.length === 0 && resume.skills.length === 0 && resume.projects.length === 0" class="mt-20 text-center text-gray-400">
      <p class="text-lg">开始编辑左侧表单</p>
      <p class="mt-1 text-sm">输入的内容将实时显示在此处</p>
    </div>
  </div>
</template>
