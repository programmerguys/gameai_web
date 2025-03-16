'use client';

import { useState } from 'react';
import { NPCCard } from './NPCCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { NPC, NPCStatus } from '@/lib/npc';

interface NPCListProps {
  npcs: NPC[];
  emptyMessage?: string;
  viewMode?: 'grid' | 'list';
}

export function NPCList({ 
  npcs, 
  emptyMessage = "暂无NPC角色",
  viewMode = 'grid'
}: NPCListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(npcs.length / itemsPerPage);
  
  // 分页显示数据
  const paginatedNPCs = npcs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  if (npcs.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/40 rounded-lg border border-dashed border-muted-foreground/25">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">{emptyMessage}</h3>
        <p className="text-sm text-muted-foreground/70">
          创建一个新的AI NPC角色来开始你的游戏对话体验
        </p>
      </div>
    );
  }

  return (
    <>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedNPCs.map((npc) => (
            <NPCCard key={npc.id} npc={npc} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedNPCs.map((npc) => (
            <NPCListItem key={npc.id} npc={npc} />
          ))}
        </div>
      )}
      
      {/* 分页控制 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              // 只显示当前页附近的页码和首尾页
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              }
              
              // 显示省略号
              if (
                (page === currentPage - 2 && currentPage > 3) ||
                (page === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return <span key={page}>...</span>;
              }
              
              return null;
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}

// 列表视图下的NPC项
function NPCListItem({ npc }: { npc: NPC }) {
  return (
    <div className="flex items-center justify-between border rounded-md p-4 bg-card hover:bg-muted/20 transition-colors">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary p-2 rounded-full">
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
        
        <div>
          <h3 className="font-medium">{npc.name}</h3>
          <p className="text-sm text-muted-foreground">{npc.description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-xs text-muted-foreground hidden md:block">
          更新于: {new Date(npc.updatedAt).toLocaleDateString('zh-CN')}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={`/dashboard/services/ai-npc/${npc.id}`}>查看</a>
          </Button>
          
          <Button size="sm" asChild>
            <a href={`/dashboard/services/ai-npc/${npc.id}/edit`}>编辑</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface NPCFilterProps {
  selectedStatus: NPCStatus | 'all';
  selectedTags: string[];
  availableTags: string[];
  onStatusChange: (status: NPCStatus | 'all') => void;
  onTagChange: (tag: string) => void;
}

export function NPCFilter({
  selectedStatus,
  selectedTags,
  availableTags,
  onStatusChange,
  onTagChange
}: NPCFilterProps) {
  return (
    <div className="bg-muted/30 rounded-lg p-4 mb-6">
      <h3 className="font-medium mb-3">筛选</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">状态</h4>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              isActive={selectedStatus === 'all'} 
              onClick={() => onStatusChange('all')}
            >
              全部
            </FilterButton>
            <FilterButton 
              isActive={selectedStatus === 'active'} 
              onClick={() => onStatusChange('active')}
            >
              已激活
            </FilterButton>
            <FilterButton 
              isActive={selectedStatus === 'inactive'} 
              onClick={() => onStatusChange('inactive')}
            >
              未激活
            </FilterButton>
            <FilterButton 
              isActive={selectedStatus === 'draft'} 
              onClick={() => onStatusChange('draft')}
            >
              草稿
            </FilterButton>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">标签</h4>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <FilterButton 
                key={tag}
                isActive={selectedTags.includes(tag)} 
                onClick={() => onTagChange(tag)}
              >
                {tag}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FilterButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function FilterButton({ children, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
        isActive 
          ? 'bg-primary text-primary-foreground border-primary' 
          : 'bg-background border-muted-foreground/20 hover:border-muted-foreground/40'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
} 