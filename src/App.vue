<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import MainLayout from './components/MainLayout.vue'
import FormPanel from './components/form/FormPanel.vue'
import PreviewPanel from './components/preview/PreviewPanel.vue'
import ScorePanel from './components/ScorePanel.vue'
import { useResume } from './composables/useResume'
import { useResumeScore, getApiKey, setApiKey } from './composables/useResumeScore'

const { resume, addEducation, removeEducation, addProject, removeProject, addCompetition, removeCompetition, addAward, removeAward, exportPDF } = useResume()
const { result, aiLoading, aiError, score, scoreWithAI } = useResumeScore()

const showScore = ref(false)
const showKeyInput = ref(false)
const keyInput = ref(getApiKey())

function openScore() {
  score(resume.value)
  showScore.value = true
}

function requestAI() {
  scoreWithAI(resume.value)
}

function saveKey() {
  setApiKey(keyInput.value)
  showKeyInput.value = false
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :on-export="exportPDF" :on-score="openScore" />
    <MainLayout>
      <template #form>
        <FormPanel
          :resume="resume"
          @add-education="addEducation"
          @remove-education="removeEducation"
          @add-project="addProject"
          @remove-project="removeProject"
          @add-competition="addCompetition"
          @remove-competition="removeCompetition"
          @add-award="addAward"
          @remove-award="removeAward"
        />
      </template>
      <template #preview>
        <PreviewPanel :resume="resume" />
      </template>
    </MainLayout>

    <ScorePanel
      :result="result"
      :loading="aiLoading"
      :error="aiError"
      :visible="showScore"
      @close="showScore = false"
      @request-ai="requestAI"
      @set-key="showKeyInput = true"
    />

    <!-- API Key 配置弹窗 -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showKeyInput" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30" @click.self="showKeyInput = false">
          <div class="no-print w-80 rounded-xl bg-white p-6 shadow-xl">
            <h3 class="mb-3 text-sm font-bold text-gray-900">DeepSeek API Key</h3>
            <p class="mb-3 text-xs text-gray-500">在 platform.deepseek.com 获取 API Key，仅存储于本地浏览器。</p>
            <input v-model="keyInput" type="password" placeholder="sk-..." class="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            <div class="flex justify-end gap-2">
              <button class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50" @click="showKeyInput = false">取消</button>
              <button class="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary-light" @click="saveKey">保存</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
