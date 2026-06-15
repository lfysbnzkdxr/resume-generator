# Resume Generator

在线简历生成器 — Vue 3 + Tailwind CSS 从零搭建，表单编辑实时预览，浏览器原生打印导出 A4 PDF。

![Tech Stack](https://img.shields.io/badge/Vue_3-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

## 功能

- **表单编辑** — 左侧分块编辑基本信息、教育经历、工作经历、技能、项目经历
- **实时预览** — 右侧 A4 比例实时同步显示简历效果
- **导出 PDF** — 点击"导出 PDF"触发浏览器打印，另存为 PDF，文本可选中可搜索

## 快速开始

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:5173` 即可使用。

## 技术栈

| 层级 | 选型 |
|------|------|
| 构建工具 | Vite |
| 前端框架 | Vue 3 (Composition API + `<script setup>`) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS v4 |
| 状态管理 | VueUse `useLocalStorage` |
| PDF 导出 | CSS `@media print` + `window.print()` |

无需后端，无需数据库，所有数据仅存于浏览器 localStorage。

## 项目结构

```
src/
├── types/resume.ts              # 简历数据模型
├── composables/useResume.ts     # 状态管理
├── components/
│   ├── form/
│   │   ├── BasicsForm.vue       # 基本信息
│   │   ├── EducationForm.vue    # 教育经历
│   │   ├── ExperienceForm.vue   # 工作经历
│   │   ├── SkillsForm.vue       # 专业技能
│   │   └── ProjectsForm.vue     # 项目经历
│   └── preview/
│       ├── PreviewPanel.vue     # 预览容器
│       └── ResumePreview.vue    # A4 简历模板
└── styles/
    ├── main.css                 # Tailwind + 主题
    └── print.css                # 打印样式
```

## License

MIT
