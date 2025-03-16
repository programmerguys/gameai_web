'use client';

import { useState, useMemo } from 'react';
import type { GameKnowledgeProps, TreeNode, Game, KnowledgeCategory, KnowledgeItem } from './types';
import { GameKnowledgeTree } from './GameKnowledgeTree';
import { KnowledgeDetail } from './KnowledgeDetail';
import { SearchBar } from './SearchBar';
import { TagCloud } from './TagCloud';
import { ImportExport } from './ImportExport';
import { buildTreeData } from './demo-data';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Tag, TagsIcon, Search, X } from 'lucide-react';

export function GameKnowledge({ initialGames, readOnly = false }: GameKnowledgeProps) {
  // 状态管理
  const [treeData, setTreeData] = useState<TreeNode[]>(() => {
    // 如果有初始数据，使用初始数据；否则使用示例数据
    if (initialGames && initialGames.length > 0) {
      // 这里需要根据initialGames构建树状结构
      // 暂时留空，实际项目中需要根据API返回的数据构建
      return [];
    }
    return buildTreeData();
  });
  
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [searchResults, setSearchResults] = useState<TreeNode[] | null>(null);
  const [activeTab, setActiveTab] = useState<'tree' | 'tags'>('tree');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  
  // 提取所有标签
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    
    const extractTags = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (node.type === 'item' && node.data && 'tags' in node.data) {
          for (const tag of node.data.tags) {
            tags.add(tag);
          }
        }
        
        if (node.children && node.children.length > 0) {
          extractTags(node.children);
        }
      }
    };
    
    extractTags(treeData);
    return Array.from(tags).sort();
  }, [treeData]);
  
  // 处理选择节点
  const handleSelectNode = (node: TreeNode) => {
    setSelectedNode(node);
  };
  
  // 添加新节点
  const handleAddNode = (parentId: string, type: 'game' | 'category' | 'item') => {
    const now = new Date().toISOString();
    
    // 根据类型创建不同的新节点
    let newNode: TreeNode;
    let parentNode: TreeNode | undefined;
    
    // 查找父节点
    const findParentAndAddChild = (nodes: TreeNode[], parentId: string): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.id === parentId) {
          parentNode = node;
          return true;
        }
        if (node.children && findParentAndAddChild(node.children, parentId)) {
          return true;
        }
      }
      return false;
    };
    
    findParentAndAddChild(treeData, parentId);
    
    if (type === 'game') {
      // 创建新游戏
      const newId = uuidv4();
      newNode = {
        id: newId,
        name: '新游戏',
        type: 'game',
        children: [],
        data: {
          id: newId,
          name: '新游戏',
          description: '请在这里添加游戏描述',
          createdAt: now,
          updatedAt: now
        }
      };
      
      // 添加到根节点
      setTreeData([...treeData, newNode]);
      setSelectedNode(newNode);
      return;
    }
    
    if (!parentNode) return;
    
    if (type === 'category') {
      // 确保父节点是游戏
      if (parentNode.type !== 'game') return;
      
      // 创建新分类
      const newId = uuidv4();
      const gameId = parentNode.id;
      
      newNode = {
        id: newId,
        name: '新分类',
        type: 'category',
        parentId: gameId,
        children: [],
        data: {
          id: newId,
          gameId,
          name: '新分类',
          description: '请在这里添加分类描述',
          itemCount: 0,
          createdAt: now,
          updatedAt: now
        }
      };
    } else if (type === 'item') {
      // 确保父节点是分类
      if (parentNode.type !== 'category') return;
      
      // 创建新条目
      const newId = uuidv4();
      const categoryId = parentNode.id;
      const gameId = parentNode.parentId || '';
      
      newNode = {
        id: newId,
        name: '新条目',
        type: 'item',
        parentId: categoryId,
        data: {
          id: newId,
          categoryId,
          gameId,
          title: '新条目',
          content: '请在这里添加内容',
          tags: [],
          createdAt: now,
          updatedAt: now
        }
      };
    } else {
      return;
    }
    
    // 递归更新树结构
    const updateTreeData = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map(node => {
        if (node.id === parentId) {
          // 添加子节点
          const children = node.children || [];
          return {
            ...node,
            children: [...children, newNode]
          };
        }
        
        if (node.children) {
          return {
            ...node,
            children: updateTreeData(node.children)
          };
        }
        
        return node;
      });
    };
    
    setTreeData(updateTreeData(treeData));
    setSelectedNode(newNode);
  };
  
  // 删除节点
  const handleDeleteNode = (nodeId: string) => {
    // 递归删除节点
    const deleteNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.filter(node => {
        if (node.id === nodeId) {
          // 如果选中的是当前节点，清除选择
          if (selectedNode && selectedNode.id === nodeId) {
            setSelectedNode(null);
          }
          return false;
        }
        
        if (node.children) {
          node.children = deleteNode(node.children);
        }
        
        return true;
      });
    };
    
    setTreeData(deleteNode(treeData));
  };
  
  // 保存节点数据
  const handleSaveNodeData = (newData: Game | KnowledgeCategory | KnowledgeItem) => {
    if (!selectedNode) return;
    
    const now = new Date().toISOString();
    
    // 更新节点数据
    const updateNodeData = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map(node => {
        if (node.id === selectedNode.id) {
          // 更新节点数据
          const updatedData = {
            ...newData,
            updatedAt: now
          };
          
          // 如果是分类，更新name属性
          const updatedNode: TreeNode = {
            ...node,
            data: updatedData
          };
          
          // 更新显示名称
          if (node.type === 'game' || node.type === 'category') {
            updatedNode.name = (newData as Game | KnowledgeCategory).name;
          } else if (node.type === 'item') {
            updatedNode.name = (newData as KnowledgeItem).title;
          }
          
          // 更新选中的节点
          setSelectedNode(updatedNode);
          return updatedNode;
        }
        
        if (node.children) {
          return {
            ...node,
            children: updateNodeData(node.children)
          };
        }
        
        return node;
      });
    };
    
    setTreeData(updateNodeData(treeData));
  };
  
  // 处理搜索结果
  const handleSearchResult = (results: TreeNode[]) => {
    setSearchResults(results);
    
    // 如果有结果，自动选择第一个结果
    if (results.length > 0) {
      setSelectedNode(results[0]);
    } else {
      setSelectedNode(null);
    }
  };
  
  // 清除搜索结果
  const handleClearSearch = () => {
    setSearchResults(null);
  };
  
  // 处理标签点击
  const handleTagClick = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(updatedTags);
    
    // 如果有选择标签，筛选结果
    if (updatedTags.length > 0) {
      const results: TreeNode[] = [];
      
      const findNodesByTags = (nodes: TreeNode[]) => {
        for (const node of nodes) {
          if (node.type === 'item' && node.data && 'tags' in node.data) {
            if (
													updatedTags.every((tag) =>
														(node.data as KnowledgeItem).tags.includes(tag),
													)
												) {
													results.push(node);
												}
          }
          
          if (node.children) {
            findNodesByTags(node.children);
          }
        }
      };
      
      findNodesByTags(treeData);
      setSearchResults(results);
      
      // 如果有结果，自动选择第一个结果
      if (results.length > 0) {
        setSelectedNode(results[0]);
      }
    } else {
      setSearchResults(null);
    }
  };
  
  // 处理导入数据
  const handleImport = (importedData: TreeNode[]) => {
    setTreeData(prev => [...prev, ...importedData]);
  };
  
  // 显示的节点列表，如果有搜索结果则显示搜索结果，否则显示完整树
  const displayNodes = searchResults || treeData;
  
  return (
			<div className="flex h-full w-full bg-white">
				{/* 左侧导航区域 */}
				<div className="w-1/4 border-r overflow-hidden flex flex-col">
					{/* 工具栏 */}
					<div className="p-4 border-b flex justify-between items-center">
						<div className="flex space-x-2">
							<Button
								variant={activeTab === "tree" ? "default" : "outline"}
								size="sm"
								onClick={() => setActiveTab("tree")}
								className="h-8"
							>
								<TagsIcon className="h-4 w-4 mr-1" />
								树状视图
							</Button>
							<Button
								variant={activeTab === "tags" ? "default" : "outline"}
								size="sm"
								onClick={() => setActiveTab("tags")}
								className="h-8"
							>
								<Tag className="h-4 w-4 mr-1" />
								标签云
							</Button>
						</div>

						<div className="flex space-x-2">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setShowSearch(!showSearch)}
								className="h-8 w-8 p-0"
							>
								<Search className="h-4 w-4" />
							</Button>
							<ImportExport treeData={treeData} onImport={handleImport} />
						</div>
					</div>

					{/* 搜索区域 */}
					{showSearch && (
						<div className="p-3">
							<SearchBar
								nodes={treeData}
								allTags={allTags}
								onSearchResult={handleSearchResult}
								onClearSearch={handleClearSearch}
							/>
						</div>
					)}

					{/* 导航内容 */}
					<div className="flex-1 overflow-auto">
						{activeTab === "tree" ? (
							<div className="p-3">
								<GameKnowledgeTree
									nodes={displayNodes}
									selectedNode={selectedNode}
									onSelectNode={handleSelectNode}
									onAddNode={!readOnly ? handleAddNode : undefined}
									onDeleteNode={!readOnly ? handleDeleteNode : undefined}
									readOnly={readOnly}
								/>
							</div>
						) : (
							<div className="p-4">
								<h3 className="font-medium text-sm mb-3">
									全部标签({allTags.length})
								</h3>
								<TagCloud
									nodes={treeData}
									selectedTags={selectedTags}
									onTagClick={handleTagClick}
								/>

								{selectedTags.length > 0 && (
									<div className="mt-4">
										<div className="flex justify-between items-center mb-2">
											<h3 className="font-medium text-sm">已选标签</h3>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setSelectedTags([])}
												className="h-6 text-xs"
											>
												清除
											</Button>
										</div>
										<div className="flex flex-wrap gap-1">
											{selectedTags.map((tag) => (
												<div
													key={tag}
													className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs flex items-center"
												>
													{tag}
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleTagClick(tag)}
														className="h-5 w-5 p-0 ml-1 text-primary-foreground"
													>
														<X className="h-3 w-3" />
													</Button>
												</div>
											))}
										</div>

										{searchResults && (
											<div className="mt-3 text-sm text-gray-500">
												找到 {searchResults.length} 条匹配内容
											</div>
										)}

										{searchResults && searchResults.length > 0 && (
											<div className="mt-3 space-y-1">
												{searchResults.map((node) => (
													<div
														key={node.id}
														className={`p-2 rounded-md cursor-pointer text-sm ${
															selectedNode?.id === node.id
																? "bg-primary/10 text-primary"
																: "hover:bg-gray-100"
														}`}
														onClick={() => setSelectedNode(node)}
														onKeyDown={(e) => {
															if (e.key === "Enter" || e.key === " ") {
																e.preventDefault();
																setSelectedNode(node);
															}
														}}
													>
														{node.name}
													</div>
												))}
											</div>
										)}
									</div>
								)}
							</div>
						)}
					</div>
				</div>

				{/* 右侧详情面板 */}
				<div className="w-3/4 overflow-auto">
					<KnowledgeDetail
						node={selectedNode}
						onSave={!readOnly ? handleSaveNodeData : undefined}
						onDelete={
							!readOnly
								? () => selectedNode && handleDeleteNode(selectedNode.id)
								: undefined
						}
						readOnly={readOnly}
					/>
				</div>
			</div>
		);
}