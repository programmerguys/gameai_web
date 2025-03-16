"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ApiUsageGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API使用指南</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="curl" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="curl">cURL</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
          </TabsList>
          
          <TabsContent value="curl" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                使用API密钥进行身份验证
              </h3>
              <p className="text-sm text-muted-foreground">
                将您的API密钥通过请求头{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                  X-GameAI-API-Key
                </code>{" "}
                包含在所有请求中：
              </p>
              <div className="mt-2 p-4 bg-muted rounded-md">
                <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                  {`curl https://api.gameai.com/v1/models/generate \\
  -H "X-GameAI-API-Key: 您的API密钥" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "一个低多边形树的3D模型"}'`}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="javascript" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                JavaScript客户端
              </h3>
              <p className="text-sm text-muted-foreground">
                使用我们的JavaScript库可以轻松集成GameAI功能：
              </p>
              <div className="mt-2 p-4 bg-muted rounded-md">
                <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                  {`// 安装: npm install @gameai/sdk

import { GameAI } from '@gameai/sdk';

// 初始化SDK
const gameai = new GameAI({
  apiKey: '您的API密钥', // 建议使用环境变量存储
  timeout: 30000, // 可选，请求超时时间（毫秒）
});

// 生成3D模型
async function generateModel() {
  try {
    const response = await gameai.models.generate({
      prompt: '一个低多边形树的3D模型',
      format: 'glb',
      style: 'lowpoly', 
    });
    
    console.log('生成的模型URL:', response.modelUrl);
    return response.modelUrl;
  } catch (error) {
    console.error('生成失败:', error);
  }
}`}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="python" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                Python客户端
              </h3>
              <p className="text-sm text-muted-foreground">
                使用我们的Python SDK来生成和管理GameAI资源：
              </p>
              <div className="mt-2 p-4 bg-muted rounded-md">
                <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                  {`# 安装: pip install gameai-sdk

import os
from gameai import GameAI

# 初始化SDK（建议通过环境变量设置API密钥）
api_key = os.environ.get("GAMEAI_API_KEY") or "您的API密钥"
gameai = GameAI(api_key=api_key)

# 创建AI NPC
def create_character():
    npc = gameai.npcs.create(
        name="森林守卫",
        description="一个保护森林的神秘角色，拥有植物控制能力",
        system_prompt="你是一个自然的守护者，说话风格神秘且富有诗意。你热爱所有的植物和动物。",
        model_id="gpt-4",
        tags=["fantasy", "nature", "guardian"]
    )
    
    print(f"NPC创建成功! ID: {npc.id}")
    return npc

# 使用AI NPC进行对话
def chat_with_npc(npc_id):
    response = gameai.npcs.chat(
        npc_id=npc_id,
        message="你能告诉我关于这片森林的历史吗？",
        conversation_id="conv_12345"  # 可选，用于跟踪对话上下文
    )
    
    print(f"NPC回复: {response.message}")`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <h3 className="font-semibold mb-2">API密钥安全最佳实践</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>不要在公共代码库或客户端代码中暴露您的API密钥</li>
            <li>使用环境变量或安全的密钥管理服务来存储API密钥</li>
            <li>为不同环境（开发、测试、生产）使用不同的API密钥</li>
            <li>定期轮换您的API密钥以提高安全性</li>
            <li>仅分配必要的访问范围，遵循最小权限原则</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <a
            href="/docs/api"
            className="text-primary hover:text-primary-hover hover:underline inline-flex items-center"
          >
            查看API文档
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 ml-1"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14L21 3" />
            </svg>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default ApiUsageGuide; 