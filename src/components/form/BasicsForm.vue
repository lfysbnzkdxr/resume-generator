<script setup lang="ts">
import type { ResumeData } from '@/types/resume'

const props = defineProps<{
  basics: ResumeData['basics']
}>()
</script>

<template>
  <section class="border-b border-gray-200 p-6">
    <h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">基本信息</h2>
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="mb-1 block text-xs font-medium text-gray-600">姓名</label>
          <input v-model="basics.name" type="text" placeholder="张三" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary" />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-gray-600">求职意向</label>
          <input v-model="basics.title" type="text" placeholder="前端开发工程师" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="mb-1 block text-xs font-medium text-gray-600">邮箱</label>
          <input v-model="basics.email" type="email" placeholder="zhangsan@example.com" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary" />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-gray-600">电话</label>
          <input v-model="basics.phone" type="tel" placeholder="138-0000-0000" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary" />
        </div>
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-gray-600">所在地</label>
        <input v-model="basics.location" type="text" placeholder="北京市" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary" />
      </div>
      <div>
        <label class="mb-1 block text-xs font-medium text-gray-600">个人简介</label>
        <textarea v-model="basics.summary" rows="3" placeholder="简要介绍自己..." class="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary" />
      </div>
    </div>
  </section>
</template>
