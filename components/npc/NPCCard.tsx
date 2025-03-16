import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, type NPC } from '@/lib/npc';

interface NPCCardProps {
  npc: NPC;
  showActions?: boolean;
}

export function NPCCard({ npc, showActions = true }: NPCCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="bg-primary/10 text-primary p-2 rounded-full mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 16v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
                <path d="M12 14V7" />
                <path d="M9 10l3 4 3-4" />
                <path d="M16 10h6" />
                <path d="M19 7v6" />
              </svg>
            </div>
            <CardTitle className="text-lg">{npc.name}</CardTitle>
          </div>
          <Badge variant={getStatusVariant(npc.status)}>
            {getStatusText(npc.status)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{npc.description}</p>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium mb-1">动作</h4>
            <div className="flex flex-wrap gap-1">
              {npc.actions.map((action) => (
                <Badge key={action.name} variant="outline" className="bg-muted/40">
                  {action.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">标签</h4>
            <div className="flex flex-wrap gap-1">
              {npc.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-secondary/40">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>更新于: {formatDate(npc.updatedAt)}</p>
          </div>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="pt-2">
          <div className="flex space-x-2 w-full">
            <Link href={`/dashboard/services/ai-npc/${npc.id}`} className="flex-1">
              <Button variant="outline" className="w-full">查看详情</Button>
            </Link>
            <Link href={`/dashboard/services/ai-npc/${npc.id}/edit`} className="flex-1">
              <Button className="w-full">编辑</Button>
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

// 辅助函数 - 获取状态徽章样式
function getStatusVariant(status: NPC['status']): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'active':
      return 'default';
    case 'inactive':
      return 'secondary';
    case 'draft':
      return 'outline';
    default:
      return 'outline';
  }
}

// 辅助函数 - 获取状态文本
function getStatusText(status: NPC['status']): string {
  switch (status) {
    case 'active':
      return '已激活';
    case 'inactive':
      return '未激活';
    case 'draft':
      return '草稿';
    default:
      return '未知状态';
  }
} 