import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { getModelById, getCurrentUser, calculateAuthorReward, performRecreation } from '@/lib/marketplace';
import { PointsDisplay } from '@/components/marketplace/PointsDisplay';
import { CreateConfirmation } from '@/components/marketplace/CreateConfirmation';
import type { ModelData } from '@/components/marketplace/ModelCard';

// 示例3D模型 (从model-generator页面复用)
function SimpleBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function ModelDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const modelId = params.id as string;
  const shouldShowRecreate = searchParams.get('recreate') === 'true';
  
  const [model, setModel] = useState<ModelData | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(shouldShowRecreate);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // 加载模型和用户数据
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [modelData, userData] = await Promise.all([
          getModelById(modelId),
          getCurrentUser()
        ]);
        
        if (modelData) {
          setModel(modelData);
        }
        setUserPoints(userData.points);
      } catch (error) {
        console.error('Failed to load model data:', error);
        setMessage({ type: 'error', text: '加载模型数据失败' });
      } finally {
        setIsLoading(false);
      }
    }
    
    if (modelId) {
      loadData();
    }
  }, [modelId]);
  
  // 处理二次创作
  const handleRecreation = async () => {
    if (!model) return;
    
    try {
      setIsProcessing(true);
      const result = await performRecreation(model.id);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        // 更新用户积分
        const userData = await getCurrentUser();
        setUserPoints(userData.points);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('Failed to recreate model:', error);
      setMessage({ type: 'error', text: '二次创作过程中发生错误' });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // 显示星级评分
  const StarRating = ({ rating, modelId }: { rating: number; modelId: string }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {/* 满星 */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg 
            key={`star-${modelId}-position-${i+1}`}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 text-yellow-500"
            aria-hidden="true"
          >
            <title>满星</title>
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        ))}
        
        {/* 半星 */}
        {halfStar && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 text-yellow-500"
            aria-hidden="true"
          >
            <title>半星</title>
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        )}
        
        {/* 空星 */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg 
            key={`star-${modelId}-position-${fullStars + (halfStar ? 1 : 0) + i+1}`}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-5 h-5 text-gray-300"
            aria-hidden="true"
          >
            <title>空星</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        ))}
      </div>
    );
  };
  
  // 格式化日期
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // 加载中状态
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }
  
  // 没有找到模型
  if (!model) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-bold mb-4">找不到模型</h1>
        <p className="text-muted-foreground mb-6">无法找到ID为 {modelId} 的模型</p>
        <Link href="/dashboard/model-marketplace">
          <Button>返回模型市场</Button>
        </Link>
      </div>
    );
  }
  
  // 计算作者奖励
  const authorReward = calculateAuthorReward(model.pointsPrice);
  
  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* 顶部导航和信息 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/dashboard/model-marketplace" className="hover:text-foreground">
            模型市场
          </Link>
          <span>&gt;</span>
          <span className="font-medium text-foreground">{model.name}</span>
        </div>
        
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold">{model.name}</h1>
          <PointsDisplay points={userPoints} />
        </div>
      </div>
      
      {/* 消息提示 */}
      {message && (
        <div 
          className={`mb-6 p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}
      
      {/* 主要内容 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧列 - 图片 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg overflow-hidden border bg-muted aspect-square relative">
            {model.thumbnailUrl ? (
              <Image 
                src={model.thumbnailUrl} 
                alt={model.name}
                fill={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
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
                  className="h-24 w-24 text-muted-foreground/50"
                  aria-hidden="true"
                >
                  <title>无图像</title>
                  <path d="M2 12.5c1.5-2.5 3.5-3.5 5-3.5.8 0 1.6.3 2.1.8 1.4 1.3 1.9 4.2 4.4 4.2.7 0 2-.2 3.5-1.2M18 12v7M18 9h.01" />
                </svg>
              </div>
            )}
          </div>
          
          {/* 3D预览 */}
          <div className="rounded-lg overflow-hidden border">
            <div className="p-3 border-b bg-muted/50">
              <h2 className="font-semibold">3D预览</h2>
            </div>
            <div className="h-80 w-full">
              <Canvas style={{ background: '#f5f5f5' }}>
                <PerspectiveCamera makeDefault position={[3, 3, 3]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <SimpleBox />
                <gridHelper args={[10, 10, "#888888", "#dddddd"]} />
                <OrbitControls 
                  minPolarAngle={Math.PI/6} 
                  maxPolarAngle={Math.PI/2} 
                  enableZoom={true}
                  enablePan={true}
                />
                <Environment preset="sunset" />
              </Canvas>
            </div>
          </div>
        </div>
        
        {/* 右侧列 - 信息 */}
        <div className="space-y-6">
          {/* 详细信息卡片 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg mb-4">模型详情</h2>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">价格:</span>
                <span className="font-bold">{model.pointsPrice} 积分</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">作者:</span>
                <span>{model.authorName}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">评分:</span>
                <div className="flex items-center gap-2">
                  <StarRating rating={model.rating} modelId={model.id} />
                  <span>({model.rating})</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">下载次数:</span>
                <span>{model.downloads}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">创建日期:</span>
                <span>{formatDate(model.createdAt)}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">类型:</span>
                <span>{model.type === '3d_model' ? '3D模型' : '纹理'}</span>
              </div>
              
              <div className="mt-4">
                <span className="text-muted-foreground block mb-2">标签:</span>
                <div className="flex flex-wrap gap-2">
                  {model.tags.map(tag => (
                    <Badge key={`tag-${tag}`} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <Button 
                className="w-full mb-2" 
                disabled={isProcessing}
                onClick={() => setShowConfirmDialog(true)}
              >
                二次创作
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                disabled={isProcessing}
              >
                下载模型
              </Button>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>• 二次创作将基于此模型进行自定义</p>
                <p>• 二次创作需要消耗积分</p>
                <p>• 原作者将获得积分奖励</p>
              </div>
            </div>
          </div>
          
          {/* 模型描述 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">模型描述</h2>
              <p className="text-muted-foreground">
                这是一个高质量的{model.name}模型，适合用于游戏和虚拟现实项目。模型包含详细的几何体和纹理，可以直接导入到大多数3D软件和游戏引擎中。
              </p>
            </div>
          </div>
          
          {/* 创作者信息 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-4">关于创作者</h2>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">
                    {model.authorName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{model.authorName}</h3>
                  <p className="text-sm text-muted-foreground">模型创作者</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 确认对话框 */}
      <CreateConfirmation
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        modelName={model.name}
        pointsRequired={model.pointsPrice}
        userPoints={userPoints}
        authorReward={authorReward}
        onConfirm={handleRecreation}
      />
    </div>
  );
} 