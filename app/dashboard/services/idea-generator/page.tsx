import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// 创意类型定义
interface IdeaItem {
  id: string;
  title: string;
  type: 'story' | 'character' | 'quest' | 'mechanic' | 'world';
  description: string;
  createdAt: string;
  tags: string[];
  isSaved: boolean;
}

// 示例创意数据
const ideas: IdeaItem[] = [
  {
    id: '1',
    title: '失落文明的遗迹探险',
    type: 'story',
    description: '玩家扮演一名考古学家，发现了一个神秘的远古文明遗迹。这个文明拥有超越当今科技的技术，但突然消失了。玩家需要探索各种遗迹，解开谜题，揭示这个文明消失的真相，同时躲避一个试图利用这些技术的邪恶组织。',
    createdAt: '2024-03-16T14:30:00Z',
    tags: ['冒险', '解谜', '考古', '神秘'],
    isSaved: true,
  },
  {
    id: '2',
    title: '梦境编织者',
    type: 'character',
    description: '一位能够进入并操控他人梦境的角色。他们可以从梦中提取物品和能力带回现实世界，但每次这样做都会导致现实世界的规则发生微妙变化。他们需要在帮助他人解决噩梦和维持现实稳定之间取得平衡。',
    createdAt: '2024-03-15T10:15:00Z',
    tags: ['角色', '超能力', '心理', '幻想'],
    isSaved: false,
  },
  {
    id: '3',
    title: '季节循环任务系统',
    type: 'quest',
    description: '一个基于游戏内季节的动态任务系统。不同季节会触发不同类型的任务，影响NPC行为和可获得的资源。玩家需要规划自己的活动以适应季节变化，某些任务线只能在特定季节推进，增加了游戏的策略性和回访价值。',
    createdAt: '2024-03-14T16:45:00Z',
    tags: ['任务系统', '季节', '动态', '时间管理'],
    isSaved: true,
  },
  {
    id: '4',
    title: '情绪物理学',
    type: 'mechanic',
    description: '一种游戏机制，玩家角色的情绪状态会直接影响物理规则。愤怒时可能会增强力量但降低精确度，恐惧时可能会提高速度但降低视野，平静时则平衡各项属性。玩家需要学会控制和利用这些情绪状态来解决不同类型的挑战。',
    createdAt: '2024-03-12T09:20:00Z',
    tags: ['游戏机制', '情绪', '物理', '挑战'],
    isSaved: false,
  },
  {
    id: '5',
    title: '生物技术乌托邦',
    type: 'world',
    description: '一个以生物技术为主导的未来世界，人们使用生物工程而非电子设备。建筑是有生命的结构，交通工具是基因改造的生物，甚至计算机也是基于神经网络的有机体。然而，一场神秘疾病开始侵袭这些生物技术，威胁着整个社会的稳定。',
    createdAt: '2024-03-10T11:30:00Z',
    tags: ['世界观', '科幻', '生物科技', '乌托邦'],
    isSaved: true,
  },
];

// 格式化日期
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// 类型标签组件
function TypeBadge({ type }: { type: IdeaItem['type'] }) {
  const typeConfig = {
    story: {
      label: '故事',
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    },
    character: {
      label: '角色',
      className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    },
    quest: {
      label: '任务',
      className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    },
    mechanic: {
      label: '机制',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    world: {
      label: '世界观',
      className: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
    },
  };
  
  const config = typeConfig[type];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}

// 创意卡片组件
function IdeaCard({ idea }: { idea: IdeaItem }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-1">
          <TypeBadge type={idea.type} />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={idea.isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-yellow-500"
              aria-hidden="true"
            >
              <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
            </svg>
            <span className="sr-only">{idea.isSaved ? '取消收藏' : '收藏'}</span>
          </Button>
        </div>
        <CardTitle className="text-lg">{idea.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 flex-1">
        <p className="text-sm text-muted-foreground mb-4">
          {idea.description.length > 180
            ? `${idea.description.slice(0, 180)}...`
            : idea.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {idea.tags.map((tag) => (
            <Badge variant="outline" key={`${idea.id}-tag-${tag}`} className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatDate(idea.createdAt)}</span>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            编辑
          </Button>
          <Button size="sm">
            使用
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// 创意生成表单
function IdeaGenerationForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>创建新创意</CardTitle>
        <CardDescription>
          使用AI生成游戏创意，包括故事、角色、任务、机制和世界观
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label htmlFor="ideaType" className="block text-sm font-medium mb-1">
              创意类型
            </label>
            <select id="ideaType" className="w-full p-2 rounded-md border border-input bg-background">
              <option value="story">故事情节</option>
              <option value="character">角色设定</option>
              <option value="quest">任务设计</option>
              <option value="mechanic">游戏机制</option>
              <option value="world">世界观构建</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="gameGenre" className="block text-sm font-medium mb-1">
              游戏类型
            </label>
            <select id="gameGenre" className="w-full p-2 rounded-md border border-input bg-background">
              <option value="action">动作游戏</option>
              <option value="adventure">冒险游戏</option>
              <option value="rpg">角色扮演</option>
              <option value="strategy">策略游戏</option>
              <option value="simulation">模拟经营</option>
              <option value="puzzle">解谜游戏</option>
              <option value="horror">恐怖游戏</option>
              <option value="openworld">开放世界</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="themeTags" className="block text-sm font-medium mb-1">
              主题标签（可选）
            </label>
            <input
              type="text"
              id="themeTags"
              className="w-full p-2 rounded-md border border-input bg-background"
              placeholder="例如：科幻, 中世纪, 后启示录, 赛博朋克..."
            />
            <p className="mt-1 text-xs text-muted-foreground">
              使用逗号分隔多个标签
            </p>
          </div>
          
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-1">
              提示词（可选）
            </label>
            <textarea
              id="prompt"
              rows={3}
              className="w-full p-2 rounded-md border border-input bg-background"
              placeholder="输入任何特定的要求或元素，让AI根据您的需求生成更精确的创意..."
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="includeConcepts"
              type="checkbox"
              className="rounded border-gray-300"
            />
            <label htmlFor="includeConcepts" className="ml-2 block text-sm">
              包含概念图和参考素材
            </label>
          </div>
          
          <div className="pt-3 flex justify-end">
            <Button type="submit">
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
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
              生成创意
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// 侧边过滤器组件
function IdeasFilter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">筛选器</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">创意类型</h3>
            <div className="space-y-2">
              {['所有类型', '故事情节', '角色设定', '任务设计', '游戏机制', '世界观构建'].map((type) => (
                <div key={`filter-type-${type}`} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`type-${type}`}
                    className="rounded border-gray-300"
                    defaultChecked={type === '所有类型'}
                  />
                  <label htmlFor={`type-${type}`} className="ml-2 text-sm">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">游戏类型</h3>
            <div className="space-y-2">
              {['所有类型', '动作游戏', '冒险游戏', '角色扮演', '策略游戏', '模拟经营', '解谜游戏'].map((genre) => (
                <div key={`filter-genre-${genre}`} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`genre-${genre}`}
                    className="rounded border-gray-300"
                    defaultChecked={genre === '所有类型'}
                  />
                  <label htmlFor={`genre-${genre}`} className="ml-2 text-sm">
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">排序方式</h3>
            <select className="w-full p-2 rounded-md border border-input bg-background text-sm">
              <option>最新创建</option>
              <option>最早创建</option>
              <option>按标题</option>
            </select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">其他选项</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saved-only"
                  className="rounded border-gray-300"
                />
                <label htmlFor="saved-only" className="ml-2 text-sm">
                  只显示已收藏
                </label>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-2">
            重置筛选器
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function IdeaGeneratorPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">创意生成器</h1>
          <p className="text-muted-foreground">
            使用AI生成游戏创意，激发您的游戏开发灵感
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="搜索创意..."
              className="w-full py-2 pl-9 pr-4 rounded-md border border-input bg-background"
            />
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
            新建创意
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <IdeaGenerationForm />
            <IdeasFilter />
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
          
          {/* 统计和分页 */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
              显示 5 个创意中的 1-5 个
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>
              <Button variant="outline" size="sm" disabled>
                下一页
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>创意生成提示</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/40">
                <h3 className="font-medium mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 mr-2 text-primary"
                    aria-hidden="true"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  使用具体细节
                </h3>
                <p className="text-sm text-muted-foreground">
                  在提示词中加入具体的游戏元素、情感色彩或世界观特征，让AI生成更符合您期望的创意。
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/40">
                <h3 className="font-medium mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 mr-2 text-primary"
                    aria-hidden="true"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                  组合不同元素
                </h3>
                <p className="text-sm text-muted-foreground">
                  尝试将看似不相关的游戏类型或主题组合在一起，可能会产生创新的游戏概念和独特的玩法。
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/40">
                <h3 className="font-medium mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 mr-2 text-primary"
                    aria-hidden="true"
                  >
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                    <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                  </svg>
                  迭代和调整
                </h3>
                <p className="text-sm text-muted-foreground">
                  不要满足于第一次生成的结果，可以保存有潜力的创意，然后通过编辑和重新生成来完善和拓展它们。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 