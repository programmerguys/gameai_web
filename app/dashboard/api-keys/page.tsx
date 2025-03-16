import React from 'react';
import { Button } from '@/components/ui/button';
import { ApiKeysList } from '@/components/api-keys/ApiKeysList';
import { ApiUsageGuide } from '@/components/api-keys/ApiUsageGuide';
import { SdkIntegrationGuide } from '@/components/api-keys/SdkIntegrationGuide';
import type { ApiKey } from '@/components/api-keys/utils';

// 示例API密钥数据
const apiKeys: ApiKey[] = [
	{
		id: "1",
		name: "开发环境",
		key: "gk_dev_*********************************************3a2",
		created: "2023-12-01T08:45:00Z",
		lastUsed: "2024-03-15T14:20:00Z",
		scopes: ["model_generator", "idea_generator", "code_generator"],
		status: "active",
	},
	{
		id: "2",
		name: "测试环境",
		key: "gk_test_********************************************7f1",
		created: "2024-01-15T10:30:00Z",
		lastUsed: "2024-03-10T09:15:00Z",
		scopes: ["model_generator", "idea_generator"],
		status: "active",
	},
	{
		id: "3",
		name: "旧生产环境",
		key: "gk_prod_********************************************4e5",
		created: "2023-10-05T15:20:00Z",
		lastUsed: "2023-12-28T11:35:00Z",
		scopes: ["model_generator", "idea_generator", "code_generator"],
		status: "revoked",
	},
];

export default function ApiKeysPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">API密钥</h1>
					<p className="text-muted-foreground mt-1">
						管理您的API密钥以访问GameAI服务
					</p>
				</div>
				<Button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-4 w-4 mr-2"
						aria-hidden="true"
					>
						<path d="M12 5v14M5 12h14" />
					</svg>
					创建新密钥
				</Button>
			</div>

			<ApiKeysList apiKeys={apiKeys} />

			<div className="grid gap-6 grid-cols-1 md:grid-cols-2">
				<ApiUsageGuide />
				<SdkIntegrationGuide apiKey={apiKeys[0]} />
			</div>
		</div>
	);
} 