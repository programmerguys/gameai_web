"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Cpu, Save, Sparkles, Settings, Zap, BadgeInfo } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// 定义不同模型的特性和参数范围
const MODEL_FEATURES = {
  'gpt-4': {
    name: 'GPT-4',
    description: '最强大的大语言模型，具有广泛的知识和复杂推理能力',
    maxTokens: 32000,
    costPerToken: 0.06,
    features: ['上下文理解', '复杂推理', '知识丰富', '创造性思维'],
    recommendedFor: ['复杂角色', '需要专业知识的NPC', '高级推理场景'],
    color: 'bg-gradient-to-r from-purple-600 to-indigo-600'
  },
  'claude-3-opus': {
    name: 'Claude 3 Opus',
    description: '高级对话模型，擅长自然对话和内容创作',
    maxTokens: 24000,
    costPerToken: 0.04,
    features: ['自然对话', '创意写作', '情感感知', '伦理判断'],
    recommendedFor: ['对话丰富的角色', '情感细腻的NPC', '叙事型场景'],
    color: 'bg-gradient-to-r from-amber-500 to-orange-600'
  },
  'gpt-3.5-turbo': {
    name: 'GPT-3.5 Turbo',
    description: '响应迅速的通用模型，适合大多数NPC场景',
    maxTokens: 16000,
    costPerToken: 0.01,
    features: ['快速响应', '高效对话', '基础推理', '成本效益高'],
    recommendedFor: ['通用NPC', '简单角色', '高频互动场景'],
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  'mistral-large': {
    name: 'Mistral Large',
    description: '开放模型，性能与效率的良好平衡',
    maxTokens: 32000,
    costPerToken: 0.02,
    features: ['自定义部署', '高性价比', '可定制性', '本地部署选项'],
    recommendedFor: ['需要定制的NPC', '高吞吐量场景', '隐私敏感场景'],
    color: 'bg-gradient-to-r from-emerald-500 to-teal-600'
  }
};

interface ModelSelectorProps {
  currentModelId: string;
  onModelChange?: (modelId: string, settings: ModelSettings) => void;
}

export interface ModelSettings {
  modelId: string;
  temperature: number;
  maxTokens: number;
  streamingEnabled: boolean;
}

export function ModelSelector({ currentModelId, onModelChange }: ModelSelectorProps) {
  const [modelId, setModelId] = useState(currentModelId);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(MODEL_FEATURES[currentModelId as keyof typeof MODEL_FEATURES]?.maxTokens || 16000);
  const [streamingEnabled, setStreamingEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  
  // 当前选择的模型信息
  const currentModel = MODEL_FEATURES[modelId as keyof typeof MODEL_FEATURES];
  
  const handleModelChange = (newModelId: string) => {
    setModelId(newModelId);
    const model = MODEL_FEATURES[newModelId as keyof typeof MODEL_FEATURES];
    if (model) {
      setMaxTokens(model.maxTokens / 2); // 默认设置为最大值的一半
    }
  };
  
  const handleSaveSettings = () => {
    if (onModelChange) {
      onModelChange(modelId, {
        modelId,
        temperature,
        maxTokens,
        streamingEnabled
      });
    }
  };
  
  // 计算每月预估成本（仅为示例，非实际计算）
  const calculateMonthlyCost = () => {
    const model = MODEL_FEATURES[modelId as keyof typeof MODEL_FEATURES];
    if (!model) return 0;
    
    // 假设每天100次对话，每次对话平均使用1000个token
    const dailyTokens = 100 * 1000;
    const monthlyCost = dailyTokens * 30 * model.costPerToken / 1000;
    return monthlyCost.toFixed(2);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Cpu className="h-5 w-5 mr-2 text-purple-500" />
            <span>语言模型配置</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-4">
          <div>
            <Label htmlFor="model-select" className="text-sm font-medium mb-1.5 block">选择模型</Label>
            <Select value={modelId} onValueChange={handleModelChange}>
              <SelectTrigger id="model-select">
                <SelectValue placeholder="选择语言模型" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(MODEL_FEATURES).map(([id, model]) => (
                  <SelectItem key={id} value={id}>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${model.color.replace('bg-gradient-to-r', 'bg')}`} />
                      {model.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentModel && (
            <div className="space-y-3">
              <div className={`p-3 rounded-md ${currentModel.color} text-white`}>
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <h4 className="font-medium">{currentModel.name}</h4>
                </div>
                <p className="text-sm mt-1 text-white/90">{currentModel.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {currentModel.features.map(feature => (
                    <Badge key={feature} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {isExpanded && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">创造性 (Temperature)</Label>
                      <span className="text-xs text-muted-foreground">{temperature.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">精确</span>
                      <Slider 
                        value={[temperature]} 
                        min={0} 
                        max={1} 
                        step={0.1} 
                        onValueChange={value => setTemperature(value[0])} 
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground">创造</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      控制NPC回应的随机性和创造性。较低的值使回应更一致，较高的值增加多样性。
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">最大长度 (Tokens)</Label>
                      <span className="text-xs text-muted-foreground">{maxTokens}</span>
                    </div>
                    <Slider 
                      value={[maxTokens]} 
                      min={1000} 
                      max={currentModel.maxTokens} 
                      step={1000} 
                      onValueChange={value => setMaxTokens(value[0])} 
                    />
                    <p className="text-xs text-muted-foreground">
                      设置NPC响应的最大长度。较大的值允许更详细的回应，但会增加成本。
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Label className="text-sm" htmlFor="streaming-toggle">实时流式输出</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <BadgeInfo className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-xs">
                                启用流式输出允许NPC回应实时显示，就像正在打字一样，提供更自然的对话体验。
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Switch
                        id="streaming-toggle"
                        checked={streamingEnabled}
                        onCheckedChange={setStreamingEnabled}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>预估月成本:</span>
                    </div>
                    <Badge variant="outline" className="font-mono">
                      ${calculateMonthlyCost()}
                    </Badge>
                  </div>
                  
                  <Button onClick={handleSaveSettings} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    保存设置
                  </Button>
                </div>
              )}
              
              {!isExpanded && (
                <div className="text-xs text-center text-muted-foreground mt-1">
                  点击齿轮图标展开高级设置
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 