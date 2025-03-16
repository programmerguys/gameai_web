'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Tag } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { SearchBarProps, TreeNode, KnowledgeItem } from './types';

export function SearchBar({ nodes, allTags, onSearchResult, onClearSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchOptions, setSearchOptions] = useState({
    title: true,
    content: true,
    tags: true
  });
  
  // 当搜索条件变化时执行搜索
  useEffect(() => {
    if (searchTerm.trim() === '' && selectedTags.length === 0) {
      onClearSearch();
      return;
    }
    
    // 执行搜索
    const results = searchNodes(nodes, searchTerm, selectedTags, searchOptions);
    onSearchResult(results);
  }, [searchTerm, selectedTags, searchOptions, nodes, onSearchResult, onClearSearch]);
  
  // 搜索节点函数
  const searchNodes = (
    nodes: TreeNode[], 
    term: string, 
    tags: string[], 
    options: { title: boolean; content: boolean; tags: boolean }
  ): TreeNode[] => {
    const results: TreeNode[] = [];
    const lowerTerm = term.toLowerCase().trim();
    
    // 递归搜索节点及其子节点
    const searchInNodes = (nodeList: TreeNode[]) => {
      for (const node of nodeList) {
        let match = false;
        
        // 只搜索知识条目
        if (node.type === 'item' && node.data) {
          const itemData = node.data as KnowledgeItem;
          
          // 搜索标题
          if (options.title && lowerTerm && itemData.title.toLowerCase().includes(lowerTerm)) {
            match = true;
          }
          
          // 搜索内容
          if (!match && options.content && lowerTerm && itemData.content.toLowerCase().includes(lowerTerm)) {
            match = true;
          }
          
          // 搜索标签
          if (!match && options.tags && lowerTerm) {
            match = itemData.tags.some(tag => tag.toLowerCase().includes(lowerTerm));
          }
          
          // 按指定标签筛选
          if (tags.length > 0) {
            match = match && tags.every(tag => itemData.tags.includes(tag));
          }
          
          if (match) {
            results.push(node);
          }
        }
        
        // 递归搜索子节点
        if (node.children && node.children.length > 0) {
          searchInNodes(node.children);
        }
      }
    };
    
    searchInNodes(nodes);
    return results;
  };
  
  // 清除搜索
  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedTags([]);
    onClearSearch();
  };
  
  // 处理标签选择
  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="搜索知识条目..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          <Search className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Tag className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">搜索选项</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="search-title" 
                    checked={searchOptions.title}
                    onCheckedChange={(checked) => 
                      setSearchOptions(prev => ({ ...prev, title: !!checked }))
                    }
                  />
                  <Label htmlFor="search-title">搜索标题</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="search-content" 
                    checked={searchOptions.content}
                    onCheckedChange={(checked) => 
                      setSearchOptions(prev => ({ ...prev, content: !!checked }))
                    }
                  />
                  <Label htmlFor="search-content">搜索内容</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="search-tags" 
                    checked={searchOptions.tags}
                    onCheckedChange={(checked) => 
                      setSearchOptions(prev => ({ ...prev, tags: !!checked }))
                    }
                  />
                  <Label htmlFor="search-tags">搜索标签</Label>
                </div>
              </div>
              
              {allTags.length > 0 && (
                <>
                  <h4 className="font-medium text-sm">筛选标签</h4>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {allTags.map(tag => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tag-${tag}`} 
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagSelect(tag)}
                        />
                        <Label htmlFor={`tag-${tag}`} className="text-sm">
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>
        
        {(searchTerm || selectedTags.length > 0) && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleClearSearch}
          >
            清除
          </Button>
        )}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedTags.map(tag => (
            <div 
              key={tag} 
              className="bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 flex items-center"
            >
              {tag}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleTagSelect(tag)}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 