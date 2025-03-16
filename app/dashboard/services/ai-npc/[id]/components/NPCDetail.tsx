"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Pencil, 
  ClipboardCopy, 
  Calendar, 
  RefreshCw, 
  Cpu, 
  Tag, 
  Variable, 
  Play, 
  Code, 
  MessagesSquare,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CodeExample } from '@/components/npc/CodeExample';
import { ModelSelector } from '@/components/npc/ModelSelector';
import type { NPC } from '@/lib/npc';
import { useState } from 'react';

interface NPCDetailProps {
  npc: NPC;
}

export function NPCDetail({ npc }: NPCDetailProps) {
  const [expandedAction, setExpandedAction] = useState<string | null>(null);
  
  const statusMap = {
    active: { label: '激活', variant: 'success' as const },
    inactive: { label: '未激活', variant: 'warning' as const },
    draft: { label: '草稿', variant: 'secondary' as const }
  };
  
  const status = statusMap[npc.status] || statusMap.draft;
  const createdAt = new Date(npc.createdAt).toLocaleString('zh-CN');
  const updatedAt = new Date(npc.updatedAt).toLocaleString('zh-CN');
  
  const toggleActionExpand = (actionName: string) => {
    if (expandedAction === actionName) {
      setExpandedAction(null);
    } else {
      setExpandedAction(actionName);
    }
  };
  
  return (
    <div className="space-y-8">
      {/* 顶部头像和基本信息 */}
      <div className="relative bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-6 rounded-xl border shadow-sm">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {npc.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{npc.name}</h1>
                <p className="text-muted-foreground mt-1">{npc.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Badge 
                variant={status.variant as 'secondary' | 'default' | 'destructive' | 'outline'} 
                className="px-3 py-1"
              >
                {status.label}
              </Badge>
              
              {npc.tags.map(tag => (
                <Badge key={tag} variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>创建于 {createdAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>上次更新 {updatedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <span>模型: {npc.modelId}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link href={`/dashboard/services/ai-npc/${npc.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                编辑NPC
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/dashboard/services/ai-npc/${npc.id}/chat`}>
                <MessagesSquare className="mr-2 h-4 w-4" />
                测试对话
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* NPC系统提示词和模型配置 - 重要信息放在前面 */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="overflow-hidden border-indigo-200/50 shadow-md">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 border-b">
            <div className="flex items-center gap-2">
              <MessagesSquare className="h-5 w-5 text-indigo-600" />
              <CardTitle>系统提示词</CardTitle>
            </div>
            <CardDescription>定义NPC的行为和回应方式</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative bg-muted/30 p-6 rounded-b-md">
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute top-4 right-4 h-8 px-2 py-0 gap-1"
                onClick={() => {
                  navigator.clipboard.writeText(npc.systemPrompt);
                }}
              >
                <ClipboardCopy className="h-3.5 w-3.5" />
                复制
              </Button>
              
              <pre className="text-sm whitespace-pre-wrap font-mono text-slate-800 max-h-[400px] overflow-y-auto pr-4">
                {npc.systemPrompt}
              </pre>
            </div>
          </CardContent>
        </Card>
        
        {/* 添加模型选择器组件 */}
        <ModelSelector 
          currentModelId={npc.modelId} 
          onModelChange={(modelId, settings) => {
            console.log("模型设置已更改:", modelId, settings);
            // 在实际应用中，这里会调用API更新NPC的模型设置
          }} 
        />
      </div>
      
      {/* 三列信息卡片 */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {/* 变量卡片 */}
        <Card className="border-amber-200/50 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 border-b">
            <div className="flex items-center gap-2">
              <Variable className="h-5 w-5 text-amber-600" />
              <CardTitle>上下文变量</CardTitle>
            </div>
            <CardDescription>NPC可访问的游戏数据</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {npc.variables && npc.variables.length > 0 ? (
              <div className="space-y-3">
                {npc.variables.map((variable, index) => (
                  <div 
                    key={`${variable.name}-${index}`} 
                    className="bg-amber-50/50 p-3 rounded-md border border-amber-100 hover:shadow-sm transition-all"
                  >
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <code className="bg-amber-100 px-2 py-0.5 rounded text-amber-800">{variable.name}</code>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {variable.description}
                    </p>
                    {variable.example && (
                      <p className="text-xs text-muted-foreground/70 mt-1 bg-amber-50 p-1 rounded">
                        示例值: <span className="font-mono text-amber-700">{variable.example}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Variable className="h-12 w-12 text-muted-foreground/20 mb-2" />
                <p>未配置变量</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* 动作卡片 */}
        <Card className="border-emerald-200/50 shadow-sm md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-b">
            <div className="flex items-center gap-2">
              <Play className="h-5 w-5 text-emerald-600" />
              <CardTitle>NPC动作</CardTitle>
            </div>
            <CardDescription>NPC可执行的游戏内动作</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {npc.actions && npc.actions.length > 0 ? (
              <div className="space-y-3">
                {npc.actions.map((action, index) => (
                  <button 
                    type="button"
                    key={`${action.name}-${index}`} 
                    className={`w-full text-left bg-emerald-50/50 p-3 rounded-md border border-emerald-100 hover:shadow-sm transition-all cursor-pointer ${expandedAction === action.name ? 'shadow-sm' : ''}`}
                    onClick={() => toggleActionExpand(action.name)}
                    aria-expanded={expandedAction === action.name}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium flex items-center gap-2">
                        <code className="bg-emerald-100 px-2 py-0.5 rounded text-emerald-800">{action.name}</code>
                      </h4>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-emerald-100/70 px-2 py-0.5 rounded text-emerald-700">
                          {action.parameters ? Object.keys(action.parameters).length : 0} 参数
                        </code>
                        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${expandedAction === action.name ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                    
                    {expandedAction === action.name && action.parameters && Object.keys(action.parameters).length > 0 && (
                      <div className="mt-3 pt-3 border-t border-emerald-100">
                        <h5 className="text-xs font-medium mb-2 text-emerald-700">参数列表:</h5>
                        <div className="bg-white/50 rounded-md border border-emerald-100/80 overflow-hidden">
                          <table className="w-full text-xs">
                            <thead className="bg-emerald-50">
                              <tr>
                                <th className="py-2 px-3 text-left font-medium text-emerald-800">参数名</th>
                                <th className="py-2 px-3 text-left font-medium text-emerald-800">描述</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(action.parameters).map(([key, param], i) => (
                                <tr key={key} className={i % 2 === 0 ? 'bg-emerald-50/30' : 'bg-white'}>
                                  <td className="py-1.5 px-3 font-mono">{key}</td>
                                  <td className="py-1.5 px-3 text-muted-foreground">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Play className="h-12 w-12 text-muted-foreground/20 mb-2" />
                <p>未配置动作</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* SDK集成 */}
      <Card className="border-purple-200/50 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-purple-600" />
            <CardTitle>SDK集成</CardTitle>
          </div>
          <CardDescription>将此NPC集成到你的游戏中</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6">
            <CodeExample npc={npc} />
          </div>
        </CardContent>
        <CardFooter className="bg-purple-50/50 border-t border-purple-100">
          <div className="w-full flex justify-between items-center">
            <p className="text-sm text-purple-700">查看更多集成示例和教程</p>
            <Button variant="link" size="sm" className="gap-1 text-purple-700" asChild>
              <Link href="/docs/sdk">
                <span>文档中心</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 