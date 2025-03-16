"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import Link from 'next/link';

// 模型类型定义
interface ModelItem {
	id: string;
	name: string;
	type: "3d_model" | "texture";
	thumbnailUrl: string;
	createdAt: string;
	status: "completed" | "processing" | "failed";
	prompt: string;
}

// 示例模型数据
const models: ModelItem[] = [
	{
		id: "1",
		name: "幻想风格树木",
		type: "3d_model",
		thumbnailUrl: "/placeholders/tree.jpg",
		createdAt: "2024-03-15T14:30:00Z",
		status: "completed",
		prompt:
			"一棵幻想风格的树，树干呈螺旋状，枝叶有微微发光的效果，低多边形风格",
	},
	{
		id: "2",
		name: "赛博朋克角色",
		type: "3d_model",
		thumbnailUrl: "/placeholders/cyberpunk.jpg",
		createdAt: "2024-03-14T10:15:00Z",
		status: "completed",
		prompt: "赛博朋克风格的女性角色，短发，身穿未来风格的装甲，带有霓虹灯效果",
	},
	{
		id: "3",
		name: "科幻武器",
		type: "3d_model",
		thumbnailUrl: "/placeholders/weapon.jpg",
		createdAt: "2024-03-13T16:45:00Z",
		status: "completed",
		prompt: "未来风格的科幻能量枪，带有发光元素和漂浮组件",
	},
	{
		id: "4",
		name: "金属纹理",
		type: "texture",
		thumbnailUrl: "/placeholders/metal.jpg",
		createdAt: "2024-03-10T09:20:00Z",
		status: "completed",
		prompt: "生锈的金属纹理，带有一些划痕和磨损效果",
	},
	{
		id: "5",
		name: "新建模型",
		type: "3d_model",
		thumbnailUrl: "",
		createdAt: "2024-03-16T08:45:00Z",
		status: "processing",
		prompt: "一个中世纪风格的石塔，有藤蔓攀爬，顶部有一个小型灯塔",
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

// 状态标签组件
function StatusBadge({ status }: { status: ModelItem['status'] }) {
  const statusConfig = {
    completed: {
      label: '已完成',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    processing: {
      label: '处理中',
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    },
    failed: {
      label: '失败',
      className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    },
  };
  
  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}

// 示例3D模型
function SimpleBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

// 提示词组件
const PromptsSuggestions = () => {
  const suggestions = [
    "一个低多边形风格的幻想树木",
    "赛博朋克城市场景",
    "科幻风格的飞行器",
    "中世纪城堡",
    "未来主义武器"
  ];
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((suggestion) => (
        <Button 
          key={`suggestion-${suggestion}`} 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={() => {}}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};

// 历史记录项
function HistoryItem({ model, selected, onClick }: { model: ModelItem; selected: boolean; onClick: () => void }) {
  return (
    <button 
      type="button"
      className={`p-3 border-b cursor-pointer hover:bg-muted/50 ${selected ? 'bg-muted' : ''} w-full text-left`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-medium truncate">{model.name}</h3>
        <StatusBadge status={model.status} />
      </div>
      <p className="text-xs text-muted-foreground truncate">
        {model.prompt.substring(0, 60)}...
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        {formatDate(model.createdAt)}
      </p>
    </button>
  );
}

// 属性编辑面板
function PropertiesPanel() {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="material" className="block text-sm font-medium mb-2">材质</label>
        <Select defaultValue="plastic">
          <SelectTrigger id="material">
            <SelectValue placeholder="选择材质" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="plastic">塑料</SelectItem>
            <SelectItem value="metal">金属</SelectItem>
            <SelectItem value="glass">玻璃</SelectItem>
            <SelectItem value="wood">木材</SelectItem>
            <SelectItem value="stone">石材</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label htmlFor="glossiness" className="block text-sm font-medium mb-2">光泽度</label>
        <Slider id="glossiness" defaultValue={[50]} max={100} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>哑光</span>
          <span>高光</span>
        </div>
      </div>
      
      <div>
        <label htmlFor="roughness" className="block text-sm font-medium mb-2">粗糙度</label>
        <Slider id="roughness" defaultValue={[30]} max={100} step={1} />
      </div>
      
      <div>
        <label htmlFor="metalness" className="block text-sm font-medium mb-2">金属度</label>
        <Slider id="metalness" defaultValue={[0]} max={100} step={1} />
      </div>
      
      <div>
        <label htmlFor="color-picker" className="block text-sm font-medium mb-2">颜色</label>
        <div className="grid grid-cols-5 gap-2" id="color-picker">
          {['#FF5555', '#55FF55', '#5555FF', '#FFFF55', '#FF55FF'].map((color) => (
            <button 
              type="button"
              key={color} 
              className="w-full aspect-square rounded-md cursor-pointer border hover:opacity-80"
              style={{ backgroundColor: color }}
              onClick={() => {}}
              aria-label={`选择颜色 ${color}`}
            />
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="environment" className="block text-sm font-medium mb-2">环境光</label>
        <Select defaultValue="studio">
          <SelectTrigger id="environment">
            <SelectValue placeholder="选择环境光" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="studio">工作室</SelectItem>
            <SelectItem value="outdoor">户外</SelectItem>
            <SelectItem value="night">夜晚</SelectItem>
            <SelectItem value="sunset">黄昏</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Button className="w-full">应用更改</Button>
      </div>
    </div>
  );
}

export default function ModelGeneratorPage() {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  
  useEffect(() => {
    // 初始选择第一个模型
    if (models.length > 0 && !selectedModelId) {
      setSelectedModelId(models[0].id);
    }
  }, [selectedModelId]);
  
  const handlePromptSubmit = () => {
    console.log("生成模型:", prompt);
    // 这里添加生成模型的逻辑
  };
  
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">3D模型生成</h1>
          <p className="text-muted-foreground">
            使用AI快速生成游戏资产和角色的3D模型
          </p>
        </div>
        <Link href="/dashboard/model-marketplace">
          <Button className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            模型市场
          </Button>
        </Link>
      </div>
      
      <div className="flex-1 grid grid-cols-12 grid-rows-[3fr_1fr] gap-4">
        {/* 左侧历史记录 - 现在跨越两行 */}
        <div className="col-span-2 row-span-2 overflow-y-auto border rounded-lg">
          <div className="p-3 border-b bg-muted/50 sticky top-0">
            <h2 className="font-semibold">历史记录</h2>
          </div>
          <div className="divide-y">
            {models.map((model) => (
              <HistoryItem 
                key={model.id} 
                model={model} 
                selected={model.id === selectedModelId}
                onClick={() => setSelectedModelId(model.id)}
              />
            ))}
          </div>
        </div>
        
        {/* 中央3D视图 */}
        <div className="col-span-7 row-span-1 border rounded-lg overflow-hidden flex flex-col">
          <div className="p-3 border-b bg-muted/50">
            <h2 className="font-semibold">3D预览</h2>
          </div>
          <div className="flex-1 relative">
            <Canvas style={{ background: '#f5f5f5' }}>
              <PerspectiveCamera makeDefault position={[3, 3, 3]} fov={50} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <SimpleBox />
              <gridHelper args={[10, 10, "#888888", "#dddddd"]} />
              <OrbitControls 
                minPolarAngle={Math.PI/6} 
                maxPolarAngle={Math.PI/2} 
                enableZoom={true}
                enablePan={true}
              />
              <Environment preset="sunset" />
            </Canvas>
          </div>
        </div>
        
        {/* 右侧属性面板 - 现在跨越两行 */}
        <div className="col-span-3 row-span-2 overflow-y-auto border rounded-lg">
          <div className="p-3 border-b bg-muted/50 sticky top-0">
            <h2 className="font-semibold">材质与属性</h2>
          </div>
          <div className="p-4">
            <PropertiesPanel />
          </div>
        </div>
        
        {/* 底部提示输入 - 现在在3D视图下方，宽度一致 */}
        <div className="col-span-7 row-span-1 border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Textarea 
              placeholder="用一句话描述您想要生成的3D模型，例如：'一个低多边形风格的幻想树木，树干呈螺旋状，带有发光效果'" 
              className="flex-1"
              value={prompt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
              rows={2}
            />
            <Button className="h-full" onClick={handlePromptSubmit}>
              生成模型
            </Button>
          </div>
          
          <PromptsSuggestions />
          
          <div className="mt-3 text-sm text-muted-foreground">
            <p>提示：描述越详细，生成的模型越符合预期。可以指定风格、材质、颜色、形状等特征。</p>
          </div>
        </div>
      </div>
    </div>
  );
} 