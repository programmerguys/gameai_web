'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ModelGrid } from '@/components/marketplace/ModelGrid';
import { PointsDisplay } from '@/components/marketplace/PointsDisplay';
import { getMarketplaceModels, getCurrentUser } from '@/lib/marketplace';
import type { ModelData } from '@/components/marketplace/ModelCard';

export default function ModelMarketplacePage() {
  const [models, setModels] = useState<ModelData[]>([]);
  const [filteredModels, setFilteredModels] = useState<ModelData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

  // 加载数据
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [modelsData, userData] = await Promise.all([
          getMarketplaceModels(),
          getCurrentUser()
        ]);
        
        setModels(modelsData);
        setFilteredModels(modelsData);
        setUserPoints(userData.points);
      } catch (error) {
        console.error('Failed to load marketplace data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  // 处理搜索
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredModels(models);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = models.filter(model => 
      model.name.toLowerCase().includes(query) || 
      model.tags.some(tag => tag.toLowerCase().includes(query)) ||
      model.authorName.toLowerCase().includes(query)
    );
    
    setFilteredModels(filtered);
  }, [searchQuery, models]);

  // 处理标签筛选
  const handleTabChange = (value: string) => {
    if (value === 'all') {
      setFilteredModels(models);
    } else {
      const filtered = models.filter(model => 
        model.tags.some(tag => tag.toLowerCase() === value.toLowerCase())
      );
      setFilteredModels(filtered);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">模型市场</h1>
          <p className="text-muted-foreground">
            浏览和获取高质量的3D模型，使用积分进行二次创作
          </p>
        </div>
        
        <div className="flex gap-4 items-center">
          <PointsDisplay points={userPoints} />
          
          <Link href="/dashboard/model-marketplace/my-models">
            <Button variant="outline">
              我的模型
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:flex-1">
          <Input
            placeholder="搜索模型、标签或作者..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-4 md:flex md:flex-nowrap w-full md:w-auto">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="建筑">建筑</TabsTrigger>
            <TabsTrigger value="角色">角色</TabsTrigger>
            <TabsTrigger value="自然">自然</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      ) : (
        <div>
          <ModelGrid models={filteredModels} />
          
          {filteredModels.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium mb-2">没有找到相关模型</h3>
              <p className="text-muted-foreground">
                尝试使用不同的搜索词或筛选条件
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 