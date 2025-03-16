import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// 模拟从服务器获取应用详情数据
function getAppData(id: string) {
  const sampleApps = {
    'app-1': {
      id: 'app-1',
      name: '冒险岛物语',
      description: '一款像素风格的模拟经营游戏，玩家可以建造自己的小岛，与动物居民互动。',
      status: 'active',
      createdAt: '2023-11-15',
      apiUsage: 12500,
      apiLimit: 50000,
      icon: '🏝️',
      platform: ['iOS', 'Android', 'Steam'],
      category: 'simulation',
      services: ['3d-model', 'idea', 'code'],
      endpoints: [
        { name: '3D模型生成', usage: 7500, limit: 20000 },
        { name: '创意点子生成', usage: 3000, limit: 20000 },
        { name: '代码生成', usage: 2000, limit: 10000 },
      ],
    },
    'app-2': {
      id: 'app-2',
      name: '星际探险家',
      description: '科幻太空探索游戏，玩家驾驶飞船探索未知星球，收集资源并与外星文明互动。',
      status: 'active',
      createdAt: '2023-12-03',
      apiUsage: 8750,
      apiLimit: 50000,
      icon: '🚀',
      platform: ['PC', 'Steam', 'Xbox'],
      category: 'adventure',
      services: ['3d-model', 'idea', 'code', 'animation'],
      endpoints: [
        { name: '3D模型生成', usage: 5000, limit: 20000 },
        { name: '创意点子生成', usage: 2500, limit: 20000 },
        { name: '代码生成', usage: 1250, limit: 10000 },
      ],
    },
    'app-3': {
      id: 'app-3',
      name: '魔法学院',
      description: '魔法题材的角色扮演游戏，玩家可以学习各种魔法，完成任务并参与魔法竞赛。',
      status: 'development',
      createdAt: '2024-01-21',
      apiUsage: 3200,
      apiLimit: 50000,
      icon: '🧙',
      platform: ['iOS', 'Android'],
      category: 'rpg',
      services: ['3d-model', 'idea', 'animation', 'sound'],
      endpoints: [
        { name: '3D模型生成', usage: 1800, limit: 20000 },
        { name: '创意点子生成', usage: 1000, limit: 20000 },
        { name: '代码生成', usage: 400, limit: 10000 },
      ],
    },
    'app-4': {
      id: 'app-4',
      name: '僵尸末日',
      description: '末日生存游戏，玩家需要在僵尸横行的世界中生存，收集资源并建立庇护所。',
      status: 'inactive',
      createdAt: '2023-09-05',
      apiUsage: 0,
      apiLimit: 50000,
      icon: '🧟',
      platform: ['PC', 'PlayStation'],
      category: 'action',
      services: ['3d-model', 'code'],
      endpoints: [
        { name: '3D模型生成', usage: 0, limit: 20000 },
        { name: '创意点子生成', usage: 0, limit: 20000 },
        { name: '代码生成', usage: 0, limit: 10000 },
      ],
    },
  };
  
  return sampleApps[id as keyof typeof sampleApps];
}

export default function EditAppPage({ params }: { params: { id: string } }) {
  const app = getAppData(params.id);
  
  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-5xl mb-4">😕</div>
        <h1 className="text-2xl font-bold mb-2">找不到应用</h1>
        <p className="text-muted-foreground mb-6">ID为 {params.id} 的应用不存在或已被删除</p>
        <Link href="/dashboard/apps">
          <Button>返回应用列表</Button>
        </Link>
      </div>
    );
  }
  
  // 检查平台是否已选择
  const isPlatformSelected = (platform: string) => {
    return app.platform.includes(platform);
  };
  
  // 检查服务是否已选择
  const isServiceSelected = (service: string) => {
    return app.services.includes(service);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">编辑应用</h1>
        <p className="text-muted-foreground">
          修改 <span className="font-medium">{app.name}</span> 的配置
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>更新应用的基本设置</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="app-name" className="text-sm font-medium mb-1 block">
                  应用名称 <span className="text-destructive">*</span>
                </label>
                <input 
                  id="app-name"
                  type="text" 
                  className="w-full p-2 rounded-md border border-input bg-background" 
                  defaultValue={app.name}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="app-description" className="text-sm font-medium mb-1 block">
                  应用描述 <span className="text-destructive">*</span>
                </label>
                <textarea 
                  id="app-description"
                  className="w-full p-2 rounded-md border border-input bg-background h-24" 
                  defaultValue={app.description}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="app-category" className="text-sm font-medium mb-1 block">
                    游戏类型 <span className="text-destructive">*</span>
                  </label>
                  <select 
                    id="app-category"
                    className="w-full p-2 rounded-md border border-input bg-background"
                    defaultValue={app.category}
                    required
                  >
                    <option value="action">动作游戏</option>
                    <option value="adventure">冒险游戏</option>
                    <option value="rpg">角色扮演</option>
                    <option value="strategy">策略游戏</option>
                    <option value="simulation">模拟经营</option>
                    <option value="puzzle">解谜游戏</option>
                    <option value="sports">体育游戏</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="app-platform" className="text-sm font-medium mb-1 block">
                    发布平台 <span className="text-destructive">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="platform-ios" 
                        className="rounded border-gray-300" 
                        defaultChecked={isPlatformSelected('iOS')}
                      />
                      <span>iOS</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="platform-android" 
                        className="rounded border-gray-300" 
                        defaultChecked={isPlatformSelected('Android')}
                      />
                      <span>Android</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="platform-pc" 
                        className="rounded border-gray-300" 
                        defaultChecked={isPlatformSelected('PC')}
                      />
                      <span>PC</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="platform-console" 
                        className="rounded border-gray-300" 
                        defaultChecked={isPlatformSelected('PlayStation') || isPlatformSelected('Xbox')}
                      />
                      <span>主机</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="platform-web" 
                        className="rounded border-gray-300" 
                        defaultChecked={isPlatformSelected('Web')}
                      />
                      <span>Web</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="platform-steam" 
                        className="rounded border-gray-300" 
                        defaultChecked={isPlatformSelected('Steam')}
                      />
                      <span>Steam</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="app-icon" className="text-sm font-medium mb-1 block">
                  应用图标
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 border border-input rounded-lg flex items-center justify-center bg-muted/30 text-2xl">
                    {app.icon}
                  </div>
                  <Button variant="outline" type="button">
                    更改图标
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    最佳尺寸：512×512像素 (PNG或JPG)
                  </p>
                </div>
              </div>
              
              <div>
                <label htmlFor="app-status" className="text-sm font-medium mb-1 block">
                  应用状态
                </label>
                <select 
                  id="app-status"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  defaultValue={app.status}
                >
                  <option value="development">开发中</option>
                  <option value="active">运行中</option>
                  <option value="inactive">未激活</option>
                </select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/dashboard/apps/${app.id}`}>
            <Button variant="outline">取消</Button>
          </Link>
          <Button>保存更改</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API服务选择</CardTitle>
          <CardDescription>更新您需要的GameAI服务</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="service-3d-model" 
                className="mt-1 rounded border-gray-300"
                defaultChecked={isServiceSelected('3d-model')}
              />
              <div>
                <label htmlFor="service-3d-model" className="font-medium block">
                  3D模型生成
                </label>
                <p className="text-sm text-muted-foreground">
                  基于文本描述生成游戏中的3D模型和资产
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="service-idea" 
                className="mt-1 rounded border-gray-300"
                defaultChecked={isServiceSelected('idea')}
              />
              <div>
                <label htmlFor="service-idea" className="font-medium block">
                  创意点子生成
                </label>
                <p className="text-sm text-muted-foreground">
                  生成游戏故事、角色背景、任务和对话内容
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="service-code" 
                className="mt-1 rounded border-gray-300"
                defaultChecked={isServiceSelected('code')}
              />
              <div>
                <label htmlFor="service-code" className="font-medium block">
                  代码生成
                </label>
                <p className="text-sm text-muted-foreground">
                  生成游戏逻辑、AI行为和游戏机制的代码
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="service-animation" 
                className="mt-1 rounded border-gray-300"
                defaultChecked={isServiceSelected('animation')}
              />
              <div>
                <label htmlFor="service-animation" className="font-medium block">
                  动画生成
                </label>
                <p className="text-sm text-muted-foreground">
                  为角色和场景生成自然流畅的动画
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="service-sound" 
                className="mt-1 rounded border-gray-300"
                defaultChecked={isServiceSelected('sound')}
              />
              <div>
                <label htmlFor="service-sound" className="font-medium block">
                  音效与音乐生成
                </label>
                <p className="text-sm text-muted-foreground">
                  生成游戏音效和背景音乐
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">危险区域</CardTitle>
          <CardDescription>谨慎操作，这些操作无法撤销</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-destructive"
                  aria-hidden="true"
                >
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium">删除应用</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-3">
                  删除此应用将撤销所有API密钥，并永久删除所有与此应用相关的数据。此操作无法撤销。
                </p>
                <Button variant="destructive">
                  删除应用
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 