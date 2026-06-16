# Resume Generator

在线简历生成器 — Vue 3 + Tailwind CSS 从零搭建，表单编辑实时预览，iframe 隔离导出 A4 PDF。

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

## 功能

- **表单编辑** — 左侧分块编辑基本信息（含拖拽排序）、教育经历、项目经历、竞赛经历、奖励荣誉
- **实时预览** — 右侧 A4 比例实时同步显示简历效果，支持一寸照片
- **导出 PDF** — iframe 隔离克隆预览区，调用浏览器原生打印，排版精确、文本可选中可搜索

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
| PDF 导出 | iframe 隔离 + `iframe.contentWindow.print()` |

无需后端，无需数据库，所有数据仅存于浏览器 localStorage。

## 项目结构

```
src/
├── types/resume.ts              # 简历数据模型 + 字段映射
├── composables/useResume.ts     # 状态管理 + localStorage 迁移
├── components/
│   ├── form/
│   │   ├── BasicsForm.vue       # 基本信息（拖拽排序）
│   │   ├── EducationForm.vue    # 教育经历
│   │   ├── ProjectsForm.vue     # 项目经历
│   │   ├── CompetitionForm.vue  # 竞赛经历
│   │   └── AwardForm.vue        # 奖励荣誉
│   └── preview/
│       ├── PreviewPanel.vue     # 预览容器
│       └── ResumePreview.vue    # A4 简历模板
├── styles/
│   ├── main.css                 # Tailwind + 主题
│   └── print.css                # 打印样式
└── App.vue                      # 根组件
```

## License

MIT
