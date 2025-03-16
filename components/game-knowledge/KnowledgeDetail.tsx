'use client';

import { useState, useEffect } from 'react';
import type { KnowledgeDetailProps, Game, KnowledgeCategory, KnowledgeItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, ArrowLeft, X, Plus, Calendar } from 'lucide-react';

export function KnowledgeDetail({
  node,
  onSave,
  onDelete,
  readOnly = false
}: KnowledgeDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Game | KnowledgeCategory | KnowledgeItem | null>(null);
  const [newTag, setNewTag] = useState('');
  
  // 当节点变化时重置状态
  // biome-ignore lint/correctness/useExhaustiveDependencies: 当node变化时需要重置状态
  useEffect(() => {
    setIsEditing(false);
    setEditedData(null);
    setNewTag('');
  }, [node]);
  
  // 开始编辑
  const handleStartEdit = () => {
    if (node?.data) {
      setEditedData({ ...node.data });
      setIsEditing(true);
    }
  };
  
  // 保存编辑
  const handleSave = () => {
    if (onSave && editedData) {
      onSave(editedData);
      setIsEditing(false);
    }
  };
  
  // 取消编辑
  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(null);
  };
  
  // 添加标签
  const handleAddTag = () => {
    if (newTag.trim() && editedData && 'tags' in editedData) {
      setEditedData({
        ...editedData,
        tags: [...(editedData.tags || []), newTag.trim()]
      });
      setNewTag('');
    }
  };
  
  // 删除标签
  const handleRemoveTag = (tagToRemove: string) => {
    if (editedData && 'tags' in editedData) {
      setEditedData({
        ...editedData,
        tags: editedData.tags.filter((tag: string) => tag !== tagToRemove)
      });
    }
  };
  
  // 处理输入变化
  const handleInputChange = (field: string, value: string) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [field]: value
      });
    }
  };
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return dateString;
    }
  };
  
  // 如果没有选中节点，显示空状态
  if (!node) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 p-6">
        <div className="mb-4 text-6xl">📚</div>
        <h3 className="text-xl font-medium mb-2">游戏知识库</h3>
        <p className="text-center mb-6">
          在左侧选择一个游戏或知识分类来查看详细信息
        </p>
      </div>
    );
  }
  
  // 根据节点类型渲染不同的详情界面
  switch (node.type) {
    case 'game': {
      const game = node.data as Game;
      const gameData = editedData as Game | null;
      return (
        <div className="h-full flex flex-col">
          {/* 标题栏 */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">{game.name}</h2>
            {!readOnly && (
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-1" />
                      取消
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-1" />
                      保存
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={handleStartEdit}>
                    <Edit className="h-4 w-4 mr-1" />
                    编辑
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* 内容区域 */}
          <div className="flex-1 overflow-auto p-4">
            {isEditing && gameData ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="game-name">游戏名称</Label>
                  <Input
                    id="game-name"
                    value={gameData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="game-description">游戏描述</Label>
                  <Textarea
                    id="game-description"
                    value={gameData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={5}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">{game.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>创建于: {formatDate(game.createdAt)}</span>
                  <span className="mx-2">•</span>
                  <span>更新于: {formatDate(game.updatedAt)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
      
    case 'category': {
      const category = node.data as KnowledgeCategory;
      const categoryData = editedData as KnowledgeCategory | null;
      return (
        <div className="h-full flex flex-col">
          {/* 标题栏 */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-2 h-8 w-8 p-0"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-bold">{category.name}</h2>
            </div>
            {!readOnly && (
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-1" />
                      取消
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-1" />
                      保存
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={handleStartEdit}>
                    <Edit className="h-4 w-4 mr-1" />
                    编辑
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* 内容区域 */}
          <div className="flex-1 overflow-auto p-4">
            {isEditing && categoryData ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category-name">分类名称</Label>
                  <Input
                    id="category-name"
                    value={categoryData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="category-description">分类描述</Label>
                  <Textarea
                    id="category-description"
                    value={categoryData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="category-icon">图标名称</Label>
                  <Input
                    id="category-icon"
                    value={categoryData.icon || ''}
                    onChange={(e) => handleInputChange('icon', e.target.value)}
                    placeholder="Treasure, Swords, Shield, Map, Users, Building"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">{category.description}</p>
                <div>
                  <Badge variant="outline" className="mr-2">
                    {category.itemCount} 条目
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>创建于: {formatDate(category.createdAt)}</span>
                  <span className="mx-2">•</span>
                  <span>更新于: {formatDate(category.updatedAt)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
      
    case 'item': {
      const item = node.data as KnowledgeItem;
      const itemData = editedData as KnowledgeItem | null;
      return (
        <div className="h-full flex flex-col">
          {/* 标题栏 */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-2 h-8 w-8 p-0"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-bold">{item.title}</h2>
            </div>
            {!readOnly && onDelete && (
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-1" />
                      取消
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-1" />
                      保存
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={handleStartEdit}>
                    <Edit className="h-4 w-4 mr-1" />
                    编辑
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* 内容区域 */}
          <div className="flex-1 overflow-auto p-4">
            {isEditing && itemData ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="item-title">标题</Label>
                  <Input
                    id="item-title"
                    value={itemData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="item-content">内容</Label>
                  <Textarea
                    id="item-content"
                    value={itemData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={10}
                  />
                </div>
                <div>
                  <Label>标签</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {itemData.tags?.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="py-1">
                        {tag}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer" 
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="添加新标签"
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddTag}
                      disabled={!newTag.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="whitespace-pre-wrap">{item.content}</div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tags?.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>创建于: {formatDate(item.createdAt)}</span>
                  <span className="mx-2">•</span>
                  <span>更新于: {formatDate(item.updatedAt)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
      
    default:
      return (
        <div className="h-full flex items-center justify-center p-6">
          <p className="text-gray-500">未知节点类型</p>
        </div>
      );
  }
} 