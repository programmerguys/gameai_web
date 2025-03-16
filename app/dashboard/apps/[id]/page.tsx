import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

type PlatformType = string[];

// 模拟从服务器获取应用详情数据
function getAppData(id: string) {
  const sampleApps: Record<string, {
    id: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    apiUsage: number;
    apiLimit: number;
    icon: string;
    platform: PlatformType;
    category: string;
    endpoints: Array<{name: string; usage: number; limit: number}>;
    apiKeys: Array<{name: string; prefix: string; created: string; lastUsed: string}>;
    recentUsage: Array<{date: string; usage: number}>;
  }> = {
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
      category: '模拟经营',
      endpoints: [
        { name: '3D模型生成', usage: 7500, limit: 20000 },
        { name: '创意点子生成', usage: 3000, limit: 20000 },
        { name: '代码生成', usage: 2000, limit: 10000 },
      ],
      apiKeys: [
        { name: '开发环境', prefix: 'dev_5f7a', created: '2023-11-15', lastUsed: '2024-03-10' },
        { name: '生产环境', prefix: 'prod_3b9c', created: '2023-12-01', lastUsed: '2024-03-15' }
      ],
      recentUsage: [
        { date: '3月10日', usage: 450 },
        { date: '3月11日', usage: 380 },
        { date: '3月12日', usage: 520 },
        { date: '3月13日', usage: 480 },
        { date: '3月14日', usage: 600 },
        { date: '3月15日', usage: 550 },
        { date: '3月16日', usage: 480 },
      ]
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
      category: '冒险探索',
      endpoints: [
        { name: '3D模型生成', usage: 5000, limit: 20000 },
        { name: '创意点子生成', usage: 2500, limit: 20000 },
        { name: '代码生成', usage: 1250, limit: 10000 },
      ],
      apiKeys: [
        { name: '开发环境', prefix: 'dev_2c8d', created: '2023-12-03', lastUsed: '2024-03-14' },
        { name: '生产环境', prefix: 'prod_9e4f', created: '2023-12-20', lastUsed: '2024-03-16' }
      ],
      recentUsage: [
        { date: '3月10日', usage: 380 },
        { date: '3月11日', usage: 420 },
        { date: '3月12日', usage: 350 },
        { date: '3月13日', usage: 400 },
        { date: '3月14日', usage: 430 },
        { date: '3月15日', usage: 390 },
        { date: '3月16日', usage: 410 },
      ]
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
      category: '角色扮演',
      endpoints: [
        { name: '3D模型生成', usage: 1800, limit: 20000 },
        { name: '创意点子生成', usage: 1000, limit: 20000 },
        { name: '代码生成', usage: 400, limit: 10000 },
      ],
      apiKeys: [
        { name: '开发环境', prefix: 'dev_7f3e', created: '2024-01-21', lastUsed: '2024-03-15' },
      ],
      recentUsage: [
        { date: '3月10日', usage: 120 },
        { date: '3月11日', usage: 180 },
        { date: '3月12日', usage: 150 },
        { date: '3月13日', usage: 200 },
        { date: '3月14日', usage: 230 },
        { date: '3月15日', usage: 190 },
        { date: '3月16日', usage: 220 },
      ]
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
      category: '生存恐怖',
      endpoints: [
        { name: '3D模型生成', usage: 0, limit: 20000 },
        { name: '创意点子生成', usage: 0, limit: 20000 },
        { name: '代码生成', usage: 0, limit: 10000 },
      ],
      apiKeys: [
        { name: '开发环境', prefix: 'dev_1a9b', created: '2023-09-05', lastUsed: '2023-10-15' },
      ],
      recentUsage: [
        { date: '3月10日', usage: 0 },
        { date: '3月11日', usage: 0 },
        { date: '3月12日', usage: 0 },
        { date: '3月13日', usage: 0 },
        { date: '3月14日', usage: 0 },
        { date: '3月15日', usage: 0 },
        { date: '3月16日', usage: 0 },
      ]
    },
  };
  
  return sampleApps[id];
}

function AppStatusBadge({ status }: { status: string }) {
  const statusConfig = {
    active: { label: '运行中', className: 'bg-success/10 text-success' },
    development: { label: '开发中', className: 'bg-warning/10 text-warning' },
    inactive: { label: '未激活', className: 'bg-muted/50 text-muted-foreground' },
  }[status] || { label: status, className: '' };
  
  return (
    <Badge className={statusConfig.className} variant="outline">
      {statusConfig.label}
    </Badge>
  );
}

function UsageProgressBar({ used, total, label }: { used: number; total: number; label: string }) {
  const percent = Math.round((used / total) * 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{used.toLocaleString()} / {total.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full" 
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function ApiKeyItem({ name, prefix, created, lastUsed }: { name: string; prefix: string; created: string; lastUsed: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono">{prefix}••••••••••••</span> · 创建于 {created}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">
          最后使用: {lastUsed}
        </div>
        <Button variant="outline" size="sm">
          查看
        </Button>
      </div>
    </div>
  );
}

export default function AppDetailPage({ params }: { params: { id: string } }) {
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
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
            {app.icon}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{app.name}</h1>
              <AppStatusBadge status={app.status} />
            </div>
            <p className="text-muted-foreground">{app.description}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href={`/dashboard/apps/${app.id}/edit`}>
            <Button variant="outline">
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
              编辑应用
            </Button>
          </Link>
          <Button variant="destructive">
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
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            删除应用
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">ID</p>
                <p className="font-mono text-sm">{app.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">创建日期</p>
                <p>{app.createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">平台</p>
                <p>{app.platform.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">分类</p>
                <p>{app.category}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">配额使用情况</CardTitle>
          </CardHeader>
          <CardContent>
            <UsageProgressBar used={app.apiUsage} total={app.apiLimit} label="总API使用量" />
            
            <div className="mt-6 text-sm text-center">
              <Link href="#" className="text-primary hover:underline">
                升级套餐以获取更多配额
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">快捷操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
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
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              查看API密钥
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
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
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              导出使用报告
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
              查看文档
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="api-usage">API使用情况</TabsTrigger>
          <TabsTrigger value="api-keys">API密钥</TabsTrigger>
          <TabsTrigger value="settings">设置</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>最近使用趋势</CardTitle>
              <CardDescription>过去7天的API调用量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end gap-2">
                {app.recentUsage.map((day, i) => (
                  <div key={`usage-${day.date}-${i}`} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-primary/90 rounded-t-sm" 
                      style={{ 
                        height: `${Math.max(20, (day.usage / 600) * 150)}px`,
                        opacity: day.usage ? undefined : 0.2
                      }}
                    />
                    <div className="text-xs text-muted-foreground">{day.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>服务使用情况</CardTitle>
              <CardDescription>各API端点的使用统计</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {app.endpoints.map((endpoint) => (
                <UsageProgressBar 
                  key={`endpoint-${endpoint.name}`}
                  used={endpoint.usage} 
                  total={endpoint.limit} 
                  label={endpoint.name} 
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api-usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API使用详情</CardTitle>
              <CardDescription>查看详细的API调用统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="grid grid-cols-4 p-3 bg-muted/50 font-medium border-b">
                  <div>服务</div>
                  <div>本月使用</div>
                  <div>总额度</div>
                  <div>使用率</div>
                </div>
                {app.endpoints.map((endpoint) => {
                  const percent = Math.round((endpoint.usage / endpoint.limit) * 100);
                  return (
                    <div key={`usage-${endpoint.name}`} className="grid grid-cols-4 p-3 border-b last:border-0">
                      <div>{endpoint.name}</div>
                      <div>{endpoint.usage.toLocaleString()}</div>
                      <div>{endpoint.limit.toLocaleString()}</div>
                      <div>{percent}%</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  下载完整使用报告
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>使用历史</CardTitle>
              <CardDescription>查看历史API调用记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                暂无历史数据显示
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api-keys" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>API密钥</CardTitle>
                <CardDescription>管理您的API访问密钥</CardDescription>
              </div>
              <Button>
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
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                创建API密钥
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {app.apiKeys.map((key) => (
                  <ApiKeyItem 
                    key={`key-${key.prefix}`}
                    name={key.name} 
                    prefix={key.prefix} 
                    created={key.created} 
                    lastUsed={key.lastUsed} 
                  />
                ))}
              </div>
              
              <div className="mt-6 bg-muted/30 rounded-lg p-4 text-sm">
                <p className="font-medium mb-1">安全提示</p>
                <p className="text-muted-foreground">
                  请妥善保管您的API密钥，不要在客户端代码中暴露它们。如果您认为密钥已泄露，请立即删除并创建新密钥。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>应用设置</CardTitle>
              <CardDescription>更新应用的基本信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="app-name-settings" className="text-sm font-medium mb-1 block">
                    应用名称
                  </label>
                  <input 
                    id="app-name-settings"
                    type="text" 
                    className="w-full p-2 rounded-md border border-input bg-background" 
                    defaultValue={app.name}
                  />
                </div>
                
                <div>
                  <label htmlFor="app-description-settings" className="text-sm font-medium mb-1 block">
                    描述
                  </label>
                  <textarea 
                    id="app-description-settings"
                    className="w-full p-2 rounded-md border border-input bg-background h-24" 
                    defaultValue={app.description}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="app-platform-settings" className="text-sm font-medium mb-1 block">
                      平台
                    </label>
                    <input 
                      id="app-platform-settings"
                      type="text" 
                      className="w-full p-2 rounded-md border border-input bg-background" 
                      defaultValue={app.platform.join(', ')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="app-category-settings" className="text-sm font-medium mb-1 block">
                      分类
                    </label>
                    <input 
                      id="app-category-settings"
                      type="text" 
                      className="w-full p-2 rounded-md border border-input bg-background" 
                      defaultValue={app.category}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="app-status-settings" className="text-sm font-medium mb-1 block">
                    状态
                  </label>
                  <select 
                    id="app-status-settings"
                    className="w-full p-2 rounded-md border border-input bg-background"
                    defaultValue={app.status}
                  >
                    <option value="development">开发中</option>
                    <option value="active">运行中</option>
                    <option value="inactive">未激活</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">取消</Button>
              <Button>保存更改</Button>
            </CardFooter>
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
        </TabsContent>
      </Tabs>
    </div>
  );
} 