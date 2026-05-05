# Guangwei Optics - Next.js 重构版

> 基于 signalshub-multi 重构升级的 B2B 太阳镜工厂官网

## 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 14 | React 全栈框架（App Router）|
| TypeScript | 类型安全 |
| Tailwind CSS | 原子化样式 |
| next/image | 图片优化 |
| API Routes | 询盘后端接口 |

## 页面结构

```
/[lang]/              首页
/[lang]/products      产品中心（筛选/搜索/排序）
/[lang]/products/[id] 产品详情页
/[lang]/factory       工厂介绍
/[lang]/contact       联系我们 + 询盘表单
```

## 语言

- 🇬🇧 English (en)
- 🇨🇳 中文 (zh)
- 🇪🇸 Español (es)
- 🇫🇷 Français (fr)
- 🇧🇷 Português (pt)
- 🇷🇺 Русский (ru)

## 功能清单

- ✅ 六种语言国际化（URL路由 + localStorage持久化）
- ✅ 产品分类筛选 + 关键词搜索 + 价格排序
- ✅ 16款产品数据（TypeScript类型定义）
- ✅ 产品详情页（多图画廊 + 规格参数）
- ✅ 询盘表单（完整校验 + API提交 + 询盘编号生成）
- ✅ 询盘历史（localStorage存储）
- ✅ 数字统计动画（CountUp效果）
- ✅ 卡片悬停动画
- ✅ WhatsApp浮动按钮
- ✅ JSON-LD 结构化数据（Organization / Product）
- ✅ sitemap.xml + robots.txt
- ✅ 响应式设计（移动端菜单）
- ✅ SEO Meta（每页独立 title/description）
- ✅ Dark hero 渐变 + 金色品牌色
- ✅ 询盘历史本地管理

## 快速启动

```bash
# 安装依赖
npm install

# 开发模式
npm run dev
# 访问 http://localhost:3000/en

# 生产构建
npm run build
npm run start
```

## 目录结构

```
src/
├── app/
│   ├── [lang]/           国际化路由
│   │   ├── page.tsx          首页
│   │   ├── products/page.tsx    产品列表
│   │   ├── products/[id]/page.tsx  产品详情
│   │   ├── factory/page.tsx     工厂介绍
│   │   └── contact/page.tsx     联系 + 询盘
│   ├── api/inquiry/      询盘 API Route
│   ├── sitemap.ts        站点地图
│   ├── robots.ts         爬虫规则
│   └── globals.css       全局样式
├── components/
│   ├── Header.tsx        头部导航
│   ├── Footer.tsx        页脚
│   └── ProductCard.tsx   产品卡片
├── lib/
│   ├── types.ts          TypeScript类型
│   ├── products.ts       产品数据
│   ├── i18n.ts          翻译工具
│   └── jsonld.ts        结构化数据
└── messages/
    └── index.ts          六种语言翻译
```

## SEO 结构化数据

- Organization JSON-LD（所有页面）
- Product JSON-LD（产品详情页）
- Open Graph + Twitter Card

## 升级对比（旧版 → 新版）

| 项目 | 旧版（静态HTML）| 新版（Next.js）|
|------|----------------|----------------|
| 多语言 | i18n.js（前端切换）| URL路由（SEO友好）|
| 产品筛选 | 无 | 分类+搜索+排序 |
| 产品详情 | Lightbox | 独立详情页 |
| 询盘管理 | Web3Forms（无记录）| API + localStorage |
| SEO | 基础Meta | JSON-LD + OG + sitemap |
| 动画 | 无 | CountUp + 悬停动画 |
| 图片 | 无优化 | next/image 懒加载 |
| 国际化 | 6语言 | 6语言（SEO独立URL）|

## TODO

- [ ] 部署到 Vercel
- [ ] 添加邮件通知（SendGrid/Resend）
- [ ] 询盘管理后台（/admin）
- [ ] CMS 内容管理（Contentful/Sanity）
- [ ] 真实产品图片替换占位图
- [ ] Google Analytics / Search Console 接入
- [ ] 视频展示（工厂/产品）
