import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from "@/components/ui/badge";

function UsageProgressBar({ percent, label }: { percent: number; label: string }) {
  return (
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>{label}</span>
					<span className="font-medium">{percent}%</span>
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

function PlanCard({ 
  title, 
  price, 
  isCurrent, 
  features, 
  highlightFeature 
}: { 
  title: string; 
  price: string; 
  isCurrent?: boolean; 
  features: string[]; 
  highlightFeature?: string;
}) {
  return (
    <Card className={`overflow-hidden h-full ${isCurrent ? 'ring-2 ring-primary' : ''}`}>
      {isCurrent && (
        <div className="bg-primary px-4 py-1 text-center">
          <span className="text-xs font-medium text-primary-foreground">当前方案</span>
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="text-2xl font-bold">¥{price}</span>
          <span className="text-muted-foreground"> /月</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {highlightFeature && (
          <p className="text-sm font-medium">{highlightFeature}</p>
        )}
        <ul className="space-y-2 text-sm">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2 text-primary"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={isCurrent ? "outline" : "default"}>
          {isCurrent ? '当前方案' : '升级'}
        </Button>
      </CardFooter>
    </Card>
  );
}

function InvoiceItem({ 
  id, 
  date, 
  amount, 
  status 
}: { 
  id: string; 
  date: string; 
  amount: string; 
  status: 'success' | 'pending' | 'failed';
}) {
  const statusMap = {
    success: { label: '已支付', className: 'bg-success/10 text-success' },
    pending: { label: '处理中', className: 'bg-warning/10 text-warning' },
    failed: { label: '失败', className: 'bg-error/10 text-error' },
  };
  
  const { label, className } = statusMap[status];
  
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0 last:pb-0">
      <div className="flex items-center gap-4">
        <div className="bg-muted w-10 h-10 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        </div>
        <div>
          <p className="font-medium">发票 #{id}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-medium">{amount}</p>
        <Badge className={className} variant="outline">
          {label}
        </Badge>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">账单与套餐</h1>
        <p className="text-muted-foreground">
          管理您的订阅计划、查看使用情况和付款历史
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="plans">套餐方案</TabsTrigger>
          <TabsTrigger value="invoices">支付历史</TabsTrigger>
          <TabsTrigger value="payment">支付方式</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">当前套餐</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-xl">专业版</p>
                    <p className="text-sm text-muted-foreground">¥299/月</p>
                  </div>
                  <Badge>自动续费</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  下次续费日期：2023年12月15日
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  管理订阅
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">API额度使用情况</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <UsageProgressBar percent={68} label="本月已使用" />
                <div className="text-sm text-muted-foreground">
                  <p>已使用：34,000 次</p>
                  <p>总额度：50,000 次</p>
                  <p>重置日期：2023年12月1日</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">快捷操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  下载发票
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
                  联系客服
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>服务使用情况</CardTitle>
              <CardDescription>查看各项服务的使用情况</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <UsageProgressBar percent={75} label="3D模型生成 (15,000 / 20,000)" />
              <UsageProgressBar percent={45} label="创意点子生成 (9,000 / 20,000)" />
              <UsageProgressBar percent={30} label="代码生成 (3,000 / 10,000)" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PlanCard
              title="入门版"
              price="99"
              features={[
                "每月10,000次API调用",
                "3D模型生成基础功能",
                "创意点子生成",
                "社区支持"
              ]}
              highlightFeature="适合个人开发者和小型项目"
            />
            
            <PlanCard
              title="专业版"
              price="299"
              isCurrent={true}
              features={[
                "每月50,000次API调用",
                "全部AI服务",
                "优先技术支持",
                "API使用分析",
                "免费插件下载"
              ]}
              highlightFeature="适合独立工作室和中型项目"
            />
            
            <PlanCard
              title="企业版"
              price="999+"
              features={[
                "自定义API调用量",
                "专属客户经理",
                "高级安全特性",
                "私有部署选项",
                "定制开发支持"
              ]}
              highlightFeature="适合大型工作室和商业项目"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>需要更多额度？</CardTitle>
              <CardDescription>我们提供多种额外购买选项</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">额外API调用</h3>
                      <p className="text-sm text-muted-foreground">按需购买额外的API调用额度</p>
                    </div>
                    <span className="text-lg font-bold">¥0.01/次</span>
                  </div>
                  <Button variant="outline" className="w-full">购买额度</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">一对一技术支持</h3>
                      <p className="text-sm text-muted-foreground">专属工程师提供集成支持</p>
                    </div>
                    <span className="text-lg font-bold">¥999/次</span>
                  </div>
                  <Button variant="outline" className="w-full">预约支持</Button>
                </div>
              </div>
              
              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>对于大规模的定制需求，请<Button variant="link" className="h-auto p-0 text-primary">联系我们的销售团队</Button></p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>支付历史</CardTitle>
              <CardDescription>查看您的账单和付款记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <InvoiceItem
                  id="INV-0012"
                  date="2023-11-15"
                  amount="¥299.00"
                  status="success"
                />
                <InvoiceItem
                  id="INV-0011"
                  date="2023-10-15"
                  amount="¥299.00"
                  status="success"
                />
                <InvoiceItem
                  id="INV-0010"
                  date="2023-09-15"
                  amount="¥299.00"
                  status="success"
                />
                <InvoiceItem
                  id="INV-0009"
                  date="2023-08-15"
                  amount="¥99.00"
                  status="success"
                />
                <InvoiceItem
                  id="INV-0008"
                  date="2023-07-15"
                  amount="¥99.00"
                  status="success"
                />
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" size="sm">
                  查看更多历史记录
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>支付方式</CardTitle>
              <CardDescription>管理您的付款方式</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="bg-muted w-12 h-8 rounded flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Visa 尾号 4242</p>
                        <p className="text-sm text-muted-foreground">到期日：06/25</p>
                      </div>
                    </div>
                    <Badge>默认</Badge>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">添加支付方式</Button>
                  <Button>管理支付方式</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>账单接收邮箱</CardTitle>
              <CardDescription>用于接收发票和付款通知的邮箱</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">finance@yourstudio.com</p>
                  <Badge>默认</Badge>
                </div>
                <Button variant="outline">更改邮箱</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}