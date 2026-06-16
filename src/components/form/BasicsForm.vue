<script setup lang="ts">
import { getBasicFieldLabel, getBasicFieldPlaceholder } from '@/types/resume'

const props = defineProps<{
  basics: Record<string, string>
  basicsFieldOrder: string[]
}>()

const emit = defineEmits<{
  'update:basicsFieldOrder': [value: string[]]
}>()

let dragIndex: number | null = null

function onDragStart(index: number) {
  dragIndex = index
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
}

function onDrop(index: number) {
  if (dragIndex === null || dragIndex === index) return
  const list = [...props.basicsFieldOrder]
  const [moved] = list.splice(dragIndex, 1)
  list.splice(index, 0, moved)
  emit('update:basicsFieldOrder', list)
  dragIndex = null
}

const avatarInputId = 'avatar-upload'

function onAvatarChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    props.basics.avatar = reader.result as string
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <section class="border-b border-gray-200 p-6">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500">基本信息</h2>
      <label :for="avatarInputId" class="cursor-pointer rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-100">
        {{ basics.avatar ? '更换照片' : '+ 上传照片' }}
      </label>
      <input :id="avatarInputId" type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
    </div>
    <div class="space-y-3">
      <div
        v-for="(key, index) in basicsFieldOrder"
        :key="key"
        draggable="true"
        class="flex items-center gap-3 rounded-md border border-gray-200 bg-white px-3 py-2 transition-shadow hover:shadow-sm"
        :class="{ 'opacity-50': false }"
        @dragstart="onDragStart(index)"
        @dragover="onDragOver"
        @drop="onDrop(index)"
      >
        <span class="cursor-grab text-gray-400 select-none" title="拖拽排序">⠿</span>
        <label class="w-12 shrink-0 text-xs font-medium text-gray-600">{{ getBasicFieldLabel(key) }}</label>
        <input
          :value="basics[key] ?? ''"
          @input="(e: any) => basics[key] = e.target.value"
          :type="key === 'birthday' ? 'month' : 'text'"
          :placeholder="getBasicFieldPlaceholder(key)"
          class="w-full rounded border border-gray-200 px-2 py-1.5 text-sm outline-none transition-colors focus:border-primary"
        />
      </div>
    </div>
    <div class="mt-3">
      <label class="mb-1 block text-xs font-medium text-gray-600">个人简介</label>
      <textarea v-model="basics.summary" rows="3" placeholder="简要介绍自己..." class="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary" />
    </div>
  </section>
</template>
