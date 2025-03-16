import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { NPCVariable } from '@/lib/npc';

interface VariableConfigProps {
  variables: NPCVariable[];
  onChange: (variables: NPCVariable[]) => void;
}

export function VariableConfig({ variables, onChange }: VariableConfigProps) {
  const [newVariable, setNewVariable] = useState<NPCVariable>({
    name: '',
    description: '',
    example: ''
  });
  
  // 添加新变量
  const addVariable = () => {
    if (!newVariable.name || !newVariable.description) return;
    
    const updatedVariables = [
      ...variables,
      { ...newVariable }
    ];
    
    onChange(updatedVariables);
    setNewVariable({ name: '', description: '', example: '' });
  };
  
  // 删除变量
  const removeVariable = (index: number) => {
    const updatedVariables = [...variables];
    updatedVariables.splice(index, 1);
    onChange(updatedVariables);
  };
  
  // 更新变量
  const updateVariable = (index: number, field: keyof NPCVariable, value: string) => {
    const updatedVariables = [...variables];
    updatedVariables[index] = {
      ...updatedVariables[index],
      [field]: value
    };
    onChange(updatedVariables);
  };
  
  // 预定义变量模板
  const variableTemplates = [
    {
      name: 'playerName',
      description: '玩家角色名称',
      example: '冒险者'
    },
    {
      name: 'playerLevel',
      description: '玩家等级',
      example: '10'
    },
    {
      name: 'playerReputation',
      description: '玩家声望值',
      example: '75'
    },
    {
      name: 'timeOfDay',
      description: '游戏中的时间',
      example: '黄昏'
    },
    {
      name: 'currentLocation',
      description: '当前位置',
      example: '森林小屋'
    }
  ];
  
  // 应用模板
  const applyTemplate = (template: NPCVariable) => {
    if (variables.some(v => v.name === template.name)) {
      return; // 如果已存在相同名称的变量，则不添加
    }
    
    const updatedVariables = [
      ...variables,
      { ...template }
    ];
    
    onChange(updatedVariables);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>上下文变量</CardTitle>
        <CardDescription>
          定义在与NPC对话时可以传递的动态内容变量
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* 变量列表 */}
          {variables.length > 0 ? (
            <div className="space-y-4">
              {variables.map((variable, index) => (
                <div 
                  key={`variable-${variable.name}-${index}`} 
                  className="p-4 border rounded-md bg-muted/20"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{variable.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {variable.description}
                      </p>
                      {variable.example && (
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          示例值: <span className="font-mono">{variable.example}</span>
                        </p>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeVariable(index)}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      删除
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor={`var-name-${index}`}>变量名</Label>
                      <Input 
                        id={`var-name-${index}`}
                        value={variable.name}
                        onChange={(e) => updateVariable(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`var-desc-${index}`}>描述</Label>
                      <Input
                        id={`var-desc-${index}`}
                        value={variable.description}
                        onChange={(e) => updateVariable(index, 'description', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`var-example-${index}`}>示例值</Label>
                      <Input
                        id={`var-example-${index}`}
                        value={variable.example}
                        onChange={(e) => updateVariable(index, 'example', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-muted/20 rounded-md border border-dashed">
              <p className="text-muted-foreground">暂无配置的变量</p>
              <p className="text-sm text-muted-foreground/70">
                添加变量来让NPC能够获取游戏中的上下文信息
              </p>
            </div>
          )}
          
          {/* 快速添加预定义变量 */}
          <div className="mt-4">
            <h4 className="font-medium mb-3">快速添加常用变量</h4>
            <div className="flex flex-wrap gap-2">
              {variableTemplates.map((template) => (
                <Button
                  key={template.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applyTemplate(template)}
                  className="text-xs"
                  disabled={variables.some(v => v.name === template.name)}
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>
          
          {/* 添加新变量 */}
          <div className="mt-6 border-t pt-6">
            <h4 className="font-medium mb-3">添加新变量</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div>
                <Label htmlFor="new-var-name">变量名</Label>
                <Input 
                  id="new-var-name"
                  value={newVariable.name}
                  onChange={(e) => setNewVariable({ ...newVariable, name: e.target.value })}
                  placeholder="例如: playerLevel"
                />
              </div>
              
              <div>
                <Label htmlFor="new-var-desc">描述</Label>
                <Input
                  id="new-var-desc"
                  value={newVariable.description}
                  onChange={(e) => setNewVariable({ ...newVariable, description: e.target.value })}
                  placeholder="变量的用途"
                />
              </div>
              
              <div>
                <Label htmlFor="new-var-example">示例值</Label>
                <Input
                  id="new-var-example"
                  value={newVariable.example}
                  onChange={(e) => setNewVariable({ ...newVariable, example: e.target.value })}
                  placeholder="例如: 10"
                />
              </div>
            </div>
            
            <Button
              onClick={addVariable}
              disabled={!newVariable.name || !newVariable.description}
            >
              添加变量
            </Button>
          </div>
          
          <div className="mt-4 bg-muted/30 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-1">提示</h4>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>变量名应使用驼峰命名法(camelCase)</li>
              <li>在提示词中使用 {'{'}<span className="font-mono">变量名</span>{'}'} 格式来引用变量</li>
              <li>示例值帮助你理解变量的数据格式</li>
              <li>这些变量将在游戏运行时从游戏状态中获取实际值</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 