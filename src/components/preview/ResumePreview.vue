<script setup lang="ts">
import type { ResumeData } from '@/types/resume'
import { getBasicFieldLabel } from '@/types/resume'

defineProps<{
  resume: ResumeData
}>()

function formatDate(start: string, end: string): string {
  if (!start && !end) return ''
  return `${start} - ${end}`
}
</script>

<template>
  <div class="print-page mx-auto w-[210mm] bg-white px-[20mm] py-[15mm] shadow-lg" style="min-height: 297mm;">
    <!-- 个人信息 -->
    <div class="mb-4">
      <div class="flex gap-6">
        <div class="flex-1">
          <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-900">
            <div v-for="key in resume.basicsFieldOrder" :key="key" class="flex items-baseline gap-1">
              <span class="shrink-0 font-semibold text-gray-500">{{ getBasicFieldLabel(key) }}：</span>
              <span class="font-medium">{{ (resume.basics as any)[key] || '-' }}</span>
            </div>
          </div>
        </div>
        <div class="flex w-[80px] shrink-0 items-center justify-center overflow-hidden rounded border border-dashed border-gray-300 text-xs text-gray-400" style="height: 110px;">
          <img v-if="resume.basics.avatar" :src="resume.basics.avatar" alt="照片" class="h-full w-full object-cover" />
          <span v-else>照片</span>
        </div>
      </div>
    </div>

    <div v-if="resume.basics.summary" class="print-section mb-5">
      <p class="text-sm leading-relaxed text-gray-700">简介：{{ resume.basics.summary }}</p>
    </div>

    <!-- 教育经历 -->
    <div v-if="resume.education.length > 0" class="print-section mb-5">
      <h2 class="mb-3 border-b border-primary pb-1 text-sm font-bold uppercase tracking-wider text-primary">教育经历</h2>
      <div v-for="item in resume.education" :key="item.id" class="mb-2 flex justify-between text-sm text-gray-900">
        <span class="font-semibold">{{ item.school }}</span>
        <span class="text-gray-500">{{ formatDate(item.startDate, item.endDate) }}</span>
        <span>{{ item.major }}</span>
        <span>{{ item.degree }}</span>
      </div>
    </div>

    <!-- 项目经历 -->
    <div v-if="resume.projects.length > 0" class="print-section mb-5">
      <h2 class="mb-3 border-b border-primary pb-1 text-sm font-bold uppercase tracking-wider text-primary">项目经历</h2>
      <div v-for="item in resume.projects" :key="item.id" class="mb-4">
        <div class="grid grid-cols-3 text-sm">
          <span class="font-semibold text-gray-900">{{ item.name }}</span>
          <span class="text-center text-gray-600">{{ item.role }}</span>
          <span class="text-right text-xs text-gray-500">{{ formatDate(item.startDate, item.endDate) }}</span>
        </div>
        <a v-if="item.url" :href="item.url" target="_blank" class="mt-0.5 block text-xs text-primary hover:underline">{{ item.url }}</a>
        <p v-if="item.description" class="mt-1 text-sm text-gray-600">{{ item.description }}</p>
        <ul v-if="item.highlights.length > 0" class="mt-1 list-disc pl-4 text-sm text-gray-700">
          <li v-for="(h, i) in item.highlights.filter(Boolean)" :key="i">{{ h }}</li>
        </ul>
      </div>
    </div>

    <!-- 竞赛经历 -->
    <div v-if="resume.competitions.length > 0" class="print-section mb-5">
      <h2 class="mb-3 border-b border-primary pb-1 text-sm font-bold uppercase tracking-wider text-primary">竞赛经历</h2>
      <div v-for="item in resume.competitions" :key="item.id" class="mb-4">
        <div class="grid grid-cols-3 text-sm">
          <span class="font-semibold text-gray-900">{{ item.name }}</span>
          <span v-if="item.role" class="text-center text-gray-600">{{ item.role }}</span>
          <span class="text-right text-xs text-gray-500">{{ item.date }}</span>
        </div>
        <p v-if="item.description" class="mt-1 text-sm text-gray-600">{{ item.description }}</p>
        <ul v-if="item.highlights.length > 0" class="mt-1 list-disc pl-4 text-sm text-gray-700">
          <li v-for="(h, i) in item.highlights.filter(Boolean)" :key="i">{{ h }}</li>
        </ul>
      </div>
    </div>

    <!-- 奖励荣誉 -->
    <div v-if="resume.awards.length > 0" class="print-section mb-5">
      <h2 class="mb-3 border-b border-primary pb-1 text-sm font-bold uppercase tracking-wider text-primary">奖励荣誉</h2>
      <div v-for="item in resume.awards" :key="item.id" class="mb-2 flex items-baseline justify-between text-sm">
        <div>
          <span class="text-gray-900">{{ item.name }}</span>
          <span v-if="item.description" class="ml-2 text-gray-500">{{ item.description }}</span>
        </div>
        <span class="text-xs text-gray-500">{{ item.date }}</span>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="!resume.basics.summary && resume.education.length === 0 && resume.projects.length === 0 && resume.competitions.length === 0 && resume.awards.length === 0" class="mt-20 text-center text-gray-400">
      <p class="text-lg">开始编辑左侧表单</p>
      <p class="mt-1 text-sm">输入的内容将实时显示在此处</p>
    </div>
  </div>
</template>
