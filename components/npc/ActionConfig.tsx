'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { NPCAction } from '@/lib/npc';

interface ActionConfigProps {
  actions: NPCAction[];
  onChange: (actions: NPCAction[]) => void;
}

export function ActionConfig({ actions, onChange }: ActionConfigProps) {
  const [newAction, setNewAction] = useState<Partial<NPCAction>>({
    name: '',
    description: ''
  });
  
  // 添加新动作
  const addAction = () => {
    if (!newAction.name || !newAction.description) return;
    
    const updatedActions = [
      ...actions,
      { name: newAction.name, description: newAction.description }
    ];
    
    onChange(updatedActions);
    setNewAction({ name: '', description: '' });
  };
  
  // 删除动作
  const removeAction = (index: number) => {
    const updatedActions = [...actions];
    updatedActions.splice(index, 1);
    onChange(updatedActions);
  };
  
  // 更新动作
  const updateAction = (index: number, field: keyof NPCAction, value: string) => {
    const updatedActions = [...actions];
    updatedActions[index] = {
      ...updatedActions[index],
      [field]: value
    };
    onChange(updatedActions);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>动作配置</CardTitle>
        <CardDescription>
          定义NPC可以执行的游戏内动作，这些动作可以在游戏中被触发
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* 动作列表 */}
          {actions.length > 0 ? (
            <div className="space-y-4">
              {actions.map((action, index) => (
                <div 
                  key={`action-${action.name}-${index}`} 
                  className="p-4 border rounded-md bg-muted/20"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{action.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeAction(index)}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      删除
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`action-name-${index}`}>动作名称</Label>
                      <Input 
                        id={`action-name-${index}`}
                        value={action.name}
                        onChange={(e) => updateAction(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`action-desc-${index}`}>描述</Label>
                      <Textarea
                        id={`action-desc-${index}`}
                        value={action.description}
                        onChange={(e) => updateAction(index, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-muted/20 rounded-md border border-dashed">
              <p className="text-muted-foreground">暂无配置的动作</p>
              <p className="text-sm text-muted-foreground/70">
                添加动作来让NPC能够执行游戏内操作
              </p>
            </div>
          )}
          
          {/* 添加新动作 */}
          <div className="mt-6 border-t pt-6">
            <h4 className="font-medium mb-3">添加新动作</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="new-action-name">动作名称</Label>
                <Input 
                  id="new-action-name"
                  value={newAction.name}
                  onChange={(e) => setNewAction({ ...newAction, name: e.target.value })}
                  placeholder="例如: openShop, giveQuest"
                />
              </div>
              
              <div>
                <Label htmlFor="new-action-desc">描述</Label>
                <Textarea
                  id="new-action-desc"
                  value={newAction.description}
                  onChange={(e) => setNewAction({ ...newAction, description: e.target.value })}
                  placeholder="描述这个动作的功能和用途"
                  rows={3}
                />
              </div>
              
              <Button
                onClick={addAction}
                disabled={!newAction.name || !newAction.description}
              >
                添加动作
              </Button>
            </div>
          </div>
          
          <div className="mt-4 bg-muted/30 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-1">提示</h4>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>动作名称应使用驼峰命名法(camelCase)</li>
              <li>每个动作应有明确的功能目的</li>
              <li>动作可以在对话中自动触发或由玩家手动触发</li>
              <li>复杂动作可能需要带参数，可在游戏实现中定义</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 