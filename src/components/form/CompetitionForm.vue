<script setup lang="ts">
import type { Competition } from '@/types/resume'

defineProps<{
  list: Competition[]
}>()

const emit = defineEmits<{
  add: []
  remove: [id: string]
}>()

function addHighlight(item: Competition): void {
  item.highlights.push('')
}

function removeHighlight(item: Competition, index: number): void {
  item.highlights.splice(index, 1)
}
</script>

<template>
  <section class="border-b border-gray-200 p-6">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500">竞赛经历</h2>
      <button class="cursor-pointer rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-100" @click="emit('add')">+ 添加</button>
    </div>
    <div class="space-y-6">
      <div v-for="(item, index) in list" :key="item.id" class="rounded-lg border border-gray-200 bg-white p-4">
        <div class="mb-3 flex items-center justify-between">
          <span class="text-xs font-medium text-gray-400">#{{ index + 1 }}</span>
          <button class="cursor-pointer text-xs text-red-500 hover:text-red-700" @click="emit('remove', item.id)">删除</button>
        </div>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">竞赛名称</label>
              <input v-model="item.name" type="text" placeholder="全国大学生数学建模竞赛" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">角色/获奖</label>
              <input v-model="item.role" type="text" placeholder="队长 / 省一等奖" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">时间</label>
            <input v-model="item.date" type="text" placeholder="2024-09" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">竞赛描述</label>
            <textarea v-model="item.description" rows="2" placeholder="竞赛内容与成果..." class="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <div class="mb-1 flex items-center justify-between">
              <label class="text-xs font-medium text-gray-600">亮点</label>
              <button class="cursor-pointer text-xs text-primary hover:underline" @click="addHighlight(item)">+ 添加</button>
            </div>
            <div class="space-y-2">
              <div v-for="(h, i) in item.highlights" :key="i" class="flex gap-2">
                <input v-model="item.highlights[i]" type="text" placeholder="完成基于神经网络的预测模型..." class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
                <button class="cursor-pointer shrink-0 text-xs text-red-500 hover:text-red-700" @click="removeHighlight(item, i)">✕</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="list.length === 0" class="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
        暂无竞赛经历，点击上方"添加"按钮
      </div>
    </div>
  </section>
</template>
