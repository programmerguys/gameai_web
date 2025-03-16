'use client';

import StoryGenerator from '@/components/story/StoryGenerator';

export default function StoryGeneratorPage() {
	return (
		<div className="flex flex-col w-full h-full min-h-[calc(100vh-4rem)]">
			<div className="flex-none p-4 border-b">
				<h1 className="text-2xl font-bold">故事情节生成器</h1>
				<p className="text-muted-foreground">
					通过可视化界面创建分支故事情节和对话结构
				</p>
			</div>

			<div className="flex-1 overflow-hidden">
				<StoryGenerator />
			</div>
		</div>
	);
} 