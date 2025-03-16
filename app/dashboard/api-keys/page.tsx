import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// API密钥对象类型
interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string | null;
  scopes: string[];
  status: 'active' | 'expired' | 'revoked';
}

// 示例API密钥数据
const apiKeys: ApiKey[] = [
  {
    id: '1',
    name: '开发环境',
    key: 'gk_dev_*********************************************3a2',
    created: '2023-12-01T08:45:00Z',
    lastUsed: '2024-03-15T14:20:00Z',
    scopes: ['model_generator', 'idea_generator', 'code_generator'],
    status: 'active',
  },
  {
    id: '2',
    name: '测试环境',
    key: 'gk_test_********************************************7f1',
    created: '2024-01-15T10:30:00Z',
    lastUsed: '2024-03-10T09:15:00Z',
    scopes: ['model_generator', 'idea_generator'],
    status: 'active',
  },
  {
    id: '3',
    name: '旧生产环境',
    key: 'gk_prod_********************************************4e5',
    created: '2023-10-05T15:20:00Z',
    lastUsed: '2023-12-28T11:35:00Z',
    scopes: ['model_generator', 'idea_generator', 'code_generator'],
    status: 'revoked',
  },
];

// 格式化日期
function formatDate(dateStr: string | null): string {
  if (!dateStr) return '从未使用';
  
  const date = new Date(dateStr);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// 格式化权限范围
function formatScopes(scopes: string[]): string {
  const scopeMap: Record<string, string> = {
    model_generator: '3D模型生成',
    idea_generator: '创意点子生成',
    code_generator: '代码生成',
  };
  
  return scopes.map(scope => scopeMap[scope] || scope).join(', ');
}

// API密钥状态标签
function StatusBadge({ status }: { status: ApiKey['status'] }) {
  const statusConfig = {
    active: {
      label: '活跃',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    expired: {
      label: '已过期',
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    revoked: {
      label: '已撤销',
      className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    },
  };
  
  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}

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
      
      <Card>
        <CardHeader>
          <CardTitle>您的API密钥</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    名称
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    密钥
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    访问范围
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    创建时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    最后使用
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {apiKeys.map((apiKey) => (
                  <tr key={apiKey.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {apiKey.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono">{apiKey.key}</span>
                        <button
                          className="text-primary hover:text-primary-hover"
                          aria-label="复制API密钥"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                            aria-hidden="true"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <StatusBadge status={apiKey.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatScopes(apiKey.scopes)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatDate(apiKey.created)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatDate(apiKey.lastUsed)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {apiKey.status === 'active' ? (
                        <button
                          className="text-red-600 hover:text-red-900"
                          aria-label="撤销API密钥"
                          type="button"
                        >
                          撤销
                        </button>
                      ) : (
                        <button
                          className="text-primary hover:text-primary-hover"
                          aria-label="重新生成API密钥"
                          type="button"
                        >
                          重新生成
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API使用指南</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">使用API密钥进行身份验证</h3>
              <p className="text-sm text-muted-foreground">
                将您的API密钥通过请求头 <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">X-GameAI-API-Key</code> 包含在所有请求中：
              </p>
              <div className="mt-2 p-4 bg-muted rounded-md">
                <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
{`curl https://api.gameai.com/v1/models/generate \\
  -H "X-GameAI-API-Key: 您的API密钥" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "一个低多边形树的3D模型"}'`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">API密钥安全最佳实践</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>不要在公共代码库或客户端代码中暴露您的API密钥</li>
                <li>使用环境变量或安全的密钥管理服务来存储API密钥</li>
                <li>为不同环境（开发、测试、生产）使用不同的API密钥</li>
                <li>定期轮换您的API密钥以提高安全性</li>
                <li>仅分配必要的访问范围，遵循最小权限原则</li>
              </ul>
            </div>
            
            <div className="mt-4">
              <a
                href="/docs/api"
                className="text-primary hover:text-primary-hover hover:underline inline-flex items-center"
              >
                查看API文档
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 ml-1"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 