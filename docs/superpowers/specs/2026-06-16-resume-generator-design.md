# Resume Generator — 设计文档

## 概述

在线简历生成器，Vue 3 + Tailwind CSS 从零搭建，表单编辑实时预览 A4 简历，
通过浏览器原生打印功能导出 PDF。单页应用，无需后端和数据库。

## 技术栈

| 层级 | 选型 | 理由 |
|------|------|------|
| 构建工具 | Vite | Vue 3 生态标配，极速 HMR |
| 前端框架 | Vue 3 (Composition API + `<script setup>`) | 组件化开发，生态成熟 |
| 语言 | TypeScript | 类型安全，提升开发体验 |
| 样式 | Tailwind CSS v4 | 原子化 CSS，无冗余，从零搭理想选择 |
| 状态管理 | VueUse `useLocalStorage` | 单页无需 Pinia，localStorage 持久化足够 |
| PDF 导出 | CSS `@media print` + `window.print()` | 排版精确，文本可选中可搜索，零额外依赖 |
| 包管理器 | pnpm | 快速省空间 |

## 数据模型

```typescript
// 简历核心数据结构
interface ResumeData {
  basics: {
    name: string
    title: string       // 求职意向 / 职位
    email: string
    phone: string
    location: string
    avatar?: string     // 头像 URL（base64 或链接）
    summary: string     // 个人简介
  }
  education: Education[]
  experience: Experience[]
  skills: string[]
  projects: Project[]
  customSections?: CustomSection[]  // 自定义模块
}

interface Education {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
  description?: string
}

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  highlights: string[]
}

interface Project {
  id: string
  name: string
  role: string
  url?: string
  startDate: string
  endDate: string
  description: string
  highlights: string[]
}

interface CustomSection {
  id: string
  title: string
  items: { key: string; value: string }[]
}
```

## 组件树

```
App.vue
├── AppHeader.vue            // 顶部栏：标题、导出按钮
├── MainLayout.vue           // 左右分栏布局
│   ├── FormPanel.vue        // 左侧表单编辑区（可滚动）
│   │   ├── BasicsForm.vue       // 基本信息表单
│   │   ├── EducationForm.vue    // 教育经历（动态列表）
│   │   ├── ExperienceForm.vue   // 工作经历（动态列表）
│   │   ├── SkillsForm.vue       // 技能标签
│   │   └── ProjectsForm.vue     // 项目经历（动态列表）
│   └── PreviewPanel.vue     // 右侧 A4 预览区
│       └── ResumePreview.vue // 简历模板渲染（@media print 作用于此）
```

## 数据流

```
FormPanel 表单输入
    │
    ▼
useLocalStorage<ResumeData>  // 响应式状态，自动持久化到 localStorage
    │
    ▼
ResumePreview 实时渲染
    │
    ▼
window.print() → @media print 样式 → PDF
```

- 所有表单组件通过 `v-model` 直接读写同一个响应式对象
- 无需事件总线或 emit 链，数据变化自动驱动预览更新
- localStorage 做草稿持久化，刷新不丢失

## 布局设计

### 编辑模式（屏幕宽度 ≥ 1024px）
```
┌──────────────────────────────────────────────────┐
│  AppHeader:  Resume Generator     [导出 PDF]     │
├─────────────────────┬────────────────────────────┤
│  FormPanel          │  PreviewPanel              │
│  (可滚动)           │  A4 比例卡片               │
│                     │  实时同步渲染              │
│  ┌─────────────┐   │  ┌──────────────────┐      │
│  │ 基本信息     │   │  │ 张三             │      │
│  │ 姓名 职位   │   │  │ 前端开发工程师    │      │
│  │ 邮箱 电话   │   │  │                  │      │
│  └─────────────┘   │  │ 教育经历         │      │
│  ┌─────────────┐   │  │ ...              │      │
│  │ 教育经历     │   │  │                  │      │
│  │ + 添加条目   │   │  └──────────────────┘      │
│  └─────────────┘   │                            │
│  ...               │                            │
└─────────────────────┴────────────────────────────┘
```

### 打印模式（@media print）

- 隐藏 FormPanel、AppHeader 中的导出按钮
- PreviewPanel 全屏展开，内容按 A4 分页
- 页面尺寸 A4（210mm × 297mm）
- 字体用 Serif（如 Noto Serif SC）增加正式感

### 小屏幕（< 1024px）

- 上下布局，上方表单，下方预览（预览可折叠）
- 用 Tab 或折叠面板切换

## 打印样式设计

```css
@media print {
  /* 隐藏非打印元素 */
  .no-print { display: none !important; }
  
  /* A4 页面设置 */
  @page {
    size: A4;
    margin: 15mm 20mm;
  }
  
  /* 避免跨页断裂 */
  .print-section {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
```

## 简历模板

初始提供 1 套简洁模板：

- **布局：** 上下结构，顶部个人信息区 + 下方分段内容
- **配色：** 深蓝色主色调（#1a365d），灰色辅助色
- **字体：** Noto Serif SC（标题）/ Inter（正文）
- **间距：** 层级分明，留白充足

后续可扩展更多模板（通过 CSS 变量切换）。

## 非功能性需求

- 表单输入时预览实时更新无明显卡顿
- 导出 PDF 排版精确，无内容截断
- 支持 Chrome / Edge 浏览器
- 所有数据仅存于浏览器 localStorage，无隐私泄露风险

## 未来可扩展（当前不做）

- 多模板切换
- JSON 导入/导出
- 中英双语
- html2canvas 一键下载

## 项目目录结构

```
resume-generator/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts        // 或 Tailwind v4 CSS 配置
├── postcss.config.js
├── CLAUDE.md
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-06-16-resume-generator-design.md
└── src/
    ├── main.ts
    ├── App.vue
    ├── types/
    │   └── resume.ts          // ResumeData 类型定义
    ├── composables/
    │   └── useResume.ts       // 简历数据状态管理
    ├── components/
    │   ├── AppHeader.vue
    │   ├── MainLayout.vue
    │   ├── form/
    │   │   ├── FormPanel.vue
    │   │   ├── BasicsForm.vue
    │   │   ├── EducationForm.vue
    │   │   ├── ExperienceForm.vue
    │   │   ├── SkillsForm.vue
    │   │   └── ProjectsForm.vue
    │   └── preview/
    │       ├── PreviewPanel.vue
    │       └── ResumePreview.vue
    └── styles/
        └── print.css          // @media print 样式
```
