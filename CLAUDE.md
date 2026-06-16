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

## Resume Scoring (AI 评分功能)

集成在项目内，不单独开发。架构如下：

### 评分引擎 (`src/composables/useResumeScore.ts`)

- **规则评分**: 纯函数 `scoreResume(resume)` 同步计算，5 个维度各 0-100 分
  - 基本信息完整度（25%）：姓名/电话/邮箱/求职意向/地址是否填写
  - 教育经历（20%）：是否有记录、字段是否完整
  - 项目经历（25%）：描述和亮点数量与质量
  - 竞赛奖励（15%）：是否有竞赛/奖励经历
  - 总体丰富度（15%）：非空字段占比、亮点总数
- **AI 建议**: `fetchAISuggestions(resume, apiKey)` 调 DeepSeek API，异步返回改进建议
- API Key 存在 localStorage 中 `resume-ai-key`，首次使用弹窗输入

### UI 组件 (`src/components/ScorePanel.vue`)

- 入口：AppHeader 中"导出 PDF"旁加"AI 评分"按钮
- 展示：底部弹出式面板（slide-up），包含：
  - 总体评分 + 环形进度条
  - 各维度评分条
  - AI 生成的整体评价与改进建议（如果有 API Key）
- 面板不影响打印（`no-print` 类）

### 数据流

```
App.vue
  ├─ useResume() → resume 数据
  ├─ useResumeScore() → scoreResume, fetchAISuggestions, scoreResult
  ├─ AppHeader ← onScore 回调
  └─ ScorePanel ← scoreResult, resume

## Success Criteria

1. 表单输入时预览实时更新
2. 导出 PDF 排版精确、文本可选中可搜索
3. 打印样式在 Chrome/Edge 中正常
