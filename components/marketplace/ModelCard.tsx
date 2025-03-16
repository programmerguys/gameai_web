import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export interface ModelData {
  id: string;
  name: string;
  thumbnailUrl: string;
  description: string;
  authorName: string;
  pointsPrice: number;
  tags: string[];
  rating: number;
  downloads: number;
  type: '3d_model' | 'texture';
  createdAt: string;
}

interface ModelCardProps {
  model: ModelData;
  showTags?: boolean;
}

export function ModelCard({ model, showTags = true }: ModelCardProps) {
  return (
    <Link href={`/dashboard/model-marketplace/${model.id}`}>
      <Card className="overflow-hidden h-full transition-all duration-200 hover:border-primary/50 hover:shadow-md">
        <div className="aspect-square relative bg-muted">
          {model.thumbnailUrl ? (
            <Image 
              src={model.thumbnailUrl} 
              alt={model.name}
              fill={true}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-muted-foreground/50"
                aria-hidden="true"
              >
                <title>无图像占位符</title>
                <path d="M2 12.5c1.5-2.5 3.5-3.5 5-3.5.8 0 1.6.3 2.1.8 1.4 1.3 1.9 4.2 4.4 4.2.7 0 2-.2 3.5-1.2M18 12v7M18 9h.01" />
              </svg>
            </div>
          )}
          
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {model.pointsPrice} 积分
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate" title={model.name}>
            {model.name}
          </h3>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
            <span>{model.authorName}</span>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-yellow-500 mr-1"
                aria-hidden="true"
              >
                <title>评分星星</title>
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
              {model.rating}
            </div>
          </div>
          
          {showTags && model.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {model.tags.slice(0, 3).map(tag => (
                <Badge key={`${model.id}-tag-${tag}`} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {model.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{model.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="px-4 py-3 border-t flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3 mr-1"
              aria-hidden="true"
            >
              <title>下载图标</title>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            {model.downloads} 次下载
          </div>
          
          <div>
            {model.type === '3d_model' ? '3D模型' : '纹理'}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
} 