'use client';

import CodeGenerator from '@/components/code-generator/CodeGenerator';

export default function CodeGeneratorPage() {
	return (
		<div className="flex flex-col w-full h-full min-h-[calc(100vh-4rem)]">
			<div className="flex-none p-4 border-b">
				<h1 className="text-2xl font-bold">游戏代码生成器</h1>
				<p className="text-muted-foreground">
					基于AI的Unity游戏代码生成工具，快速获取定制代码实现
				</p>
			</div>

			<div className="flex-1 overflow-hidden">
				<CodeGenerator />
			</div>
		</div>
	);
} 