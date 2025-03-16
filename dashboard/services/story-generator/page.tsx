'use client';

import StoryGenerator from '@/components/story/StoryGenerator';

export default function StoryGeneratorPage() {
  return (
    <div className="w-full h-[calc(100vh-6rem)] flex flex-col">
      <div className="px-6 py-4 border-b">
        <h1 className="text-2xl font-bold tracking-tight">故事情节生成器</h1>
        <p className="text-sm text-muted-foreground">
          创建和管理游戏故事情节，设计分支选择和事件流程。
        </p>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <StoryGenerator />
      </div>
    </div>
  );
} 