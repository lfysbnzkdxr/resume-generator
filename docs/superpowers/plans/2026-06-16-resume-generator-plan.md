# Resume Generator 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个在线简历生成器——左侧表单编辑，右侧实时 A4 预览，浏览器原生打印导出 PDF。

**Architecture:** Vite + Vue 3 (Composition API + `<script setup>`) + TypeScript + Tailwind CSS v4。单页应用，数据通过 VueUse `useLocalStorage` 做持久化。PDF 导出依赖 CSS `@media print` + `window.print()`，零额外依赖。

**Tech Stack:** Vite, Vue 3, TypeScript, Tailwind CSS v4, VueUse

---

### Task 1: Vite + Vue 3 + TypeScript 项目脚手架

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.ts`
- Create: `src/env.d.ts`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "resume-generator",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5",
    "@vueuse/core": "^11"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5",
    "typescript": "~5.7",
    "vite": "^6",
    "vue-tsc": "^2",
    "@tailwindcss/vite": "^4",
    "tailwindcss": "^4"
  }
}
```

- [ ] **Step 2: 创建 vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

- [ ] **Step 3: 创建 tsconfig.json**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

- [ ] **Step 4: 创建 tsconfig.app.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "paths": {
      "@/*": ["./src/*"]
    },
    "baseUrl": ".",
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

- [ ] **Step 5: 创建 tsconfig.node.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>简历生成器</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 7: 创建 src/env.d.ts**

```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

- [ ] **Step 8: 创建 src/main.ts**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'

createApp(App).mount('#app')
```

- [ ] **Step 9: 安装依赖**

Run: `cd "E:/AI_Coding/CodeArea/resume_generator" && pnpm install`

Expected: 依赖安装成功，无报错。

- [ ] **Step 10: 验证 dev 服务能启动**

Run: `pnpm dev`
Expected: Vite 启动在 `http://localhost:5173`

---

### Task 2: Tailwind CSS v4 + 全局样式

**Files:**
- Create: `src/styles/main.css`
- Create: `src/styles/print.css`

Tailwind v4 采用 CSS-first 配置，不需要 `tailwind.config.js`。

- [ ] **Step 1: 创建 src/styles/main.css**

```css
@import "tailwindcss";

/* 自定义主题色 */
@theme {
  --color-primary: #1a365d;
  --color-primary-light: #2a4a7f;
  --color-accent: #e2e8f0;
}

/* 基础重置 */
body {
  margin: 0;
  font-family: "Inter", "Noto Sans SC", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
```

- [ ] **Step 2: 创建 src/styles/print.css**

```css
@media print {
  .no-print {
    display: none !important;
  }

  @page {
    size: A4;
    margin: 15mm 20mm;
  }

  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .print-section {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .print-page {
    width: 100%;
    min-height: 297mm;
    padding: 0;
    box-shadow: none;
    border: none;
  }
}
```

- [ ] **Step 3: 在 main.ts 或 App.vue 中引入 print.css**

在 `src/main.ts` 中添加：

```typescript
import './styles/print.css'
```

---

### Task 3: 类型定义

**Files:**
- Create: `src/types/resume.ts`

- [ ] **Step 1: 创建完整类型定义**

```typescript
export interface Education {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
  description?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  highlights: string[]
}

export interface Project {
  id: string
  name: string
  role: string
  url?: string
  startDate: string
  endDate: string
  description: string
  highlights: string[]
}

export interface CustomSectionItem {
  key: string
  value: string
}

export interface CustomSection {
  id: string
  title: string
  items: CustomSectionItem[]
}

export interface ResumeData {
  basics: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    avatar?: string
    summary: string
  }
  education: Education[]
  experience: Experience[]
  skills: string[]
  projects: Project[]
  customSections: CustomSection[]
}

/** 创建默认空的简历数据 */
export function createEmptyResume(): ResumeData {
  return {
    basics: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    customSections: [],
  }
}
```

---

### Task 4: useResume 状态管理 Composable

**Files:**
- Create: `src/composables/useResume.ts`

- [ ] **Step 1: 创建 useResume composable**

```typescript
import { useLocalStorage } from '@vueuse/core'
import { createEmptyResume, type ResumeData, type Education, type Experience, type Project } from '@/types/resume'

export function useResume() {
  const resume = useLocalStorage<ResumeData>('resume-data', createEmptyResume())

  function addEducation(): void {
    const newItem: Education = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
    }
    resume.value.education.push(newItem)
  }

  function removeEducation(id: string): void {
    resume.value.education = resume.value.education.filter(e => e.id !== id)
  }

  function addExperience(): void {
    const newItem: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: [],
    }
    resume.value.experience.push(newItem)
  }

  function removeExperience(id: string): void {
    resume.value.experience = resume.value.experience.filter(e => e.id !== id)
  }

  function addProject(): void {
    const newItem: Project = {
      id: crypto.randomUUID(),
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      highlights: [],
    }
    resume.value.projects.push(newItem)
  }

  function removeProject(id: string): void {
    resume.value.projects = resume.value.projects.filter(p => p.id !== id)
  }

  function exportPDF(): void {
    window.print()
  }

  return {
    resume,
    addEducation,
    removeEducation,
    addExperience,
    removeExperience,
    addProject,
    removeProject,
    exportPDF,
  }
}
```

---

### Task 5: App.vue + AppHeader + MainLayout

**Files:**
- Create: `src/App.vue`
- Create: `src/components/AppHeader.vue`
- Create: `src/components/MainLayout.vue`

- [ ] **Step 1: 创建 AppHeader.vue**

```vue
<script setup lang="ts">
defineProps<{
  onExport: () => void
}>()
</script>

<template>
  <header class="no-print flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
    <h1 class="text-lg font-bold text-gray-900">简历生成器</h1>
    <button
      class="cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
      @click="onExport"
    >
      导出 PDF
    </button>
  </header>
</template>
```

- [ ] **Step 2: 创建 MainLayout.vue**

```vue
<script setup lang="ts">
</script>

<template>
  <div class="flex h-[calc(100vh-57px)]">
    <aside class="w-[480px] min-w-0 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-50">
      <slot name="form" />
    </aside>
    <main class="flex flex-1 items-start justify-center overflow-y-auto bg-gray-100 p-8">
      <slot name="preview" />
    </main>
  </div>
</template>

<style scoped>
@media (max-width: 1023px) {
  aside {
    width: 100%;
  }
  main {
    display: none;
  }
}
</style>
```

- [ ] **Step 3: 创建 App.vue**

```vue
<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import MainLayout from './components/MainLayout.vue'
import FormPanel from './components/form/FormPanel.vue'
import PreviewPanel from './components/preview/PreviewPanel.vue'
import { useResume } from './composables/useResume'

const { resume, addEducation, removeEducation, addExperience, removeExperience, addProject, removeProject, exportPDF } = useResume()
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :on-export="exportPDF" />
    <MainLayout>
      <template #form>
        <FormPanel
          :resume="resume"
          @add-education="addEducation"
          @remove-education="removeEducation"
          @add-experience="addExperience"
          @remove-experience="removeExperience"
          @add-project="addProject"
          @remove-project="removeProject"
        />
      </template>
      <template #preview>
        <PreviewPanel :resume="resume" />
      </template>
    </MainLayout>
  </div>
</template>
```

---

### Task 6: 表单面板与基本信息表单

**Files:**
- Create: `src/components/form/FormPanel.vue`
- Create: `src/components/form/BasicsForm.vue`

- [ ] **Step 1: 创建 BasicsForm.vue**

```vue
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
```

- [ ] **Step 2: 创建 FormPanel.vue**

```vue
<script setup lang="ts">
import type { ResumeData } from '@/types/resume'
import BasicsForm from './BasicsForm.vue'
import EducationForm from './EducationForm.vue'
import ExperienceForm from './ExperienceForm.vue'
import SkillsForm from './SkillsForm.vue'
import ProjectsForm from './ProjectsForm.vue'

defineProps<{
  resume: ResumeData
}>()

const emit = defineEmits<{
  addEducation: []
  removeEducation: [id: string]
  addExperience: []
  removeExperience: [id: string]
  addProject: []
  removeProject: [id: string]
}>()
</script>

<template>
  <div class="pb-8">
    <BasicsForm :basics="resume.basics" />
    <EducationForm
      :list="resume.education"
      @add="emit('addEducation')"
      @remove="(id: string) => emit('removeEducation', id)"
    />
    <ExperienceForm
      :list="resume.experience"
      @add="emit('addExperience')"
      @remove="(id: string) => emit('removeExperience', id)"
    />
    <SkillsForm :skills="resume.skills" />
    <ProjectsForm
      :list="resume.projects"
      @add="emit('addProject')"
      @remove="(id: string) => emit('removeProject', id)"
    />
  </div>
</template>
```

---

### Task 7: 教育经历 + 工作经历表单

**Files:**
- Create: `src/components/form/EducationForm.vue`
- Create: `src/components/form/ExperienceForm.vue`

- [ ] **Step 1: 创建 EducationForm.vue**

```vue
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
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">学校</label>
              <input v-model="item.school" type="text" placeholder="清华大学" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">专业</label>
              <input v-model="item.major" type="text" placeholder="计算机科学与技术" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">学历</label>
              <input v-model="item.degree" type="text" placeholder="本科" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">开始</label>
              <input v-model="item.startDate" type="text" placeholder="2016-09" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">结束</label>
              <input v-model="item.endDate" type="text" placeholder="2020-07" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-600">描述（可选）</label>
            <textarea v-model="item.description" rows="2" placeholder="GPA、荣誉、相关课程..." class="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
        </div>
      </div>
      <div v-if="list.length === 0" class="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
        暂无教育经历，点击上方"添加"按钮
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: 创建 ExperienceForm.vue**

```vue
<script setup lang="ts">
import type { Experience } from '@/types/resume'

defineProps<{
  list: Experience[]
}>()

const emit = defineEmits<{
  add: []
  remove: [id: string]
}>()

function addHighlight(exp: Experience): void {
  exp.highlights.push('')
}

function removeHighlight(exp: Experience, index: number): void {
  exp.highlights.splice(index, 1)
}
</script>

<template>
  <section class="border-b border-gray-200 p-6">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500">工作经历</h2>
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
              <label class="mb-1 block text-xs font-medium text-gray-600">公司</label>
              <input v-model="item.company" type="text" placeholder="字节跳动" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">职位</label>
              <input v-model="item.position" type="text" placeholder="前端开发工程师" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">开始</label>
              <input v-model="item.startDate" type="text" placeholder="2020-07" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">结束</label>
              <input v-model="item.endDate" type="text" placeholder="至今" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" :disabled="item.current" />
            </div>
            <div class="flex items-end pb-2">
              <label class="flex items-center gap-2 text-sm text-gray-600">
                <input v-model="item.current" type="checkbox" class="h-4 w-4 rounded border-gray-300" />
                至今
              </label>
            </div>
          </div>
          <div>
            <div class="mb-1 flex items-center justify-between">
              <label class="text-xs font-medium text-gray-600">工作亮点</label>
              <button class="cursor-pointer text-xs text-primary hover:underline" @click="addHighlight(item)">+ 添加</button>
            </div>
            <div class="space-y-2">
              <div v-for="(h, i) in item.highlights" :key="i" class="flex gap-2">
                <input v-model="item.highlights[i]" type="text" placeholder="使用 Vue 3 重构了核心模块..." class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
                <button class="cursor-pointer shrink-0 text-xs text-red-500 hover:text-red-700" @click="removeHighlight(item, i)">✕</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="list.length === 0" class="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
        暂无工作经历，点击上方"添加"按钮
      </div>
    </div>
  </section>
</template>
```

---

### Task 8: 技能 + 项目经历表单

**Files:**
- Create: `src/components/form/SkillsForm.vue`
- Create: `src/components/form/ProjectsForm.vue`

- [ ] **Step 1: 创建 SkillsForm.vue**

```vue
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
```

- [ ] **Step 2: 创建 ProjectsForm.vue**

```vue
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
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">项目名称</label>
              <input v-model="item.name" type="text" placeholder="在线简历生成器" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-gray-600">角色</label>
              <input v-model="item.role" type="text" placeholder="独立开发" class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary" />
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
```

---

### Task 9: 预览面板与简历模板

**Files:**
- Create: `src/components/preview/PreviewPanel.vue`
- Create: `src/components/preview/ResumePreview.vue`

- [ ] **Step 1: 创建 ResumePreview.vue**

```vue
<script setup lang="ts">
import type { ResumeData, Experience, Project } from '@/types/resume'

defineProps<{
  resume: ResumeData
}>()

function formatDate(start: string, end: string, current?: boolean): string {
  if (current) return `${start} - 至今`
  if (!start && !end) return ''
  return `${start} - ${end}`
}
</script>

<template>
  <div class="print-page mx-auto w-[210mm] bg-white px-[20mm] py-[15mm] shadow-lg" style="min-height: 297mm;">
    <!-- 基本信息区 -->
    <div class="mb-6 border-b-2 border-primary pb-4">
      <h1 class="text-3xl font-bold text-gray-900">{{ resume.basics.name || '你的姓名' }}</h1>
      <p class="mt-1 text-lg text-gray-600">{{ resume.basics.title || '求职意向' }}</p>
      <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
        <span v-if="resume.basics.email">{{ resume.basics.email }}</span>
        <span v-if="resume.basics.phone">{{ resume.basics.phone }}</span>
        <span v-if="resume.basics.location">{{ resume.basics.location }}</span>
      </div>
    </div>

    <!-- 个人简介 -->
    <div v-if="resume.basics.summary" class="print-section mb-5">
      <p class="text-sm leading-relaxed text-gray-700">{{ resume.basics.summary }}</p>
    </div>

    <!-- 教育经历 -->
    <div v-if="resume.education.length > 0" class="print-section mb-5">
      <h2 class="mb-2 text-sm font-bold uppercase tracking-wider text-primary">教育经历</h2>
      <div v-for="item in resume.education" :key="item.id" class="mb-3">
        <div class="flex items-baseline justify-between">
          <div>
            <span class="font-semibold text-gray-900">{{ item.school }}</span>
            <span class="ml-2 text-sm text-gray-600">{{ item.major }}</span>
          </div>
          <span class="text-xs text-gray-500">{{ formatDate(item.startDate, item.endDate) }}</span>
        </div>
        <p class="text-xs text-gray-500">{{ item.degree }}</p>
        <p v-if="item.description" class="mt-1 text-sm text-gray-600">{{ item.description }}</p>
      </div>
    </div>

    <!-- 工作经历 -->
    <div v-if="resume.experience.length > 0" class="print-section mb-5">
      <h2 class="mb-2 text-sm font-bold uppercase tracking-wider text-primary">工作经历</h2>
      <div v-for="item in resume.experience" :key="item.id" class="mb-4">
        <div class="flex items-baseline justify-between">
          <div>
            <span class="font-semibold text-gray-900">{{ item.company }}</span>
            <span class="ml-2 text-sm text-gray-600">{{ item.position }}</span>
          </div>
          <span class="text-xs text-gray-500">{{ formatDate(item.startDate, item.endDate, item.current) }}</span>
        </div>
        <ul v-if="item.highlights.length > 0" class="mt-1 list-disc pl-4 text-sm text-gray-700">
          <li v-for="(h, i) in item.highlights.filter(Boolean)" :key="i">{{ h }}</li>
        </ul>
      </div>
    </div>

    <!-- 专业技能 -->
    <div v-if="resume.skills.length > 0" class="print-section mb-5">
      <h2 class="mb-2 text-sm font-bold uppercase tracking-wider text-primary">专业技能</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="(skill, i) in resume.skills.filter(Boolean)" :key="i" class="rounded bg-accent px-2.5 py-1 text-sm text-gray-800">
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- 项目经历 -->
    <div v-if="resume.projects.length > 0" class="print-section mb-5">
      <h2 class="mb-2 text-sm font-bold uppercase tracking-wider text-primary">项目经历</h2>
      <div v-for="item in resume.projects" :key="item.id" class="mb-4">
        <div class="flex items-baseline justify-between">
          <div>
            <span class="font-semibold text-gray-900">{{ item.name }}</span>
            <span class="ml-2 text-sm text-gray-600">{{ item.role }}</span>
          </div>
          <span class="text-xs text-gray-500">{{ formatDate(item.startDate, item.endDate) }}</span>
        </div>
        <p v-if="item.description" class="mt-1 text-sm text-gray-600">{{ item.description }}</p>
        <ul v-if="item.highlights.length > 0" class="mt-1 list-disc pl-4 text-sm text-gray-700">
          <li v-for="(h, i) in item.highlights.filter(Boolean)" :key="i">{{ h }}</li>
        </ul>
      </div>
    </div>

    <!-- 空状态提示 -->
    <div v-if="!resume.basics.summary && resume.education.length === 0 && resume.experience.length === 0 && resume.skills.length === 0 && resume.projects.length === 0" class="mt-20 text-center text-gray-400">
      <p class="text-lg">开始编辑左侧表单</p>
      <p class="mt-1 text-sm">输入的内容将实时显示在此处</p>
    </div>
  </div>
</template>
```

- [ ] **Step 2: 创建 PreviewPanel.vue**

```vue
<script setup lang="ts">
import type { ResumeData } from '@/types/resume'
import ResumePreview from './ResumePreview.vue'

defineProps<{
  resume: ResumeData
}>()
</script>

<template>
  <div class="flex justify-center">
    <ResumePreview :resume="resume" />
  </div>
</template>
```

---

### Task 10: 构建验证 + Git 提交

- [ ] **Step 1: 构建项目**

Run: `cd "E:/AI_Coding/CodeArea/resume_generator" && pnpm build`
Expected: 构建成功，`dist/` 目录生成。

- [ ] **Step 2: 验证 dev server 正常工作**

Run: `pnpm dev` 启动后访问 `http://localhost:5173`
Expected: 页面加载，左侧空表单，右侧显示"开始编辑左侧表单"的占位提示。

- [ ] **Step 3: Git 提交**

```bash
git add -A
git commit -m "feat: 实现简历生成器完整功能

- Vite + Vue 3 + TypeScript + Tailwind CSS v4 脚手架
- 简历数据结构与类型定义
- useResume composable 状态管理
- 基本信息/教育/工作/技能/项目 表单组件
- A4 比例实时预览
- @media print 导出 PDF

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
git push
```
