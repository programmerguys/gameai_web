'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Trash2 } from 'lucide-react';
import type { StoryData, StoryNodeData, NodeType } from './types';

interface StoryEditorProps {
  story: StoryData;
  selectedNode: StoryNodeData | null;
  onStoryChange: (updatedStory: Partial<StoryData>) => void;
  onNodeChange: (updatedNode: Partial<StoryNodeData>) => void;
  onDeleteNode?: () => void;
  readOnly?: boolean;
}

export function StoryEditor({
  story,
  selectedNode,
  onStoryChange,
  onNodeChange,
  onDeleteNode,
  readOnly = false
}: StoryEditorProps) {
  const [activeTab, setActiveTab] = useState<string>(selectedNode ? 'node' : 'story');
  const [newTag, setNewTag] = useState<string>('');
  
  // 当选择节点变化时，切换到节点编辑选项卡
  React.useEffect(() => {
    if (selectedNode) {
      setActiveTab('node');
    }
  }, [selectedNode]);

  // 处理添加标签
  const handleAddTag = (field: 'npcs' | 'goals' | 'characters' | 'items') => {
    if (!newTag.trim()) return;
    
    if (field === 'npcs' || field === 'goals') {
      onStoryChange({ 
        [field]: [...(story[field] || []), newTag.trim()] 
      });
    } else if (selectedNode && (field === 'characters' || field === 'items')) {
      onNodeChange({
        [field]: [...(selectedNode[field] || []), newTag.trim()]
      });
    }
    
    setNewTag('');
  };

  // 处理移除标签
  const handleRemoveTag = (field: 'npcs' | 'goals' | 'characters' | 'items', index: number) => {
    if (field === 'npcs' || field === 'goals') {
      const newTags = [...story[field]];
      newTags.splice(index, 1);
      onStoryChange({ [field]: newTags });
    } else if (selectedNode && (field === 'characters' || field === 'items')) {
      const newTags = [...(selectedNode[field] || [])];
      newTags.splice(index, 1);
      onNodeChange({
        [field]: newTags
      });
    }
  };

  // 键盘事件处理
  const handleKeyDown = (e: React.KeyboardEvent, field: 'npcs' | 'goals' | 'characters' | 'items') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(field);
    }
  };

  // 节点类型定义
  const nodeTypes = [
    { value: 'start' as NodeType, label: '起点', color: 'bg-emerald-500' },
    { value: 'event' as NodeType, label: '事件', color: 'bg-amber-500' },
    { value: 'choice' as NodeType, label: '选择', color: 'bg-indigo-500' },
    { value: 'end' as NodeType, label: '结局', color: 'bg-rose-500' }
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="story">故事信息</TabsTrigger>
        <TabsTrigger value="node" disabled={!selectedNode}>
          节点编辑
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="story">
        <Card>
          <CardHeader>
            <CardTitle>故事基本信息</CardTitle>
            <CardDescription>
              设置故事的标题、描述和相关信息
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">故事标题</Label>
              <Input
                id="title"
                value={story.title}
                onChange={(e) => onStoryChange({ title: e.target.value })}
                disabled={readOnly}
                placeholder="输入故事标题..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">故事描述</Label>
              <Textarea
                id="description"
                value={story.description}
                onChange={(e) => onStoryChange({ description: e.target.value })}
                disabled={readOnly}
                placeholder="描述这个故事的背景和主题..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="npcs">相关NPC</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {story.npcs.map((npc, i) => (
                  <Badge key={`npc-${i}-${npc.substring(0, 3)}`} variant="secondary" className="h-6 gap-1">
                    {npc}
                    {!readOnly && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => handleRemoveTag('npcs', i)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </Badge>
                ))}
              </div>
              {!readOnly && (
                <div className="flex gap-2">
                  <Input
                    id="npcs"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="添加NPC角色..."
                    onKeyDown={(e) => handleKeyDown(e, 'npcs')}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleAddTag('npcs')}
                    disabled={!newTag.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goals">故事目标</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {story.goals.map((goal, i) => (
                  <Badge key={`goal-${i}-${goal.substring(0, 3)}`} variant="outline" className="h-6 gap-1">
                    {goal}
                    {!readOnly && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => handleRemoveTag('goals', i)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </Badge>
                ))}
              </div>
              {!readOnly && (
                <div className="flex gap-2">
                  <Input
                    id="goals"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="添加故事目标..."
                    onKeyDown={(e) => handleKeyDown(e, 'goals')}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleAddTag('goals')}
                    disabled={!newTag.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="createdAt">创建时间</Label>
              <Input
                id="createdAt"
                value={new Date(story.createdAt).toLocaleString()}
                disabled
                className="text-muted-foreground"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="node">
        {selectedNode ? (
          <Card>
            <CardHeader className="flex-row justify-between items-start">
              <div>
                <CardTitle>节点编辑</CardTitle>
                <CardDescription>
                  编辑所选节点的详细信息
                </CardDescription>
              </div>
              {!readOnly && onDeleteNode && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={onDeleteNode}
                  className="mt-1"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  删除节点
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nodeTitle">节点标题</Label>
                <Input
                  id="nodeTitle"
                  value={selectedNode.title}
                  onChange={(e) => onNodeChange({ title: e.target.value })}
                  disabled={readOnly}
                  placeholder="输入节点标题..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nodeType">节点类型</Label>
                <div className="flex gap-2">
                  {nodeTypes.map((type) => (
                    <Button
                      key={type.value}
                      type="button"
                      variant={selectedNode.nodeType === type.value ? "default" : "outline"}
                      className={`flex-1 ${selectedNode.nodeType === type.value ? "text-white" : ""}`}
                      onClick={() => !readOnly && onNodeChange({ nodeType: type.value })}
                      disabled={readOnly}
                    >
                      <span className={`w-3 h-3 rounded-full mr-1.5 ${type.color}`} />
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nodeDescription">节点描述</Label>
                <Textarea
                  id="nodeDescription"
                  value={selectedNode.description}
                  onChange={(e) => onNodeChange({ description: e.target.value })}
                  disabled={readOnly}
                  placeholder="描述这个节点的事件或选择内容..."
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nodeLocation">位置</Label>
                <Input
                  id="nodeLocation"
                  value={selectedNode.location || ''}
                  onChange={(e) => onNodeChange({ location: e.target.value })}
                  disabled={readOnly}
                  placeholder="节点发生的位置..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nodeCharacters">角色</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(selectedNode.characters || []).map((character, i) => (
                    <Badge key={`char-${i}-${character.substring(0, 3)}`} variant="secondary" className="h-6 gap-1">
                      {character}
                      {!readOnly && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleRemoveTag('characters', i)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </Badge>
                  ))}
                </div>
                {!readOnly && (
                  <div className="flex gap-2">
                    <Input
                      id="nodeCharacters"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="添加角色..."
                      onKeyDown={(e) => handleKeyDown(e, 'characters')}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleAddTag('characters')}
                      disabled={!newTag.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nodeItems">物品</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(selectedNode.items || []).map((item, i) => (
                    <Badge key={`item-${i}-${item.substring(0, 3)}`} variant="outline" className="h-6 gap-1">
                      {item}
                      {!readOnly && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleRemoveTag('items', i)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </Badge>
                  ))}
                </div>
                {!readOnly && (
                  <div className="flex gap-2">
                    <Input
                      id="nodeItems"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="添加物品..."
                      onKeyDown={(e) => handleKeyDown(e, 'items')}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleAddTag('items')}
                      disabled={!newTag.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            请在流程图中选择一个节点进行编辑
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

export default StoryEditor; 