"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ApiKey } from './utils';

interface SdkIntegrationGuideProps {
  apiKey?: ApiKey;
}

export function SdkIntegrationGuide({ apiKey }: SdkIntegrationGuideProps) {
  const displayApiKey = apiKey?.key || 'YOUR_API_KEY_HERE';
  
  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-800/30">
      <CardHeader>
        <CardTitle className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400"
            aria-hidden="true"
          >
            <title>SDK图标</title>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
            <polyline points="7.5 19.79 7.5 14.6 3 12" />
            <polyline points="21 12 16.5 14.6 16.5 19.79" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          SDK快速集成
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-indigo-800 dark:text-indigo-300">
              Unity集成
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              使用我们的SDK，只需几行代码即可在Unity项目中集成GameAI的全部AI能力：
            </p>
            <div className="mt-2 p-4 bg-muted dark:bg-slate-900/60 rounded-md">
              <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
{`// GameAI Manager设置代码 - 放置在游戏启动场景中
using UnityEngine;
using GameAI.SDK;

public class GameAISetup : MonoBehaviour
{
    [SerializeField] private string apiKey = "${displayApiKey}";
    [SerializeField] private string gameId = "YOUR_GAME_ID_HERE";
    
    [Header("配置")]
    [SerializeField] private GameAIEnvironment environment = GameAIEnvironment.Production;
    
    private void Awake()
    {
        // 初始化GameAI SDK
        GameAIManager.Initialize(new GameAIConfig
        {
            ApiKey = apiKey,
            GameId = gameId,
            Environment = environment
        });
        
        Debug.Log("GameAI SDK初始化完成!");
    }
}`}
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-indigo-800 dark:text-indigo-300">一行代码创建AI NPC</h3>
            <div className="bg-indigo-100 dark:bg-indigo-950/40 p-3 rounded-md text-sm border border-indigo-200 dark:border-indigo-800/50">
              <code className="font-mono text-indigo-800 dark:text-indigo-300">
                AINPC npc = GameAIManager.CreateNPC(&quot;npc-123456&quot;);
              </code>
              <p className="mt-1 text-muted-foreground">
                只需一行代码，即可创建在平台上定义的完整AI NPC，无需手动编写提示词或配置。
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm border">
              <h4 className="text-sm font-medium mb-1.5">支持的引擎</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-1 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>Unity (C#)</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Unity (C#)
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-1 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>Unreal Engine (C++)</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Unreal Engine (C++)
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-1 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>Godot (GDScript)</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Godot (GDScript)
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm border">
              <h4 className="text-sm font-medium mb-1.5">可用功能</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-1 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>AI NPC对话系统</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  AI NPC对话系统
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-1 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>动态场景生成</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  动态场景生成
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-1 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>3D模型生成</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  3D模型生成
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <Button variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
                aria-hidden="true"
              >
                <title>下载图标</title>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              下载SDK包
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SdkIntegrationGuide;