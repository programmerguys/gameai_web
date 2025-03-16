"use client";

import React from 'react';

// API密钥状态类型
type ApiKeyStatus = 'active' | 'expired' | 'revoked';

interface ApiKeyStatusBadgeProps {
  status: ApiKeyStatus;
}

export function ApiKeyStatusBadge({ status }: ApiKeyStatusBadgeProps) {
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

export default ApiKeyStatusBadge; 