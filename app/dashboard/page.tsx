import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 仪表盘统计卡片组件
function StatCard({ title, value, trend, icon }: { title: string; value: string; trend?: string; icon: React.ReactNode }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground">
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// 服务卡片组件
function ServiceCard({ 
  title, 
  description, 
  icon, 
  href, 
  usagePercent 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  href: string; 
  usagePercent: number;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-md text-primary">
            {icon}
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">本月使用量</span>
            <span className="text-xs font-semibold">{usagePercent}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <a 
            href={href} 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary w-full"
          >
            访问服务
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">控制台</h1>
        <p className="text-muted-foreground mt-1">
          查看您的游戏AI服务使用情况和性能数据
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="API调用总量"
          value="1,234,567"
          trend="比上月增长 12%"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M16 8l-8 8" />
              <path d="M8 8l8 8" />
              <rect x="2" y="2" width="20" height="20" rx="2" />
            </svg>
          }
        />
        <StatCard
          title="活跃应用数"
          value="8"
          trend="本周新增 2 个应用"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M16 6H3v12h13V6Z" />
              <path d="M21 6h-3v12h3V6Z" />
            </svg>
          }
        />
        <StatCard
          title="平均响应时间"
          value="128ms"
          trend="比上月提升 18%"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        />
        <StatCard
          title="账户额度"
          value="65%"
          trend="剩余 350,000 次调用"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 2v20" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold tracking-tight mt-8 mb-4">AI服务</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            title="3D模型生成"
            description="生成游戏资产和角色的3D模型"
            usagePercent={75}
            href="/dashboard/services/model-generator"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M12.5 3.3 20 8l-7.5 4.7L5 8l7.5-4.7Z" />
                <path d="M20 8v8l-7.5 4.7" />
                <path d="M20 16l-7.5-4.7" />
                <path d="M4 16l8 5" />
                <path d="M4 8v8" />
              </svg>
            }
          />
          <ServiceCard
            title="游戏创意点子"
            description="生成游戏创意、剧情和机制建议"
            usagePercent={45}
            href="/dashboard/services/idea-generator"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M9 3H5a2 2 0 0 0-2 2v4" />
                <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
                <path d="M15 3h4a2 2 0 0 1 2 2v4" />
                <path d="M15 21h4a2 2 0 0 0 2-2v-4" />
                <path d="M9 9h6M9 15h6" />
              </svg>
            }
          />
          <ServiceCard
            title="代码生成"
            description="自动生成游戏脚本和组件代码"
            usagePercent={30}
            href="/dashboard/services/code-generator"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            }
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  >
                    <path d="M12.5 3.3 20 8l-7.5 4.7L5 8l7.5-4.7Z" />
                    <path d="M20 8v8l-7.5 4.7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">生成了5个3D角色模型</p>
                  <p className="text-xs text-muted-foreground">2小时前</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">为&quot;冒险游戏&quot;生成了控制器代码</p>
                  <p className="text-xs text-muted-foreground">昨天</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  >
                    <path d="M9 3H5a2 2 0 0 0-2 2v4" />
                    <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
                    <path d="M15 3h4a2 2 0 0 1 2 2v4" />
                    <path d="M15 21h4a2 2 0 0 0 2-2v-4" />
                    <path d="M9 9h6M9 15h6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">创建了新的游戏剧情分支</p>
                  <p className="text-xs text-muted-foreground">3天前</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>使用提示</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-1">优化3D模型生成效果</h3>
                <p className="text-sm text-muted-foreground">
                  提供详细的文本描述，包括风格、颜色、形状和尺寸等细节，可以获得更精准的模型生成结果。
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-1">集成Unity插件</h3>
                <p className="text-sm text-muted-foreground">
                  查看我们的Unity插件文档，了解如何在Unity编辑器中一键导入生成的3D模型和材质。
                </p>
              </div>
              
              <div className="grid place-items-center mt-6">
                <a href="/docs" className="text-sm text-primary hover:underline">
                  查看更多使用指南
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}