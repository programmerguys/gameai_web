import React from 'react';
import { ModelCard, type ModelData } from './ModelCard';

interface ModelGridProps {
  models: ModelData[];
}

export function ModelGrid({ models }: ModelGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {models.map(model => (
        <ModelCard key={model.id} model={model} />
      ))}
      
      {models.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-muted-foreground/50 mb-4"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9.9 9a3 3 0 0 0-5.7 1c0 .8.4 1.5 1 2" />
            <path d="M13.8 13a3 3 0 0 0 5.7-1c0-.8-.4-1.5-1-2" />
            <path d="m16 6-4 12" />
          </svg>
          <h3 className="text-lg font-medium mb-1">暂无模型</h3>
          <p className="text-muted-foreground">
            没有找到符合条件的模型，请尝试调整筛选条件
          </p>
        </div>
      )}
    </div>
  );
} 