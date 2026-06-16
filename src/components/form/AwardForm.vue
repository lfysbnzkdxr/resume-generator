<script setup lang="ts">
import type { Award } from '@/types/resume'

defineProps<{
  list: Award[]
}>()

const emit = defineEmits<{
  add: []
  remove: [id: string]
}>()
</script>

<template>
  <section class="border-b border-gray-200 p-6">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500">奖励荣誉</h2>
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
              <label class="mb-1 block text-xs font-medium text-gray-600">荣誉名称</label>
              <input v-model="item.name" type="text" placeholder="校级优秀学生奖学金" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">时间</label>
              <input v-model="item.date" type="text" placeholder="2023-10" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">描述（可选）</label>
            <input v-model="item.description" type="text" placeholder="获奖说明..." class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
        </div>
      </div>
      <div v-if="list.length === 0" class="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
        暂无奖励荣誉，点击上方"添加"按钮
      </div>
    </div>
  </section>
</template>
