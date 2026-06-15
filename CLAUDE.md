# Resume Generator

在线简历生成器 — Vue 3 + Tailwind CSS 从零搭建，表单编辑实时预览，浏览器原生打印导出 A4 PDF。

## Tech Stack

- **构建工具:** Vite
- **前端框架:** Vue 3 (Composition API + `<script setup>`)
- **样式:** Tailwind CSS v4
- **状态管理:** VueUse `useLocalStorage`（无需 Pinia）
- **PDF 导出:** CSS `@media print` + `window.print()`

## Project Conventions

- 单页应用（SPA），无需路由
- 组件按功能拆分：表单组件、预览组件、模板组件
- 简历数据集中管理，通过响应式对象驱动预览
- 所有组件用 `<script setup>` + TypeScript

## Architecture

简历数据流：`Form Component` → `Reactive State (useLocalStorage)` → `Preview Component` → `@media print`

- 左侧：表单编辑区（分块：个人信息、教育经历、工作经历、技能等）
- 右侧：实时 A4 预览区
- 导出：`window.print()` 触发的浏览器原生打印

## Success Criteria

1. 表单输入时预览实时更新
2. 导出 PDF 排版精确、文本可选中可搜索
3. 打印样式在 Chrome/Edge 中正常
