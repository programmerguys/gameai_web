'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  PlusCircle, 
  Search, 
  Layers, 
  Tag, 
  Clock, 
  Filter, 
  RefreshCw,
  ListFilter,
  LayoutGrid
} from 'lucide-react';
import { NPCList } from '@/components/npc/NPCList';
import { getNPCs } from '@/lib/npc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import type { NPC } from '@/lib/npc';

const SKELETON_IDS = ["sk1", "sk2", "sk3", "sk4"];
const CATEGORIES = [
  { id: 'all', name: '全部', count: '8' },
  { id: 'merchant', name: '商人', count: '2' },
  { id: 'quest', name: '任务NPC', count: '3' },
  { id: 'guide', name: '引导助手', count: '1' },
  { id: 'enemy', name: '敌对NPC', count: '1' },
  { id: 'companion', name: '伙伴', count: '1' },
];

const STATUS_OPTIONS = [
  { id: 'all', name: '全部状态' },
  { id: 'active', name: '已激活' },
  { id: 'inactive', name: '未激活' },
  { id: 'draft', name: '草稿' },
];

const COMMON_TAGS = ['商人', '冒险家', '任务', '教程', '引导', '幽默', 'AI助手'];

export default function NPCPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI NPC</h1>
          <p className="text-muted-foreground">
            创建、管理和部署智能NPC，提升游戏中的角色交互体验
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/services/ai-npc/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            创建新NPC
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* 左侧过滤栏 */}
        <div className="w-full md:w-64 space-y-6 flex-shrink-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <Layers className="h-4 w-4 mr-2" />
                分类
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <nav className="space-y-1">
                {CATEGORIES.map(category => (
                  <Link 
                    key={category.id}
                    href="#"
                    className={`flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors ${
                      category.id === 'all' ? 'bg-muted font-medium' : ''
                    }`}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="ml-auto">{category.count}</Badge>
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                状态
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <nav className="space-y-1">
                {STATUS_OPTIONS.map(status => (
                  <Link 
                    key={status.id}
                    href="#"
                    className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors ${
                      status.id === 'all' ? 'bg-muted font-medium' : ''
                    }`}
                  >
                    {status.name}
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                标签
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {COMMON_TAGS.map(tag => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 右侧内容区 */}
        <div className="flex-1 space-y-6">
          {/* 搜索和筛选区 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="搜索NPC..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Button variant="outline" className="h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选
                </Button>
              </div>
              
              <Button variant="outline" size="icon" className="h-10 w-10" title="刷新列表">
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Tabs 
                defaultValue="grid" 
                value={viewMode}
                onValueChange={(value) => setViewMode(value as 'grid' | 'list')}
                className="h-10"
              >
                <TabsList className="h-10">
                  <TabsTrigger value="grid" className="px-3 h-10">
                    <LayoutGrid className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" className="px-3 h-10">
                    <ListFilter className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* NPC列表内容 */}
          <Suspense fallback={<NPCListSkeleton />}>
            <NPCListContent viewMode={viewMode} searchQuery={searchQuery} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

interface NPCListContentProps {
  viewMode: 'grid' | 'list';
  searchQuery: string;
}

function NPCListContent({ viewMode, searchQuery }: NPCListContentProps) {
  const [npcs, setNpcs] = useState<NPC[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNPCs() {
      try {
        // 获取所有NPCs
        const allNpcs = await getNPCs();
        setNpcs(allNpcs);
      } catch (error) {
        console.error("Failed to fetch NPCs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNPCs();
  }, []);
  
  // 根据搜索关键词筛选
  const filteredNPCs = searchQuery 
    ? npcs.filter(npc => 
        npc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        npc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        npc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : npcs;
  
  if (loading) {
    return <NPCListSkeleton />;
  }
  
  return <NPCList npcs={filteredNPCs} viewMode={viewMode} />;
}

function NPCListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-[40px] w-full max-w-[50%] rounded-md bg-muted animate-pulse" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SKELETON_IDS.map((id) => (
          <div
            key={id}
            className="h-[280px] rounded-md border bg-muted animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}