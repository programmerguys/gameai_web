# 贡献指南

感谢你对GameAI项目的关注！我们非常欢迎各种形式的贡献，以帮助改进这个游戏AI赋能平台。本文档将指导你如何参与贡献。

## 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
  - [报告Bug](#报告bug)
  - [功能请求](#功能请求)
  - [提交代码](#提交代码)
  - [文档改进](#文档改进)
- [开发环境设置](#开发环境设置)
- [代码规范](#代码规范)
- [提交PR流程](#提交pr流程)
- [发布流程](#发布流程)

## 行为准则

参与本项目的所有贡献者都需要遵守我们的 [行为准则](CODE_OF_CONDUCT.md)。

## 如何贡献

### 报告Bug

如果你发现了Bug，请提交一个Issue，并使用Bug报告模板。请尽量详细地描述问题，包括：

- 问题的详细描述
- 重现步骤
- 预期行为
- 实际行为
- 截图（如适用）
- 运行环境信息
  - 浏览器版本
  - 操作系统
  - 相关软件版本

### 功能请求

如果你有新功能或改进的想法，请提交一个Issue，并使用功能请求模板。请详细描述：

- 你希望添加的功能
- 使用场景和目的
- 可能的实现方式
- 是否愿意自己实现这个功能

### 提交代码

1. Fork本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的修改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交Pull Request

### 文档改进

文档是项目的重要组成部分。如果你发现文档中有错误、缺失或不清晰的地方，请帮助我们改进：

1. 针对简单的拼写或语法错误，可以直接提交PR
2. 对于较大的文档更新，请先创建Issue讨论

## 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/yourusername/gameai_web.git
cd gameai_web

# 安装依赖
npm install
# 或
pnpm install

# 启动开发服务器
npm run dev
# 或
pnpm dev
```

## 代码规范

我们使用ESLint和Prettier来保持代码风格的一致性：

- 遵循TypeScript和React最佳实践
- 组件使用函数式组件和Hooks
- 使用命名约定：
  - 组件文件使用PascalCase命名（例如：`Button.tsx`）
  - 工具函数使用camelCase命名（例如：`formatDate.ts`）
- 提交代码前运行lint检查：
  ```bash
  npm run lint
  # 或
  pnpm lint
  ```

## 提交PR流程

1. 确保你的PR针对最新的`main`分支
2. 包含适当的测试（如适用）
3. 更新相关文档
4. 遵循PR模板填写必要信息
5. 等待代码审查和CI检查
6. 根据反馈修改代码
7. 合并PR后，你的贡献将被纳入下一个版本

## 发布流程

发布流程由维护者负责，一般遵循以下步骤：

1. 更新版本号（遵循[语义化版本](https://semver.org/lang/zh-CN/)）
2. 更新CHANGELOG.md
3. 创建发布标签
4. 推送到npm仓库（如适用）

再次感谢你的贡献！ 