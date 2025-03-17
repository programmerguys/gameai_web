# GameAI 游戏AI赋能平台

<div align="center">
  <img src="public/images/logo.png" alt="GameAI Logo" width="200"/>
  <p>为游戏开发者提供全方位的AI能力，加速游戏开发，提升游戏体验</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js CI](https://github.com/gameai/gameai_web/actions/workflows/ci.yml/badge.svg)](https://github.com/gameai/gameai_web/actions/workflows/ci.yml)
  [![npm version](https://img.shields.io/npm/v/gameai.svg)](https://www.npmjs.com/package/gameai)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/gameai/gameai_web/blob/main/CONTRIBUTING.md)
</div>

## 📖 简介

GameAI是一个开源的游戏AI赋能平台，为游戏开发者提供各种AI能力，帮助加速游戏开发流程、提升游戏体验。通过实时生成游戏文本、对话策略及动态场景，实现千人千面NPC交互、多类型游戏适配和商业智能化融合。

## ✨ 核心功能

- **3D模型生成**：基于文本描述生成游戏中的3D模型和资产
- **创意点子生成**：生成游戏故事、角色背景、任务和对话内容
- **代码生成**：生成游戏逻辑、AI行为和游戏机制的代码
- **动画生成**：为角色和场景生成自然流畅的动画
- **AI NPC系统**：创建智能NPC，提供自然对话和行为
- **游戏知识库**：构建和管理游戏相关知识，支持分类和标签管理
- **故事情节生成器**：通过可视化界面创建分支故事情节和对话结构

## 🚀 快速开始

### 安装

```bash
# 克隆项目
git clone https://github.com/gameai/gameai_web.git
cd gameai_web

# 安装依赖
npm install
# 或使用 pnpm
pnpm install
```

### 运行开发环境

```bash
npm run dev
# 或使用 pnpm
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看平台首页。

### 构建生产版本

```bash
npm run build
npm start
# 或使用 pnpm
pnpm build
pnpm start
```

## 💡 使用示例

<details>
<summary>创建AI NPC角色</summary>

```jsx
// 创建NPC示例
import { createNPC } from '@gameai/sdk';

const npc = createNPC({
  name: '商人马库斯',
  description: '城镇资深商人，对待顾客态度取决于过往交易和信任度',
  systemPrompt: `你是商人马库斯，经营着镇上最大的商店...`,
  actions: [
    { name: 'sellItem', description: '出售物品给玩家' },
    { name: 'buyItem', description: '从玩家处购买物品' }
  ]
});
```
</details>

<details>
<summary>生成游戏代码</summary>

```jsx
// 使用代码生成器示例
import { generateCode } from '@gameai/sdk';

const code = await generateCode({
  prompt: '创建一个玩家角色移动控制器，支持跳跃和冲刺',
  language: 'csharp',
  engine: 'unity'
});

console.log(code);
```
</details>

更多示例请查看 [文档](docs/examples/README.md)。

## 🔨 技术架构

- **前端框架**: [Next.js](https://nextjs.org/) 
- **UI组件**: [Tailwind CSS](https://tailwindcss.com/)
- **状态管理**: [Zustand](https://github.com/pmndrs/zustand)
- **可视化编辑**: [ReactFlow](https://reactflow.dev/)
- **3D渲染**: [Three.js](https://threejs.org/) 和 [React Three Fiber](https://github.com/pmndrs/react-three-fiber)

详细架构文档请查看 [架构概览](docs/architecture/overview.md)。

## 👥 贡献指南

我们欢迎各种形式的贡献，包括但不限于：

- 🐛 提交问题和错误报告
- 💡 提出新功能建议
- 🔍 改进文档
- 👨‍💻 提交代码

请阅读我们的 [贡献指南](CONTRIBUTING.md) 了解更多信息。

## 📝 开源协议

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 鸣谢

感谢所有为项目做出贡献的开发者！

<a href="https://github.com/gameai/gameai_web/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=gameai/gameai_web" />
</a>

## 📮 联系我们

- 官方网站: [https://gameai.example.com](https://gameai.example.com)
- GitHub Issues: [https://github.com/gameai/gameai_web/issues](https://github.com/gameai/gameai_web/issues)
- 邮箱: support@gameai.example.com
