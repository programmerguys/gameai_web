import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { NPCForm } from '@/components/npc/NPCForm';
import { getNPCById, updateNPC } from '@/lib/npc';
import type { NPCStatus } from '@/lib/npc';

interface EditNPCPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EditNPCPageProps): Promise<Metadata> {
  const npc = await getNPCById(params.id);
  
  if (!npc) {
    return {
      title: '未找到 - GameAI PaaS',
      description: '无法找到请求的NPC',
    };
  }
  
  return {
    title: `编辑 ${npc.name} - AI NPC - GameAI PaaS`,
    description: `编辑NPC "${npc.name}"的设置和行为`,
  };
}

export default async function EditNPCPage({ params }: EditNPCPageProps) {
  const npc = await getNPCById(params.id);
  
  if (!npc) {
    notFound();
  }
  
  async function handleUpdateNPC(formData: FormData) {
    'use server';
    
    if (!npc) return notFound();
    
    const npcData = {
      id: params.id,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      systemPrompt: formData.get('systemPrompt') as string,
      status: formData.get('status') as NPCStatus,
      modelId: formData.get('modelId') as string,
      tags: (formData.get('tags') as string || '').split(',').filter(Boolean),
      variables: JSON.parse(formData.get('variables') as string || '[]'),
      actions: JSON.parse(formData.get('actions') as string || '[]'),
      createdAt: npc.createdAt,
      updatedAt: new Date().toISOString(),
    };
    
    await updateNPC(npcData);
    redirect(`/dashboard/services/ai-npc/${params.id}`);
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/services/ai-npc/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回详情
          </Link>
        </Button>
      </div>
      
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">编辑 {npc.name}</h1>
        <p className="text-muted-foreground">
          修改这个NPC的行为、对话风格和游戏集成设置
        </p>
      </div>
      
      <NPCForm 
        npc={npc}
        onSubmit={async (updatedNpc) => {
          const formData = new FormData();
          formData.append('name', updatedNpc.name);
          formData.append('description', updatedNpc.description);
          formData.append('systemPrompt', updatedNpc.systemPrompt);
          formData.append('status', updatedNpc.status);
          formData.append('modelId', updatedNpc.modelId);
          formData.append('tags', updatedNpc.tags.join(','));
          formData.append('variables', JSON.stringify(updatedNpc.variables));
          formData.append('actions', JSON.stringify(updatedNpc.actions));
          
          await handleUpdateNPC(formData);
        }}
      />
    </div>
  );
} 