'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { NPCForm } from '@/components/npc/NPCForm';
import { createNPC, autoGenerateNPC } from '@/lib/npc';
import type { NPCStatus, NPC } from '@/lib/npc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateNPCPage() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNPC, setGeneratedNPC] = useState<Omit<NPC, 'id' | 'createdAt' | 'updatedAt'> | null>(null);
  
  async function handleCreateNPC(formData: FormData) {
    const npcData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      systemPrompt: formData.get('systemPrompt') as string,
      status: formData.get('status') as NPCStatus,
      modelId: formData.get('modelId') as string,
      tags: (formData.get('tags') as string || '').split(',').filter(Boolean),
      variables: JSON.parse(formData.get('variables') as string || '[]'),
      actions: JSON.parse(formData.get('actions') as string || '[]'),
    };
    
    const npc = await createNPC(npcData);
    router.push(`/dashboard/services/ai-npc/${npc.id}`);
  }
  
  // 智能生成NPC
  const handleGenerateNPC = async () => {
    if (!description.trim() || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const npc = await autoGenerateNPC(description);
      setGeneratedNPC(npc);
    } catch (error) {
      console.error('生成NPC时出错:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/services/ai-npc">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回列表
          </Link>
        </Button>
      </div>
      
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">创建AI NPC</h1>
        <p className="text-muted-foreground">
          创建新的NPC角色，设置其行为、对话风格和游戏集成方式
        </p>
      </div>
      
      {/* 一句话创建组件 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
            一句话创建
          </CardTitle>
          <CardDescription>
            描述你想要的NPC角色，AI将为你智能生成一个完整的NPC
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="例如: '创建一个名叫老钱的商人NPC，性格精明，喜欢讨价还价，但对熟客很大方'"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="resize-none"
          />
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleGenerateNPC} 
              disabled={!description.trim() || isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  智能生成
                </>
              )}
            </Button>
            
            <p className="text-sm text-muted-foreground">
              {isGenerating 
                ? '正在分析描述并生成NPC，请稍候...' 
                : '基于描述智能生成NPC的所有属性，然后你可以根据需要进行微调'
              }
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
            <p className="font-medium mb-1">提示:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>尽量详细描述NPC的特点、性格和目的</li>
              <li>可以指定NPC的名字、职业或类型</li>
              <li>描述NPC应该如何与玩家互动</li>
              <li>生成后可以在下方表单中进一步修改</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <NPCForm 
        npc={generatedNPC ? {
          ...generatedNPC,
          id: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } : undefined}
        onSubmit={async (npc) => {
          const formData = new FormData();
          formData.append('name', npc.name);
          formData.append('description', npc.description);
          formData.append('systemPrompt', npc.systemPrompt);
          formData.append('status', npc.status);
          formData.append('modelId', npc.modelId);
          formData.append('tags', npc.tags.join(','));
          formData.append('variables', JSON.stringify(npc.variables));
          formData.append('actions', JSON.stringify(npc.actions));
          
          await handleCreateNPC(formData);
        }}
      />
    </div>
  );
} 