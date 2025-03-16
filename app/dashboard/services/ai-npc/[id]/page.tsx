import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getNPCById } from '@/lib/npc';
import { NPCDetail } from './components/NPCDetail';

interface NPCPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: NPCPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const npc = await getNPCById(resolvedParams.id);
  
  if (!npc) {
    return {
      title: '未找到 - GameAI PaaS',
      description: '无法找到请求的NPC',
    };
  }
  
  return {
    title: `${npc.name} - AI NPC - GameAI PaaS`,
    description: npc.description,
  };
}

export default async function NPCPage({ params }: NPCPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const npc = await getNPCById(resolvedParams.id);
  
  if (!npc) {
    notFound();
  }

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
      
      <Suspense fallback={<NPCDetailSkeleton />}>
        <NPCDetail npc={npc} />
      </Suspense>
    </div>
  );
}

function NPCDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-[36px] w-[250px] rounded-md bg-muted animate-pulse" />
        <div className="h-[20px] w-[350px] rounded-md bg-muted animate-pulse" />
      </div>
      
      <div className="h-[400px] rounded-md border bg-muted animate-pulse" />
    </div>
  );
} 