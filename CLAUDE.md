# Resume Generator

在线简历生成器 — Vue 3 + Tailwind CSS 从零搭建，表单编辑实时预览，iframe 隔离导出 A4 PDF。

## Tech Stack

- **构建工具:** Vite
- **前端框架:** Vue 3 (Composition API + `<script setup>`)
- **样式:** Tailwind CSS v4
- **状态管理:** VueUse `useLocalStorage`（无需 Pinia）
- **PDF 导出:** iframe 隔离打印（克隆预览 DOM + 页面 CSS 到隐藏 iframe，调用 `iframe.contentWindow.print()`）

## Project Conventions

- 单页应用（SPA），无需路由
- 组件按功能拆分：表单组件、预览组件
- 简历数据集中管理，通过响应式对象驱动预览
- 所有组件用 `<script setup>` + TypeScript
- 面板字段顺序通过 `basicsFieldOrder: string[]` 管理，支持拖拽排序，持久化到 localStorage

## Architecture

简历数据流：`Form Component` → `Reactive State (useLocalStorage)` → `Preview Component` → `iframe print`

- 左侧：表单编辑区（5 个板块：基本信息、教育经历、项目经历、竞赛经历、奖励荣誉）
- 右侧：实时 A4 预览区（带一寸照片位）
- 导出：创建隐藏 iframe → 复制页面 CSS 和 `.print-page` 克隆 → `iframe.contentWindow.print()`

## Data Model (src/types/resume.ts)

- **基本信息 (basics)**: name, title, email, phone, location, birthday, avatar, summary + basicsFieldOrder
- **教育经历 (Education)**: id, school, degree, major, startDate, endDate
- **项目经历 (Project)**: id, name, role, startDate, endDate, description, highlights[]
- **竞赛经历 (Competition)**: id, name, role, date, description, highlights[]
- **奖励荣誉 (Award)**: id, name, date, description

## Data Migration (src/composables/useResume.ts)

`useLocalStorage` 加载旧数据后立即补齐新字段（`basicsFieldOrder`、`birthday`、`competitions`、`awards`），确保 schema 变更向后兼容。

## Success Criteria

1. 表单输入时预览实时更新
2. 导出 PDF 排版精确、文本可选中可搜索
3. 打印样式在 Chrome/Edge 中正常
