"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ApiKeyStatusBadge } from './ApiKeyStatusBadge';
import { formatDate, formatScopes } from './utils';
import type { ApiKey } from "./utils";

interface ApiKeysListProps {
  apiKeys: ApiKey[];
}

export function ApiKeysList({ apiKeys }: ApiKeysListProps) {
  return (
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
                        onClick={() => {
                          navigator.clipboard.writeText(apiKey.key);
                        }}
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
                    <ApiKeyStatusBadge status={apiKey.status} />
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
  );
}

export default ApiKeysList; 