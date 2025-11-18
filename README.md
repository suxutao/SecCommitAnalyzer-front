# SecCommitAnalyzer-front

基于补丁差异的安全提交识别系统前端代码，使用Vue 3 + Element Plus构建的现代化Web应用。

## 项目简介

SecCommitAnalyzer是一个专注于安全提交识别的分析系统，通过分析代码补丁差异，自动检测和识别潜在的安全问题提交。本项目为该系统的前端实现，提供了直观的用户界面，包含数据可视化、爬虫配置和任务管理等功能。

## 技术栈

- **框架**: Vue 3
- **UI组件库**: Element Plus
- **状态管理**: Pinia + pinia-plugin-persistedstate
- **路由**: Vue Router 4
- **图表可视化**: ECharts 6
- **HTTP请求**: Axios
- **构建工具**: Vite
- **CSS预处理器**: SCSS
- **工具库**: VueUse

## 功能特性

### 1. 整体仪表盘
- **数据可视化**：使用饼图和折线图展示漏洞类型分布和扫描活动趋势
- **深色主题**：默认深色主题设计，优化夜间使用体验
- **响应式布局**：适配各种屏幕尺寸，确保在不同设备上的良好显示

### 2. 爬虫配置和管理
- **参数配置**：可灵活设置爬取时间间隔、每次爬取记录数量和开始时间
- **任务控制**：支持一键启动/停止爬虫任务
- **状态监控**：实时显示爬虫运行状态，便于及时了解任务进展

### 3. 具体提交和分析记录
- **记录列表**：查看完整的爬取提交记录列表
- **详细信息**：查看单个提交的具体内容和相关信息
- **分析结果**：查看基于补丁差异的安全问题识别和分类结果

## 项目结构

```
src/
├── api/                  # API请求相关
│   ├── data.js          # 业务API接口
│   └── request.js       # HTTP请求配置
├── assets/              # 静态资源
│   └── global.css       # 全局CSS样式
├── components/          # 可复用组件
│   ├── LineChart.vue    # 折线图组件
│   └── PieChart.vue     # 饼图组件
├── router/              # 路由配置
│   └── index.js         # 路由定义
├── stores/              # Pinia状态管理
│   ├── spider.js        # 爬虫状态管理
│   └── useStats.js      # 统计数据管理
├── views/               # 页面组件
│   ├── Analyze.vue      # 分析结果页面
│   ├── Detail.vue       # 提交详情页面
│   ├── Home.vue         # 首页
│   ├── Layout.vue       # 基础布局
│   ├── Record.vue       # 记录列表页面
│   └── Spider.vue       # 爬虫配置页面
├── App.vue              # 根组件
└── main.js              # 入口文件
```

## 安装与使用

### 前置要求

- Node.js ^20.19.0 || >=22.12.0

### 安装依赖

```sh
npm install
```

### 开发模式运行

```sh
npm run dev
```

### 构建生产版本

```sh
npm run build
```

### 预览生产构建

```sh
npm run preview
```