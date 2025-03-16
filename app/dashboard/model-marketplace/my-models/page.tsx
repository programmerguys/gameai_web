'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ModelGrid } from '@/components/marketplace/ModelGrid';
import { PointsDisplay } from '@/components/marketplace/PointsDisplay';
import { getUserModels, getCurrentUser } from '@/lib/marketplace';
import type { ModelData } from '@/components/marketplace/ModelCard';

export default function MyModelsPage() {
  const [models, setModels] = useState<ModelData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

  // 加载数据
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [modelsData, userData] = await Promise.all([
          getUserModels(),
          getCurrentUser()
        ]);
        
        setModels(modelsData);
        setUserPoints(userData.points);
      } catch (error) {
        console.error('Failed to load user models:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">我的模型</h1>
          <p className="text-muted-foreground">
            查看和管理您拥有的3D模型
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
          <PointsDisplay points={userPoints} />
          
          <Link href="/dashboard/model-marketplace">
            <Button variant="outline">
              返回模型市场
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
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
              <title>导出图标</title>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            导出选中模型
          </Button>
          
          <Button variant="outline" className="gap-2">
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
              <title>分享图标</title>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            分享到市场
          </Button>
        </div>
        
        <Link href="/dashboard/services/model-generator">
          <Button className="gap-2">
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
              <title>添加图标</title>
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            创建新模型
          </Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      ) : (
        <div>
          <ModelGrid models={models} />
          
          {models.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4"
                aria-hidden="true"
              >
                <title>用户图标</title>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h3 className="text-lg font-medium mb-2">您还没有模型</h3>
              <p className="text-muted-foreground mb-6">
                通过模型生成器创建新模型或从市场获取模型
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/dashboard/services/model-generator">
                  <Button>创建新模型</Button>
                </Link>
                <Link href="/dashboard/model-marketplace">
                  <Button variant="outline">浏览模型市场</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 