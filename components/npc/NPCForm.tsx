'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

import type { NPC, NPCStatus } from '@/lib/npc';
import { ActionConfig } from './ActionConfig';
import { VariableConfig } from './VariableConfig';
import { PromptEditor } from './PromptEditor';
import { CodeExample } from './CodeExample';

interface NPCFormProps {
  npc?: NPC;
  onSubmit: (npc: NPC) => void;
  isSubmitting?: boolean;
}

export function NPCForm({ npc, onSubmit, isSubmitting = false }: NPCFormProps) {
  const isEditing = !!npc;
  
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<NPC>({
    id: npc?.id || '',
    name: npc?.name || '',
    description: npc?.description || '',
    systemPrompt: npc?.systemPrompt || '你是一位友好的NPC，负责帮助玩家解答问题。\n\n## 角色设定\n- 你是游戏中的NPC，名字是{name}\n- 你总是保持友好和乐于助人的态度\n- 你只回答与游戏相关的问题\n\n## 知识范围\n- 游戏世界的基础知识\n- 游戏规则和玩法指南\n- 常见任务和挑战的提示\n\n## 沟通风格\n- 简洁明了，避免过长的回答\n- 使用友好但不过于随意的语气\n- 保持角色一致性\n\n## 限制\n- 不讨论游戏外的话题\n- 不提供作弊或破坏游戏平衡的建议\n- 不承认自己是AI或语言模型',
    variables: npc?.variables || [],
    actions: npc?.actions || [],
    tags: npc?.tags || [],
    status: npc?.status || 'draft',
    modelId: npc?.modelId || 'gpt-4',
    createdAt: npc?.createdAt || new Date().toISOString(),
    updatedAt: npc?.updatedAt || new Date().toISOString(),
  });
  
  const [newTag, setNewTag] = useState('');
  
  // 更新基本信息
  const updateField = <T extends keyof NPC>(field: T, value: NPC[T]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString()
    }));
  };
  
  // 添加标签
  const addTag = () => {
    if (!newTag.trim() || formData.tags.includes(newTag.trim())) {
      return;
    }
    
    updateField('tags', [...formData.tags, newTag.trim()]);
    setNewTag('');
  };
  
  // 删除标签
  const removeTag = (tag: string) => {
    updateField('tags', formData.tags.filter(t => t !== tag));
  };
  
  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  // 键盘事件处理
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.currentTarget.id === 'new-tag') {
      e.preventDefault();
      addTag();
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="prompt">系统提示词</TabsTrigger>
          <TabsTrigger value="variables">上下文变量</TabsTrigger>
          <TabsTrigger value="actions">动作配置</TabsTrigger>
          <TabsTrigger value="sdk">SDK集成</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? '编辑' : '创建'}AI NPC</CardTitle>
              <CardDescription>
                设置NPC的基本信息和元数据
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* 名称 */}
              <div className="space-y-2">
                <Label htmlFor="name">名称</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="输入NPC名称"
                  required
                />
              </div>
              
              {/* 描述 */}
              <div className="space-y-2">
                <Label htmlFor="description">描述</Label>
                <Textarea 
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="简要描述这个NPC的角色和用途"
                  rows={4}
                  required
                />
              </div>
              
              {/* 状态和模型选择 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="status">状态</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => updateField('status', value as NPCStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">草稿</SelectItem>
                      <SelectItem value="active">激活</SelectItem>
                      <SelectItem value="inactive">未激活</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model">语言模型</Label>
                  <Select 
                    value={formData.modelId} 
                    onValueChange={(value) => updateField('modelId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择语言模型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                      <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                      <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* 标签 */}
              <div className="space-y-2">
                <Label htmlFor="tags">标签</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeTag(tag)}
                      >
                        <X size={12} className="text-muted-foreground" />
                        <span className="sr-only">删除</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="new-tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="添加标签"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTag}
                    disabled={!newTag.trim() || formData.tags.includes(newTag.trim())}
                  >
                    添加
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  标签可用于分类和筛选NPC，例如：商店、任务、教程等
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompt">
          <Card>
            <CardHeader>
              <CardTitle>系统提示词</CardTitle>
              <CardDescription>
                定义NPC的个性、知识范围和回答方式
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <PromptEditor
                value={formData.systemPrompt}
                onChange={(value) => updateField('systemPrompt', value)}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="variables">
          <VariableConfig
            variables={formData.variables}
            onChange={(variables) => updateField('variables', variables)}
          />
        </TabsContent>
        
        <TabsContent value="actions">
          <ActionConfig
            actions={formData.actions}
            onChange={(actions) => updateField('actions', actions)}
          />
        </TabsContent>
        
        <TabsContent value="sdk">
          <Card>
            <CardHeader>
              <CardTitle>SDK集成指南</CardTitle>
              <CardDescription>
                获取在游戏中集成此NPC的代码示例
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isEditing ? (
                <CodeExample npc={formData} />
              ) : (
                <div className="bg-muted/20 p-8 text-center rounded-md border border-dashed">
                  <p className="text-muted-foreground">保存NPC后查看集成代码</p>
                  <p className="text-sm text-muted-foreground/70 mt-2">
                    完成创建后将提供针对不同游戏引擎的SDK集成示例
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setActiveTab(prevTab => {
            const tabs = ['basic', 'prompt', 'variables', 'actions', 'sdk'];
            const currentIndex = tabs.indexOf(prevTab);
            if (currentIndex > 0) {
              return tabs[currentIndex - 1];
            }
            return prevTab;
          })}
          disabled={activeTab === 'basic'}
        >
          上一步
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => setActiveTab(prevTab => {
            const tabs = ['basic', 'prompt', 'variables', 'actions', 'sdk'];
            const currentIndex = tabs.indexOf(prevTab);
            if (currentIndex < tabs.length - 1) {
              return tabs[currentIndex + 1];
            }
            return prevTab;
          })}
          disabled={activeTab === 'sdk'}
        >
          下一步
        </Button>
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : (isEditing ? '更新NPC' : '创建NPC')}
        </Button>
      </div>
    </form>
  );
} 