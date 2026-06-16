<script setup lang="ts">
import type { Education } from '@/types/resume'

defineProps<{
  list: Education[]
}>()

const emit = defineEmits<{
  add: []
  remove: [id: string]
}>()
</script>

<template>
  <section class="border-b border-gray-200 p-6">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500">教育经历</h2>
      <button class="cursor-pointer rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-100" @click="emit('add')">+ 添加</button>
    </div>
    <div class="space-y-6">
      <div v-for="(item, index) in list" :key="item.id" class="rounded-lg border border-gray-200 bg-white p-4">
        <div class="mb-3 flex items-center justify-between">
          <span class="text-xs font-medium text-gray-400">#{{ index + 1 }}</span>
          <button class="cursor-pointer text-xs text-red-500 hover:text-red-700" @click="emit('remove', item.id)">删除</button>
        </div>
        <div class="grid grid-cols-5 gap-3">
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">学校</label>
              <input v-model="item.school" type="text" placeholder="清华大学" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div class="col-span-2">
              <label class="mb-1 block text-xs font-medium text-gray-600">时间</label>
              <div class="flex items-center gap-2">
                <input v-model="item.startDate" type="text" placeholder="2016-09" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
                <span class="text-gray-400">—</span>
                <input v-model="item.endDate" type="text" placeholder="2020-07" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">专业</label>
              <input v-model="item.major" type="text" placeholder="计算机科学与技术" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">学历</label>
              <input v-model="item.degree" type="text" placeholder="本科" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
          </div>
      </div>
      <div v-if="list.length === 0" class="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
        暂无教育经历，点击上方"添加"按钮
      </div>
    </div>
  </section>
</template>
