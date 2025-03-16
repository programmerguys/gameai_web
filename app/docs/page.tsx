import type React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function DocCard({ title, description, href, icon }: { title: string; description: string; href: string; icon: React.ReactNode }) {
  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="pb-2">
        <div className="mb-2 h-8 w-8 text-primary">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Button variant="outline" className="w-full">查看文档</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function DocsPage() {
  return (
			<div className="container mx-auto px-4 py-12">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-4xl font-bold mb-4">开发文档</h1>
					<p className="text-xl text-muted-foreground mb-8">
						全面的指南和资源，帮助您快速接入和使用GameAI平台
					</p>

					<Tabs defaultValue="guides" className="mb-12">
						<TabsList className="mb-6">
							<TabsTrigger value="guides">开发指南</TabsTrigger>
							<TabsTrigger value="api">API参考</TabsTrigger>
							<TabsTrigger value="examples">示例代码</TabsTrigger>
							<TabsTrigger value="tutorials">教程</TabsTrigger>
						</TabsList>

						<TabsContent value="guides" className="space-y-6">
							<div className="prose max-w-none dark:prose-invert">
								<h2>快速开始</h2>
								<p>
									GameAI平台为游戏开发者提供了丰富的AI能力，包括3D模型生成、创意点子生成、游戏代码生成等服务。
									本指南将帮助您快速了解平台功能并开始使用这些服务。
								</p>

								<h3>第一步：注册账户</h3>
								<p>
									在使用GameAI平台前，您需要先
									<Link
										href="/auth/register"
										className="text-primary hover:underline"
									>
										注册一个账户
									</Link>
									。
									注册完成后，您将获得免费的体验额度，可以立即开始试用所有服务。
								</p>

								<h3>第二步：创建API密钥</h3>
								<p>
									登录后，前往
									<Link
										href="/dashboard/api-keys"
										className="text-primary hover:underline"
									>
										API密钥
									</Link>
									页面创建您的密钥。
									这个密钥将用于在您的项目中调用GameAI服务。请妥善保管您的密钥，不要泄露给他人。
								</p>

								<h3>第三步：集成SDK</h3>
								<p>
									我们提供了多种语言的SDK，方便您在项目中集成GameAI服务。目前支持以下平台：
								</p>
								<ul className="list-disc pl-6 space-y-2">
									<li>Unity (C#)</li>
									<li>Unreal Engine (C++/Blueprint)</li>
									<li>Godot (GDScript)</li>
									<li>Web (JavaScript/TypeScript)</li>
									<li>Python</li>
								</ul>

								<h3>第四步：调用API</h3>
								<p>
									通过我们的SDK或直接调用REST
									API，您可以在您的游戏中使用GameAI的各种服务。 查看
									<Link
										href="/docs/api"
										className="text-primary hover:underline"
									>
										API参考文档
									</Link>
									了解详细的接口定义。
								</p>
							</div>
						</TabsContent>

						<TabsContent
							value="api"
							className="grid grid-cols-1 md:grid-cols-2 gap-6"
						>
							<DocCard
								title="REST API"
								description="通过HTTP请求调用GameAI服务的完整API参考"
								href="/docs/api/rest"
								icon={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
									>
										<title>REST API图标</title>
										<path d="M18 10h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2z" />
									</svg>
								}
							/>
							<DocCard
								title="Unity SDK"
								description="在Unity项目中集成GameAI服务的SDK文档"
								href="/docs/api/unity"
								icon={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
									>
										<title>Unity SDK图标</title>
										<path d="m12 3-1.912 5.813a8.09 8.09 0 0 1-5.279 5.28L3 12l1.81 1.908a8.09 8.09 0 0 1 5.28 5.279L12 21l1.908-1.81a8.09 8.09 0 0 1 5.279-5.28L21 12l-1.81-1.908a8.09 8.09 0 0 1-5.28-5.279L12 3z" />
									</svg>
								}
							/>
							<DocCard
								title="Unreal SDK"
								description="在Unreal Engine项目中集成GameAI服务的SDK文档"
								href="/docs/api/unreal"
								icon={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
									>
										<title>Unreal SDK图标</title>
										<path d="M12 1v22" />
										<path d="M1 12h22" />
										<path d="m12 1 9 9" />
										<path d="m12 1-9 9" />
										<path d="m12 23 9-9" />
										<path d="m12 23-9-9" />
										<path d="m1 12 9 9" />
										<path d="m1 12 9-9" />
										<path d="m23 12-9 9" />
										<path d="m23 12-9-9" />
									</svg>
								}
							/>
							<DocCard
								title="Web SDK"
								description="在Web应用中集成GameAI服务的JavaScript/TypeScript SDK文档"
								href="/docs/api/web"
								icon={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
									>
										<title>Web SDK图标</title>
										<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
									</svg>
								}
							/>
						</TabsContent>

						<TabsContent
							value="examples"
							className="prose max-w-none dark:prose-invert"
						>
							<h2>示例代码</h2>
							<p>
								我们提供了丰富的示例代码，帮助您理解如何在各种场景中使用GameAI服务。
								以下是一些常见场景的示例：
							</p>

							<div className="mt-6 space-y-6">
								<div className="border border-border rounded-lg p-4">
									<h3 className="text-lg font-medium mb-2">
										使用Unity SDK生成3D模型
									</h3>
									<pre className="bg-muted rounded-md p-4 overflow-x-auto">
										<code>
											{`// 引入GameAI SDK
using GameAI;
using GameAI.ModelGenerator;

// 初始化SDK
GameAIClient client = new GameAIClient("YOUR_API_KEY");

// 创建模型生成请求
ModelGenerationRequest request = new ModelGenerationRequest
{
    Prompt = "一个卡通风格的城堡，有高高的塔楼和蓝色的屋顶",
    Style = ModelStyle.Cartoon,
    Format = ModelFormat.GLB
};

// 异步调用模型生成API
ModelGenerationResponse response = await client.ModelGenerator.GenerateAsync(request);

// 下载生成的模型
await client.DownloadModelAsync(response.ModelUrl, "Assets/Models/castle.glb");
`}
										</code>
									</pre>
								</div>

								<div className="border border-border rounded-lg p-4">
									<h3 className="text-lg font-medium mb-2">
										使用REST API生成游戏创意
									</h3>
									<pre className="bg-muted rounded-md p-4 overflow-x-auto">
										<code>
											{`// 使用fetch API调用GameAI服务
fetch('https://api.gameai.com/v1/idea-generator', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    genre: "角色扮演",
    theme: "太空探险",
    constraints: "适合休闲玩家，单人游戏"
  })
})
.then(response => response.json())
.then(data => {
  console.log('游戏创意:', data.idea);
  console.log('核心机制:', data.mechanics);
  console.log('目标玩家:', data.targetAudience);
})
.catch(error => console.error('Error:', error));
`}
										</code>
									</pre>
								</div>
							</div>

							<p className="mt-6">
								访问我们的
								<Link
									href="https://github.com/gameai-examples"
									className="text-primary hover:underline"
								>
									GitHub仓库
								</Link>
								获取更多示例代码和项目。
							</p>
						</TabsContent>

						<TabsContent value="tutorials" className="space-y-8">
							<div className="border rounded-lg overflow-hidden">
								<div className="bg-muted p-4">
									<h3 className="text-lg font-medium mb-1">
										入门教程：接入GameAI服务
									</h3>
									<p className="text-sm text-muted-foreground">
										学习如何在5分钟内将GameAI服务集成到您的游戏项目中
									</p>
								</div>
								<div className="p-4 flex justify-between items-center">
									<span className="text-sm">视频时长: 5:30</span>
									<Link href="/tutorials/getting-started">
										<Button>观看教程</Button>
									</Link>
								</div>
							</div>

							<div className="border rounded-lg overflow-hidden">
								<div className="bg-muted p-4">
									<h3 className="text-lg font-medium mb-1">
										高级教程：自定义3D模型生成
									</h3>
									<p className="text-sm text-muted-foreground">
										深入了解如何通过详细提示词和参数调整，生成完全符合您需求的3D模型
									</p>
								</div>
								<div className="p-4 flex justify-between items-center">
									<span className="text-sm">视频时长: 12:45</span>
									<Link href="/tutorials/advanced-model-generation">
										<Button>观看教程</Button>
									</Link>
								</div>
							</div>

							<div className="border rounded-lg overflow-hidden">
								<div className="bg-muted p-4">
									<h3 className="text-lg font-medium mb-1">
										实战案例：构建AI驱动的NPC系统
									</h3>
									<p className="text-sm text-muted-foreground">
										通过GameAI的代码生成和创意服务，打造智能、有个性的游戏NPC
									</p>
								</div>
								<div className="p-4 flex justify-between items-center">
									<span className="text-sm">视频时长: 28:15</span>
									<Link href="/tutorials/ai-npc-system">
										<Button>观看教程</Button>
									</Link>
								</div>
							</div>
						</TabsContent>
					</Tabs>

					<div className="bg-muted p-6 rounded-lg">
						<h2 className="text-xl font-bold mb-4">需要帮助？</h2>
						<p className="mb-4">
							如果您在使用过程中遇到任何问题，或有任何建议，请随时联系我们：
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Button variant="outline" className="sm:flex-1">
								<svg
									className="mr-2 h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<title>GitHub图标</title>
									<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
									<path d="M9 18c-4.51 2-5-2-7-2" />
								</svg>
								GitHub问题
							</Button>
							<Button variant="outline" className="sm:flex-1">
								<svg
									className="mr-2 h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<title>社区论坛图标</title>
									<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
								</svg>
								社区论坛
							</Button>
							<Button variant="outline" className="sm:flex-1">
								<svg
									className="mr-2 h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<title>电子邮件图标</title>
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
									<polyline points="22,6 12,13 2,6" />
								</svg>
								电子邮件支持
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
} 