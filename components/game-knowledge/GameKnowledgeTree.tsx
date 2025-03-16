'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { KnowledgeTreeProps, TreeNode, KnowledgeCategory } from './types';
import { ChevronRight, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 根据节点类型获取图标
const getNodeIcon = (node: TreeNode): ReactNode => {
  // 可以根据节点类型或其他属性返回不同图标
  switch (node.type) {
    case 'game':
      return <span className="text-blue-500 mr-1">🎮</span>;
    case 'category': {
      const categoryData = node.data as KnowledgeCategory;
      if (categoryData?.icon === 'Treasure') return <span className="text-yellow-500 mr-1">🧰</span>;
      if (categoryData?.icon === 'Swords') return <span className="text-red-500 mr-1">⚔️</span>;
      if (categoryData?.icon === 'Shield') return <span className="text-purple-500 mr-1">🛡️</span>;
      if (categoryData?.icon === 'Map') return <span className="text-green-500 mr-1">🗺️</span>;
      if (categoryData?.icon === 'Users') return <span className="text-orange-500 mr-1">👥</span>;
      if (categoryData?.icon === 'Building') return <span className="text-indigo-500 mr-1">🏛️</span>;
      return <span className="text-gray-500 mr-1">📁</span>;
    }
    case 'item':
      return <span className="text-green-500 mr-1">📄</span>;
    default:
      return <span className="text-gray-500 mr-1">📄</span>;
  }
};

export function GameKnowledgeTree({
  nodes,
  selectedNode,
  onSelectNode,
  onAddNode,
  onDeleteNode,
  readOnly = false
}: KnowledgeTreeProps) {
  // 追踪展开的节点
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(new Set());
  
  // 切换节点展开/折叠状态
  const toggleNodeExpand = (nodeId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedNodeIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };
  
  // 键盘触发节点展开/折叠
  const handleKeyboardToggle = (nodeId: string, event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setExpandedNodeIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(nodeId)) {
          newSet.delete(nodeId);
        } else {
          newSet.add(nodeId);
        }
        return newSet;
      });
    }
  };
  
  // 添加新节点
  const handleAddNode = (parentId: string, type: 'game' | 'category' | 'item', event: React.MouseEvent) => {
    event.stopPropagation();
    if (onAddNode) {
      onAddNode(parentId, type);
    }
  };
  
  // 删除节点
  const handleDeleteNode = (nodeId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onDeleteNode) {
      onDeleteNode(nodeId);
    }
  };
  
  // 键盘触发选择节点
  const handleKeyboardSelect = (node: TreeNode, event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectNode(node);
    }
  };
  
  // 渲染单个树节点
  const renderTreeNode = (node: TreeNode, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodeIds.has(node.id);
    const isSelected = selectedNode?.id === node.id;
    
    return (
      <div key={node.id} className="select-none">
        <div className="flex items-center" style={{ paddingLeft: `${depth * 12}px` }}>
          {/* 展开/折叠图标 - 现在是单独的元素 */}
          {hasChildren ? (
            <button 
              type="button"
              className="mr-1 w-4 h-4 flex items-center justify-center bg-transparent border-0 p-0 focus:outline-none z-10"
              onClick={(e) => toggleNodeExpand(node.id, e)}
              onKeyDown={(e) => handleKeyboardToggle(node.id, e)}
            >
              {isExpanded ? 
                <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                <ChevronRight className="h-4 w-4 text-gray-500" />
              }
            </button>
          ) : (
            <span className="mr-1 w-4 h-4" />
          )}
          
          {/* 节点按钮 - 不再包含展开/折叠按钮 */}
          <button 
            type="button"
            className={cn(
              "flex-1 text-left flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800",
              isSelected && "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
            )}
            onClick={() => onSelectNode(node)}
            onKeyDown={(e) => handleKeyboardSelect(node, e)}
          >
            {/* 节点图标 */}
            {getNodeIcon(node)}
            
            {/* 节点名称 */}
            <span className="text-sm flex-1 truncate">{node.name}</span>
            
            {/* 操作按钮 */}
            {!readOnly && (
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* 添加按钮 - 只对游戏和分类节点显示 */}
                {(node.type === 'game' || node.type === 'category') && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 p-1 text-gray-500 hover:text-blue-500 hover:bg-blue-100"
                    onClick={(e) => handleAddNode(
                      node.id, 
                      node.type === 'game' ? 'category' : 'item',
                      e
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
                
                {/* 删除按钮 */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 p-1 text-gray-500 hover:text-red-500 hover:bg-red-100"
                  onClick={(e) => handleDeleteNode(node.id, e)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </button>
        </div>
        
        {/* 子节点 */}
        {isExpanded && hasChildren && (
          <div>
            {node.children?.map(childNode => renderTreeNode(childNode, depth + 1))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="h-full overflow-auto py-2">
      {/* 添加游戏按钮 */}
      {!readOnly && (
        <div className="mb-4 px-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-sm"
            onClick={(e) => handleAddNode('root', 'game', e)}
          >
            <Plus className="h-4 w-4 mr-2" />
            添加游戏
          </Button>
        </div>
      )}
      
      {/* 树节点列表 */}
      <div className="space-y-1">
        {nodes.map(node => renderTreeNode(node))}
      </div>
      
      {/* 空状态 */}
      {nodes.length === 0 && (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <p className="text-sm mb-2">暂无游戏知识库</p>
          {!readOnly && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => handleAddNode('root', 'game', e)}
            >
              <Plus className="h-4 w-4 mr-2" />
              创建新游戏知识库
            </Button>
          )}
        </div>
      )}
    </div>
  );
} 