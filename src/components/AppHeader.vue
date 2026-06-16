<script setup lang="ts">
defineProps<{
  onExport: () => void
  onScore: () => void
}>()
</script>

<template>
  <header class="no-print flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
    <h1 class="text-lg font-bold text-gray-900">简历生成器</h1>
    <div class="flex items-center gap-3">
      <button
        class="cursor-pointer rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
        @click="onScore"
      >
        AI 评分
      </button>
      <button
        class="cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
        @click="onExport"
      >
        导出 PDF
      </button>
    </div>
  </header>
</template>
