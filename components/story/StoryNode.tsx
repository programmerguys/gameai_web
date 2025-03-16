'use client';

import type React from 'react';
import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import Image from 'next/image';
import type { StoryNodeData, NodeType } from './types';

// 定义每种节点类型的样式属性
const nodeTypeStyles: Record<
	NodeType,
	{
		borderColor: string;
		bgColor: string;
		icon: string;
		iconAlt: string;
	}
> = {
	start: {
		borderColor: "border-emerald-500",
		bgColor: "bg-emerald-50",
		icon: "/images/story/start.svg",
		iconAlt: "故事起点图标",
	},
	choice: {
		borderColor: "border-indigo-500",
		bgColor: "bg-indigo-50",
		icon: "/images/story/choice.svg",
		iconAlt: "分支选择图标",
	},
	event: {
		borderColor: "border-amber-500",
		bgColor: "bg-amber-50",
		icon: "/images/story/event.svg",
		iconAlt: "故事事件图标",
	},
	end: {
		borderColor: "border-rose-500",
		bgColor: "bg-rose-50",
		icon: "/images/story/end.svg",
		iconAlt: "故事结局图标",
	},
};

// 默认节点样式
const defaultNodeStyle = {
  borderColor: 'border-slate-400',
  bgColor: 'bg-slate-50',
  icon: '/images/story/event.svg',
  iconAlt: '故事节点图标'
};

// 截断长文本
const truncateText = (text: string, length: number) => {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

// 故事节点组件
const StoryNode = ({ data, selected }: NodeProps<StoryNodeData>) => {
  // 获取节点类型对应的样式
  const nodeStyle = data.nodeType 
    ? nodeTypeStyles[data.nodeType] || defaultNodeStyle
    : defaultNodeStyle;
  
  // 节点元数据标签组件
  const NodeMetaBadge = ({ label, value }: { label: string; value: string }) => {
    if (!value) return null;
    return (
      <div className="text-xs text-slate-600 bg-white/80 px-1.5 py-0.5 rounded shadow-sm border flex items-center gap-1">
        <span className="font-semibold">{label}:</span>
        <span>{truncateText(value, 15)}</span>
      </div>
    );
  };

  // 标签列表组件
  const TagList = ({ items, label }: { items: string[], label: string }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-1">
        {items.map((item, i) => (
          <span 
            key={`${label}-${i}-${item.substring(0, 3)}`}
            className="text-xs py-0.5 px-1.5 bg-white/80 rounded-md border shadow-sm"
            title={`${label}: ${item}`}
          >
            {truncateText(item, 10)}
          </span>
        ))}
      </div>
    );
  };

  // 处理键盘事件（供辅助功能使用）
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 空格键或回车键触发选择
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      // 节点选择通过ReactFlow的onNodeClick处理
    }
  };

  return (
    <>
      {/* 输入连接点 */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 border-2 bg-white"
      />
      
      {/* 节点内容 */}
      <button 
        type="button"
        className={`px-2 pt-2 pb-3 rounded-lg border-2 ${nodeStyle.borderColor} ${nodeStyle.bgColor} shadow-md min-w-[180px] max-w-[220px] ${
          selected ? 'ring-2 ring-blue-400' : ''
        } text-left w-full`}
        onKeyDown={handleKeyDown}
        aria-label={`${data.nodeType || '故事'} 节点: ${data.title}`}
      >
        {/* 节点标题和图标 */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 relative shrink-0">
            <Image
              src={data.image || nodeStyle.icon}
              alt={`${data.title || nodeStyle.iconAlt}`}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="font-medium text-sm leading-tight">
            {truncateText(data.title, 25)}
          </h3>
        </div>
        
        {/* 节点描述 */}
        <div className="text-xs text-slate-600 mb-2 bg-white/60 p-1.5 rounded-md border">
          {truncateText(data.description, 100)}
        </div>
        
        {/* 节点元数据 */}
        <div className="space-y-1.5">
          {/* 位置信息 */}
          {data.location && (
            <NodeMetaBadge label="位置" value={data.location} />
          )}
          
          {/* 角色列表 */}
          <TagList items={data.characters || []} label="角色" />
          
          {/* 物品列表 */}
          <TagList items={data.items || []} label="物品" />
        </div>
      </button>
      
      {/* 输出连接点 */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 border-2 bg-white"
      />
    </>
  );
};

// 使用memo优化渲染性能
export default memo(StoryNode); 