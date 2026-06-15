<script setup lang="ts">
const props = defineProps<{
  skills: string[]
}>()

function addSkill(): void {
  props.skills.push('')
}

function removeSkill(index: number): void {
  props.skills.splice(index, 1)
}
</script>

<template>
  <section class="border-b border-gray-200 p-6">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500">专业技能</h2>
      <button class="cursor-pointer rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-100" @click="addSkill">+ 添加</button>
    </div>
    <div class="flex flex-wrap gap-2">
      <div v-for="(skill, index) in skills" :key="index" class="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1">
        <input v-model="skills[index]" type="text" placeholder="Vue.js" class="w-20 text-sm outline-none" />
        <button class="cursor-pointer text-xs text-gray-400 hover:text-red-500" @click="removeSkill(index)">✕</button>
      </div>
    </div>
    <div v-if="skills.length === 0" class="mt-2 rounded-lg border border-dashed border-gray-300 p-4 text-center text-sm text-gray-400">
      暂无技能，点击上方"添加"按钮
    </div>
  </section>
</template>
