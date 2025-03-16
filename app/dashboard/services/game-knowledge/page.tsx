'use client';

import { GameKnowledge } from '@/components/game-knowledge/GameKnowledge';

export default function GameKnowledgePage() {
  return (
    <div className="flex flex-col w-full h-full min-h-[calc(100vh-4rem)]">
      <div className="p-6 pb-4">
        <h1 className="text-3xl font-bold mb-2">游戏知识库</h1>
        <p className="text-gray-500">管理和组织游戏相关知识，创建分类和条目</p>
      </div>
      
      <div className="flex-1 px-6 pb-6">
        <GameKnowledge />
      </div>
    </div>
  );
} 