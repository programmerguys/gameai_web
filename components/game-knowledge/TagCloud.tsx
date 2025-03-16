'use client';

import { useMemo } from 'react';
import { Tag as TagIcon } from 'lucide-react';
import type { TagCloudProps, TreeNode, KnowledgeItem } from './types';

// 标签大小计算方法
const calculateTagSize = (count: number, maxCount: number, minCount: number): number => {
  if (maxCount === minCount) return 1;
  const normalizedCount = (count - minCount) / (maxCount - minCount);
  // 返回0.75到1.5之间的值
  return 0.75 + normalizedCount * 0.75;
};

export function TagCloud({ nodes, selectedTags, onTagClick }: TagCloudProps) {
  // 获取所有标签及其出现次数
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    const processNode = (node: TreeNode) => {
      if (node.type === 'item' && node.data) {
        const itemData = node.data as KnowledgeItem;
        for (const tag of itemData.tags) {
          counts[tag] = (counts[tag] || 0) + 1;
        }
      }
      
      if (node.children) {
        for (const child of node.children) {
          processNode(child);
        }
      }
    };
    
    for (const node of nodes) {
      processNode(node);
    }
    
    return counts;
  }, [nodes]);
  
  // 获取排序后的标签列表
  const sortedTags = useMemo(() => {
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  }, [tagCounts]);
  
  // 获取标签计数的最大值和最小值
  const { maxCount, minCount } = useMemo(() => {
    if (sortedTags.length === 0) {
      return { maxCount: 0, minCount: 0 };
    }
    
    const max = sortedTags[0].count;
    const min = sortedTags[sortedTags.length - 1].count;
    
    return { maxCount: max, minCount: min };
  }, [sortedTags]);
  
  // 如果没有标签，显示提示信息
  if (sortedTags.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <TagIcon className="h-10 w-10 mx-auto mb-2 opacity-30" />
        <p className="text-sm">暂无标签</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      {sortedTags.map(({ tag, count }) => {
        const isSelected = selectedTags.includes(tag);
        const size = calculateTagSize(count, maxCount, minCount);
        
        return (
									<button
										type="button"
										key={tag}
										onClick={() => onTagClick(tag)}
										className={`
              px-2 py-0.5 rounded-full text-sm transition-all
              ${
								isSelected
									? "bg-primary text-primary-foreground"
									: "bg-gray-100 hover:bg-gray-200 text-gray-700"
							}
            `}
										style={{
											fontSize: `${size}rem`,
											fontWeight: isSelected ? 500 : 400,
										}}
									>
										{tag}
										<span className="ml-1 text-xs opacity-70">{count}</span>
									</button>
								);
      })}
    </div>
  );
} 