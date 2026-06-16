<script setup lang="ts">
import type { ScoreResult } from '@/composables/useResumeScore'

defineProps<{
  result: ScoreResult | null
  loading: boolean
  error: string
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
  requestAI: []
  setKey: []
}>()

function scoreTheme(s: number): { color: string, bg: string } {
  if (s >= 80) return { color: 'text-green-600', bg: 'bg-green-500' }
  if (s >= 60) return { color: 'text-yellow-600', bg: 'bg-yellow-500' }
  return { color: 'text-red-500', bg: 'bg-red-500' }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="slide">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-end">
        <!-- backdrop -->
        <div class="absolute inset-0 bg-black/30" @click="emit('close')" />
        <!-- panel -->
        <div class="no-print relative w-full rounded-t-2xl bg-white px-6 pb-8 pt-6 shadow-xl" style="max-height: 80vh; overflow-y: auto;">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900">简历评分</h2>
            <button class="cursor-pointer text-2xl leading-none text-gray-400 hover:text-gray-600" @click="emit('close')">×</button>
          </div>

          <!-- no result -->
          <div v-if="!result" class="py-8 text-center text-sm text-gray-400">
            <p>点击左上角"AI 评分"按钮开始评估</p>
          </div>

          <template v-else>
            <!-- 总分 -->
            <div class="mb-6 flex flex-col items-center">
              <div class="relative mb-2 flex h-24 w-24 items-center justify-center">
                <svg class="absolute h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" stroke-width="8" />
                  <circle cx="50" cy="50" r="42" fill="none" :stroke="result.total >= 80 ? '#22c55e' : result.total >= 60 ? '#eab308' : '#ef4444'" stroke-width="8" stroke-linecap="round" :stroke-dasharray="`${(result.total / 100) * 264} 264`" />
                </svg>
                <span class="text-3xl font-bold" :class="scoreTheme(result.total).color">{{ result.total }}</span>
              </div>
              <p class="text-xs text-gray-400">综合评分</p>
            </div>

            <!-- 各维度 -->
            <div class="mb-6 space-y-4">
              <div v-for="dim in result.dimensions" :key="dim.key" class="rounded-lg bg-gray-50 p-4">
                <div class="mb-2 flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">{{ dim.label }}</span>
                  <span class="text-sm font-semibold" :class="scoreTheme(dim.score).color">{{ dim.score }}分</span>
                </div>
                <div class="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div class="h-full rounded-full transition-all duration-500" :class="scoreTheme(dim.score).bg" :style="{ width: dim.score + '%' }" />
                </div>
                <ul v-if="dim.suggestions.length > 0" class="space-y-0.5">
                  <li v-for="(s, i) in dim.suggestions" :key="i" class="text-xs text-gray-500">• {{ s }}</li>
                </ul>
              </div>
            </div>

            <!-- AI 建议 -->
            <div class="mb-4">
              <button
                class="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors"
                :class="loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-light cursor-pointer'"
                :disabled="loading"
                @click="emit('requestAI')"
              >
                <span v-if="loading" class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {{ loading ? 'AI 分析中...' : result.aiSuggestions.length > 0 ? '重新 AI 分析' : '获取 AI 改进建议' }}
              </button>
              <button class="mt-2 w-full text-center text-xs text-gray-400 hover:text-gray-600" @click="emit('setKey')">
                配置 API Key
              </button>
            </div>

            <!-- AI 建议内容 -->
            <div v-if="error" class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{{ error }}</div>
            <div v-if="result.aiSuggestions.length > 0" class="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <h3 class="mb-2 text-sm font-semibold text-blue-800">AI 改进建议</h3>
              <ol class="space-y-1.5 text-sm text-blue-700">
                <li v-for="(s, i) in result.aiSuggestions" :key="i" class="flex gap-2">
                  <span class="shrink-0 font-medium">{{ i + 1 }}.</span>
                  <span>{{ s }}</span>
                </li>
              </ol>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease;
}
.slide-enter-active > div:last-child,
.slide-leave-active > div:last-child {
  transition: transform 0.25s ease-out;
}
.slide-enter-from {
  opacity: 0;
}
.slide-enter-from > div:last-child {
  transform: translateY(100%);
}
.slide-leave-to {
  opacity: 0;
}
.slide-leave-to > div:last-child {
  transform: translateY(100%);
}
</style>
