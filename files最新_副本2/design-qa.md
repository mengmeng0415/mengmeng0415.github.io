# Design QA

## Target flow

打开一个已注入的离线 HTML → 在右侧新建页面 → 在不同页面之间原地切换 → 返回原页面后，页面内容与批注仍然存在；同时验证页面搜索、重命名、收起/展开，以及元素跳转的“文档页面 / 链接”两种类型。

## Automated checks

- PASS：三个交付 HTML 中所有内嵌 JavaScript 均通过语法解析。
- PASS：注入器中的 `LAYER` 与最新“批注层 + 编辑层”合并内容完全一致。
- PASS：页面切换代码不包含 `location.reload`、`location.href =` 或 `window.location =`。
- PASS：切换前会把当前页面 HTML 与当前批注序列化到 `edit-pages-data`。
- PASS：切换后会在同一文档中替换页面内容，并通过 `__annoReload` 重载对应页面的批注状态。
- PASS：导出批注版/只读版之前会同步当前页面数据到页面仓库。
- PASS：数据往返模型验证“首页 → 页面1 → 首页”后，首页批注仍保留。
- PASS：右侧页面栏具备新建、搜索、重命名和收起/展开入口。
- PASS：元素跳转类型已改为“文档页面 / 链接”；文档页面下拉支持选择已有页面及新建页面。

## Visual/browser verification

- BLOCKED：Codex 应用内浏览器的安全策略拒绝打开本地 `file:///tmp/document-shell-qa.html`，因此本次无法完成真实渲染截图、点击流程和控制台日志检查。
- 未使用其他浏览器或 Playwright 绕过，因为用户未授权更换浏览器。

## Remaining risk

- 仍需在用户本机实际双击一个由注入器生成的 HTML，人工走一遍目标流程，确认其具体原型页面的 CSS 不会与新增固定顶栏/右侧栏发生覆盖冲突。

final result: blocked
