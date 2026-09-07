# PicLite SEO / GEO 审计与改进

审计日期：2026-09-07。范围：仓库实现、构建后的 Worker 返回的 HTML、Google 官方文档。

结论：项目已经具备基础 SEO 配置，当前最值得改善的是工具页是否直接满足用户需求、内容是否准确且有区分度，以及多语言页面的一致性。GEO 在本报告中指生成式搜索优化。

未接入 Google Search Console，未取得真实关键词排名、搜索量、点击率、外链或 Core Web Vitals 数据，因此不能判断现有排名原因或量化这次改动的排名收益。正式域名 `/en` 的一次 HTTP HEAD 检查返回 200，但后续请求遭遇当前环境 DNS 解析失败，未完成线上全站抓取；这不等于站点存在 DNS 故障。以下修复在本地完成，尚未部署。

## 发现与已实施改动

| 优先级 | 原有情况 | 本次改进 |
| --- | --- | --- |
| 高 | 16 个中英文工具页只有介绍，主按钮全部返回通用首页，未预选对应格式 | 8 类工具、两种语言的页面均直接提供转换器；JPG 转 PNG 预选 PNG，图片转 PDF 预选 PDF，压缩页提供目标大小滑块 |
| 高 | 工具页大量复用免费、私密、手机可用等通用问答 | 增加每种工具独立的说明、输入输出概览、限制及两条专属问答；这些内容在服务器 HTML 中可见 |
| 高 | 压缩页容易让人以为 PNG 同样支持质量滑块，或输出必定更小 | 为 JPG/WebP 增加 50 KB–2 MB 目标大小滑块并自动搜索质量；明确 PNG 无损编码和不保证精确目标大小；补充透明背景、元数据、动画、OCR、PDF 分辨率等实际限制 |
| 中 | 根 HTML 固定为英语；首页依赖客户端更新语言，中文工具页也没有修正根语言 | 根据 URL 在服务端设置 `html lang/dir`，包含阿拉伯语 RTL；请求头由代理覆盖，不接受客户端伪造语言 |
| 中 | 语言选择器依赖 JavaScript；非中英文首页的工具链接全部指向自身 | 增加真实语言链接；不支持本地化的工具链接指向英文版并标注 English |
| 中 | 仓库同时声明 www 和主域名，应用层没有主机统一跳转 | 添加 308 跳转至 `https://piclite.net`，保留路径与查询参数；根路径语言跳转添加 Vary 和 no-store |
| 中 | 工具面包屑链接到当前语言首页，结构化数据却指向根语言跳转地址 | 统一可见导航与 JSON-LD 目标，删除首页不存在的可见面包屑标记 |
| 低 | 中英文首页 H1 是抽象宣传语 | 调整为明确的图片转换与压缩主题，保留原有视觉强调 |
| 低 | sitemap 每页重复列出社交分享图，以及 Google 忽略的 priority/changefreq | 保留 28 个 canonical 页面及语言变体，删除无用字段和非正文图片条目；未伪造 lastmod |

保留已有的独立 title、description、canonical、hreflang、Open Graph、Twitter Card、robots.txt、WebSite / Organization / WebApplication 与 FAQ 数据。FAQ 的可见问题和答案与 JSON-LD 共用数据源；不添加虚构评分、使用人数或成功率。结构化数据本身不保证富媒体搜索结果。

## GEO 的实施依据

Google 表示，生成式搜索仍以基础 SEO 和对用户有价值的内容为基础；`llms.txt` 不影响 Google 搜索可见性或排名，也不存在必须添加的专用 AI schema。因此本次保留并校正已有 `llms.txt`，主要投入实际工具能力、可读的操作说明和真实限制，而非批量制造关键词页面。来源：[Google 生成式搜索优化指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)。

工具说明依据本项目实际实现编写：`bitmapToBlob` 的 JPG 白底与质量处理、`decodeImage` 的 HEIC 按需加载、`renderPdfPages` 的分辨率上限、`convertToPdf` 的逐图分页和 JPG 嵌入流程。不宣称已经完成浏览器兼容性矩阵或真实文件质量基准测试。

多语言页面保留相互对应的绝对 URL 和 x-default，并增加可见语言导航。来源：[Google 多语言版本说明](https://developers.google.com/search/docs/specialty/international/localized-versions)。

Google 忽略 sitemap 的 priority/changefreq，lastmod 应反映真实的重要更新。来源：[Google 站点地图说明](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)。

结构化数据应准确反映用户可见的页面内容。来源：[Google 结构化数据通用准则](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)。

## 验证与局限

- 构建后的 Worker 回归检查覆盖 sitemap 的全部 28 个 URL：HTTP 200、独立标题、正确 canonical 和语言、单一 H1/main、转换器文件入口、可见 FAQ 与 JSON-LD 一致。
- 另检查主机/协议跳转、根语言跳转缓存、无效路径 404、robots.txt、工具的实际限制说明及工具语言导航。
- 构建和 ESLint 检查通过；Node 使用本地已有的 22.14.0，符合项目版本要求。HTML 测试共 9 项通过。
- 完整 TypeScript 检查仍报告 Cloudflare 类型缺失：`cloudflare:workers`、`Fetcher`、`D1Database`，位置在 `db/index.ts` 和 `worker/index.ts`；本次未修改这两处文件。
- 未进行真实浏览器上传转换、移动端视觉检查、Lighthouse 或线上 CWV 测量。构建仍提示部分异步依赖包较大；HEIC、PDF、ZIP 转换库沿用按需加载，不能据此推断首屏或交互性能达标。

复验命令（Node >= 22.13）：

```sh
npm run lint
npm test
node tests/rendered-html.test.mjs
```

最后一条可单独查看每项 HTML 回归检查的结果。

## 上线后的优先事项

1. 发布后确认正式域名的 robots、sitemap、308、404 和中英文页面 HTML 与本地结果一致，并确认 Cloudflare 的站点级爬虫策略没有挡住 Googlebot。应用代码的 robots 不能覆盖边缘防火墙规则。
2. 在已验证的 Search Console 域名资源中提交 `https://piclite.net/sitemap.xml`，用 URL 检查抽查 `/en`、`/en/heic-to-jpg`、`/en/image-compressor`、`/zh-cn/heic-to-jpg`。检查 Google 选择的 canonical、可索引状态和渲染内容。
3. 记录发布日，按页面、国家、设备和查询观察展示、点击、CTR 与平均位置。对比等长时间区间，低流量时延长观察，不把短期波动直接归因于本次改动；如账户提供生成式 AI 效果报告，也可单独观察。
4. 用真实手机和桌面样本完成转换与视觉检查；用 PageSpeed Insights / Search Console 测量 LCP、INP、CLS 后再决定性能优化顺序。
5. 后续内容优先补充可复现的真实文件对比：原始格式、像素尺寸、大小、质量设置、输出大小与截图。没有测试数据时，不发布压缩率承诺或“最佳”排名。
6. 目前仅中英文有完整工具指南。依据 Search Console 的实际需求选择下一种语言，再做完整本地化。网站经营者身份、联系方式和正式隐私声明应使用可核实资料补齐，避免杜撰信任信息。

这些步骤可验证抓取和搜索表现，不能保证排名提升或 AI 引用。
