<script setup lang="ts">
import type { Project } from '@/types/resume'

defineProps<{
  list: Project[]
}>()

const emit = defineEmits<{
  add: []
  remove: [id: string]
}>()

function addHighlight(proj: Project): void {
  proj.highlights.push('')
}

function removeHighlight(proj: Project, index: number): void {
  proj.highlights.splice(index, 1)
}
</script>

<template>
  <section class="border-b border-gray-200 p-6">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500">项目经历</h2>
      <button class="cursor-pointer rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-100" @click="emit('add')">+ 添加</button>
    </div>
    <div class="space-y-6">
      <div v-for="(item, index) in list" :key="item.id" class="rounded-lg border border-gray-200 bg-white p-4">
        <div class="mb-3 flex items-center justify-between">
          <span class="text-xs font-medium text-gray-400">#{{ index + 1 }}</span>
          <button class="cursor-pointer text-xs text-red-500 hover:text-red-700" @click="emit('remove', item.id)">删除</button>
        </div>
        <div class="space-y-3">
          <div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">项目名称</label>
              <input v-model="item.name" type="text" placeholder="在线简历生成器" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div class="mt-3">
              <label class="mb-1 block text-xs font-medium text-gray-600">项目链接</label>
              <input v-model="item.url" type="text" placeholder="https://github.com/xxx/xxx" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div class="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-600">角色</label>
                <input v-model="item.role" type="text" placeholder="独立开发" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">开始</label>
              <input v-model="item.startDate" type="text" placeholder="2024-01" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">结束</label>
              <input v-model="item.endDate" type="text" placeholder="2024-06" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">项目描述</label>
            <textarea v-model="item.description" rows="2" placeholder="项目背景与目标..." class="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <div class="mb-1 flex items-center justify-between">
              <label class="text-xs font-medium text-gray-600">项目亮点</label>
              <button class="cursor-pointer text-xs text-primary hover:underline" @click="addHighlight(item)">+ 添加</button>
            </div>
            <div class="space-y-2">
              <div v-for="(h, i) in item.highlights" :key="i" class="flex gap-2">
                <input v-model="item.highlights[i]" type="text" placeholder="使用 Vue 3 + Tailwind CSS 构建..." class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
                <button class="cursor-pointer shrink-0 text-xs text-red-500 hover:text-red-700" @click="removeHighlight(item, i)">✕</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="list.length === 0" class="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
        暂无项目经历，点击上方"添加"按钮
      </div>
    </div>
  </section>
</template>
