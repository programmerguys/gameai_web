import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// 示例应用数据
const sampleApps = [
  {
    id: 'app-1',
    name: '冒险岛物语',
    description: '一款像素风格的模拟经营游戏，玩家可以建造自己的小岛，与动物居民互动。',
    status: 'active',
    createdAt: '2023-11-15',
    apiUsage: 12500,
    apiLimit: 50000,
  },
  {
    id: 'app-2',
    name: '星际探险家',
    description: '科幻太空探索游戏，玩家驾驶飞船探索未知星球，收集资源并与外星文明互动。',
    status: 'active',
    createdAt: '2023-12-03',
    apiUsage: 8750,
    apiLimit: 50000,
  },
  {
    id: 'app-3',
    name: '魔法学院',
    description: '魔法题材的角色扮演游戏，玩家可以学习各种魔法，完成任务并参与魔法竞赛。',
    status: 'development',
    createdAt: '2024-01-21',
    apiUsage: 3200,
    apiLimit: 50000,
  },
  {
    id: 'app-4',
    name: '僵尸末日',
    description: '末日生存游戏，玩家需要在僵尸横行的世界中生存，收集资源并建立庇护所。',
    status: 'inactive',
    createdAt: '2023-09-05',
    apiUsage: 0,
    apiLimit: 50000,
  }
];

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

function UsageProgressBar({ used, total }: { used: number; total: number }) {
  const percent = Math.round((used / total) * 100);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>API 使用量</span>
        <span>{used.toLocaleString()} / {total.toLocaleString()}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full" 
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function AppCard({ app }: { app: typeof sampleApps[0] }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{app.name}</CardTitle>
          <AppStatusBadge status={app.status} />
        </div>
        <CardDescription className="line-clamp-2 h-10">
          {app.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 mr-2 text-muted-foreground"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            <span className="text-muted-foreground">创建于: {app.createdAt}</span>
          </div>
          
          <UsageProgressBar used={app.apiUsage} total={app.apiLimit} />
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex flex-wrap gap-2">
        <Link href={`/dashboard/apps/${app.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
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
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            查看
          </Button>
        </Link>
        <Link href={`/dashboard/apps/${app.id}/edit`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
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
            编辑
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

function EmptyAppCard() {
  return (
    <Card className="h-full flex flex-col items-center justify-center p-6 border-dashed">
      <div className="mb-4 rounded-full bg-muted/50 p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-muted-foreground"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </div>
      <p className="text-center text-muted-foreground mb-4">创建新的游戏应用</p>
      <Link href="/dashboard/apps/new">
        <Button variant="outline">
          创建应用
        </Button>
      </Link>
    </Card>
  );
}

export default function AppsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">应用管理</h1>
          <p className="text-muted-foreground">
            创建和管理您的游戏应用，查看API调用情况
          </p>
        </div>
        <Link href="/dashboard/apps/new">
          <Button className="flex items-center">
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
            创建应用
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
        <EmptyAppCard />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>API 集成指南</CardTitle>
          <CardDescription>按照以下步骤将 GameAI 集成到您的游戏应用中</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex">
              <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <h3 className="font-medium">创建应用</h3>
                <p className="text-sm text-muted-foreground">
                  首先创建一个新的应用，并配置基本信息
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div>
                <h3 className="font-medium">获取 API 密钥</h3>
                <p className="text-sm text-muted-foreground">
                  在 API 密钥页面生成您的应用专属密钥
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div>
                <h3 className="font-medium">集成 SDK</h3>
                <p className="text-sm text-muted-foreground">
                  使用我们的 SDK 将 GameAI 功能集成到您的游戏中
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">4</span>
              </div>
              <div>
                <h3 className="font-medium">测试与部署</h3>
                <p className="text-sm text-muted-foreground">
                  在开发环境测试功能并部署到生产环境
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              查看详细文档
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 