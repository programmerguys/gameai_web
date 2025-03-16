// 格式化日期
export function formatDate(dateStr: string | null): string {
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
export function formatScopes(scopes: string[]): string {
  const scopeMap: Record<string, string> = {
    model_generator: '3D模型生成',
    idea_generator: '创意点子生成',
    code_generator: '代码生成',
  };
  
  return scopes.map(scope => scopeMap[scope] || scope).join(', ');
}

// API密钥类型
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string | null;
  scopes: string[];
  status: 'active' | 'expired' | 'revoked';
} 