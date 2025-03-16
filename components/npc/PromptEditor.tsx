import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function PromptEditor({ value, onChange }: PromptEditorProps) {
  // activeTab变量实际上是通过Tabs组件内部管理的，这里不需要再声明
  
  // 模板选项
  const templates = [
    {
      name: '商人',
      prompt: `你是{角色名称}，一位在{位置}经营{商店类型}的商人。你很注重生意关系和信誉。对信任的顾客友善慷慨，提供特别优惠；对陌生人保持礼貌但谨慎；对曾经欺骗过你的人冷淡甚至拒绝交易。你的语气随关系变化而变化。

## 个性特点
- 精明且注重生意，但公平交易
- 说话直接，略带幽默感
- 重视诚信和声誉

## 知识范围
- 了解城镇近期发生的事件和流言
- 熟悉各类商品的价值和用途
- 知道哪些冒险者可信，哪些不可信

## 互动指南
- 根据{playerReputation}调整对话态度和价格
- 如果玩家携带稀有物品，表现出兴趣
- 可能向关系良好的玩家提供特殊商品或情报
- 对待轻度讨价还价表示理解，但对过分压价会生气`
    },
    {
      name: '引导助手',
      prompt: `你是{角色名称}，一个游戏内的AI助手。你的主要目标是帮助玩家更好地了解游戏内容和机制。你应该以友好、耐心的方式提供建议和信息，但不要透露太多剧透。

## 个性特点
- 友好、耐心、乐于助人
- 语气轻松但专业
- 偶尔使用幽默感，但不过度

## 知识范围
- 熟悉所有游戏机制和玩法
- 了解游戏内所有地区和特殊位置
- 掌握任务攻略和隐藏内容

## 互动指南
- 根据{playerLevel}调整建议的复杂度
- 为新手玩家提供更详细的引导
- 当玩家询问特定问题时提供准确信息
- 鼓励玩家探索和尝试，而不是直接给出所有答案`
    },
    {
      name: '冒险家',
      prompt: `你是{角色名称}，一位经验丰富的{职业}。你曾游历世界各地，见多识广，有着丰富的冒险经历。你性格直率，说话简洁有力，偶尔会分享你的冒险故事。你对危险有敏锐的直觉，对初次见面的人保持警惕，但愿意帮助真诚的求助者。

## 个性特点
- 勇敢无畏，略带粗犷
- 直率坦诚，不拐弯抹角
- 重视实力和勇气，欣赏有胆识的人

## 知识范围
- 熟悉世界各地的地理和危险
- 了解各种怪物和如何对付它们
- 掌握生存技能和实用知识

## 互动指南
- 根据{currentLocation}提供相关的环境信息
- 对有经验的冒险者更尊重，愿意分享深入知识
- 对新手可能会稍显不耐，但会给出重要警告
- 如果玩家表现出勇气或智慧，会更愿意帮助`
    }
  ];
  
  // 应用模板
  const applyTemplate = (templatePrompt: string) => {
    onChange(templatePrompt);
  };
  
  return (
			<Card className="mb-6">
				<CardHeader>
					<CardTitle>系统提示词</CardTitle>
					<CardDescription>
						设计NPC的角色设定和行为指南，变量使用{"{变量名}"}格式
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="edit">
						<div className="flex justify-between items-center mb-4">
							<TabsList>
								<TabsTrigger value="edit">编辑</TabsTrigger>
								<TabsTrigger value="preview">预览</TabsTrigger>
							</TabsList>

							<div className="flex items-center">
								<span className="text-sm text-muted-foreground mr-2">
									应用模板:
								</span>
								<div className="flex space-x-2">
									{templates.map((template) => (
										<Button
											key={template.name}
											variant="outline"
											size="sm"
											onClick={() => applyTemplate(template.prompt)}
										>
											{template.name}
										</Button>
									))}
								</div>
							</div>
						</div>

						<TabsContent value="edit" className="mt-0">
							<Textarea
								value={value}
								onChange={(e) => onChange(e.target.value)}
								className="font-mono min-h-[300px] resize-y"
								placeholder="在此输入NPC的系统提示词..."
							/>
						</TabsContent>

						<TabsContent value="preview" className="mt-0">
							<div className="border rounded-md p-4 min-h-[300px] whitespace-pre-wrap">
								{value.split(/(\{[^}]+\})/).map((part) => {
									if (part.match(/^\{[^}]+\}$/)) {
										// 变量名（去掉花括号）
										const varName = part.slice(1, -1);
										return (
											<span
												key={varName}
												className="bg-primary/20 text-primary px-1 rounded"
											>
												{varName}
											</span>
										);
									}
									return part;
								})}
							</div>
						</TabsContent>
					</Tabs>

					<div className="mt-4 bg-muted/30 p-3 rounded-md">
						<h4 className="text-sm font-medium mb-1">提示</h4>
						<ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
							<li>清晰描述NPC的性格、背景和说话风格</li>
							<li>使用{"{变量名}"}格式插入动态内容</li>
							<li>分段描述不同方面的行为指南</li>
							<li>考虑NPC在不同情境下的反应方式</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		);
} 