'use client';

import { useState, useRef } from 'react';
import { 
  Import, 
  FileUp, 
  Download, 
  FileText, 
  FileIcon, 
  FileJson, 
  X, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { v4 as uuidv4 } from 'uuid';
import type { 
  ImportExportProps, 
  TreeNode, 
  ImportProgress, 
  ImportError,
  Game,
  KnowledgeCategory,
  KnowledgeItem
} from './types';

export function ImportExport({ treeData, onImport }: ImportExportProps) {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importProgress, setImportProgress] = useState<ImportProgress | null>(null);
  const [importErrors, setImportErrors] = useState<ImportError[]>([]);
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchInputRef = useRef<HTMLInputElement>(null);
  
  // 导出知识库为JSON文件
  const handleExport = () => {
    const dataStr = JSON.stringify(treeData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileName = `game-knowledge-export-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };
  
  // 导入JSON文件
  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content) as TreeNode[];
        
        if (Array.isArray(importedData)) {
          onImport(importedData);
          setIsImportOpen(false);
        } else {
          throw new Error('导入的数据格式不正确');
        }
      } catch (error) {
        setImportErrors([{
          file: file.name,
          error: `解析 JSON 失败: ${(error as Error).message}`
        }]);
      }
    };
    
    reader.readAsText(file);
  };
  
  // 批量导入文件
  const handleBatchImport = async () => {
    if (batchFiles.length === 0) return;
    
    setImportProgress({
      total: batchFiles.length,
      processed: 0,
      success: 0,
      failed: 0
    });
    setImportErrors([]);
    
    const importedNodes: TreeNode[] = [];
    
    // 创建游戏节点
    const now = new Date().toISOString();
    const gameId = uuidv4();
    const game: Game = {
      id: gameId,
      name: '批量导入知识',
      description: `来自 ${batchFiles.length} 个文件的批量导入`,
      createdAt: now,
      updatedAt: now
    };
    
    // 创建分类节点
    const categoryId = uuidv4();
    const category: KnowledgeCategory = {
      id: categoryId,
      gameId,
      name: '批量导入分类',
      description: `导入时间: ${now}`,
      itemCount: 0,
      createdAt: now,
      updatedAt: now
    };
    
    // 创建树节点，确保所有属性都已初始化
    const gameNode: TreeNode = {
      id: gameId,
      name: game.name,
      type: 'game',
      children: [{
        id: categoryId,
        name: category.name,
        type: 'category',
        parentId: gameId,
        data: category,
        children: []
      }],
      data: game
    };
    
    const categoryChildren: TreeNode[] = [];
    
    // 处理所有批量文件
    for (let i = 0; i < batchFiles.length; i++) {
      const file = batchFiles[i];
      
      try {
        // 解析文件内容
        const content = await readFileContent(file);
        
        // 创建知识条目
        const itemId = uuidv4();
        const item: KnowledgeItem = {
          id: itemId,
          categoryId,
          gameId,
          title: file.name.replace(/\.[^/.]+$/, ''), // 使用文件名作为标题，移除扩展名
          content: content,
          tags: [getFileType(file.name)], // 使用文件类型作为标签
          createdAt: now,
          updatedAt: now
        };
        
        // 添加到分类节点的子节点中
        const itemNode: TreeNode = {
          id: itemId,
          name: item.title,
          type: 'item',
          parentId: categoryId,
          data: item
        };
        
        // 收集所有创建的子节点
        categoryChildren.push(itemNode);
        
        // 更新进度
        setImportProgress((prev) => prev ? {
          ...prev,
          processed: prev.processed + 1,
          success: prev.success + 1,
        } : null);
      } catch (error) {
        // 记录导入错误
        setImportErrors(prev => [...prev, {
          file: file.name,
          error: (error as Error).message
        }]);
        
        // 更新进度
        setImportProgress(prev => prev ? {
          ...prev,
          processed: prev.processed + 1,
          failed: prev.failed + 1
        } : null);
      }
    }
    
    // 将所有子节点添加到分类节点中
    if (gameNode.children && gameNode.children.length > 0) {
					// 确保children一定存在
					const categoryNode = gameNode.children[0];
					categoryNode.children = categoryChildren;

					// 更新分类中的条目数量
					if (categoryNode.data) {
						const categoryData = categoryNode.data as KnowledgeCategory;
						categoryData.itemCount = categoryChildren.length;
					}
				}
    
    // 将游戏节点添加到导入数据中
    importedNodes.push(gameNode);
    
    // 导入完成后调用onImport回调
    onImport(importedNodes);
  };
  
  // 读取文件内容
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      
      reader.onerror = () => {
        reject(new Error(`读取文件 ${file.name} 失败`));
      };
      
      // 根据文件类型读取
      if (file.type === 'application/pdf') {
        // 暂时直接返回未能读取PDF的提示
        // 如果需要实际读取PDF内容，需要集成PDF解析库，如pdf.js
        reject(new Error('暂不支持解析PDF文件内容，请转换为文本文件'));
      } else {
        reader.readAsText(file);
      }
    });
  };
  
  // 获取文件类型
  const getFileType = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    switch (ext) {
      case 'txt':
        return '文本文件';
      case 'pdf':
        return 'PDF文件';
      case 'json':
        return 'JSON文件';
      default:
        return ext ? `${ext}文件` : '未知类型';
    }
  };
  
  // 处理文件选择
  const handleBatchFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // 转换为数组并设置
    setBatchFiles(Array.from(files));
  };
  
  // 移除已选文件
  const handleRemoveFile = (index: number) => {
    setBatchFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // 重置导入状态
  const resetImportState = () => {
    setBatchFiles([]);
    setImportProgress(null);
    setImportErrors([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (batchInputRef.current) batchInputRef.current.value = '';
  };
  
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Import className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-fit p-2">
          <div className="flex flex-col space-y-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="justify-start"
                    onClick={handleExport}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    导出JSON
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  将知识库导出为 JSON 文件
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                  onClick={() => {
                    resetImportState();
                    setIsImportOpen(true);
                  }}
                >
                  <FileUp className="h-4 w-4 mr-2" />
                  导入数据
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>导入知识库数据</DialogTitle>
                  <DialogDescription>
                    你可以导入之前导出的 JSON 文件，或批量导入 TXT 等文本文件
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="json" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="json">导入 JSON</TabsTrigger>
                    <TabsTrigger value="batch">批量导入</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="json" className="py-4">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <FileJson className="h-12 w-12 text-gray-400" />
                      <p className="text-sm text-center text-gray-500">
                        选择之前导出的 JSON 文件导入到知识库
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={handleImportFile}
                      />
                      <Button 
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        选择 JSON 文件
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="batch" className="py-4">
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                          <FileText className="h-8 w-8 text-gray-400" />
                          <FileIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-center text-gray-500">
                          批量导入文本文件，每个文件将作为一条知识条目
                        </p>
                        <input
                          ref={batchInputRef}
                          type="file"
                          accept=".txt,.pdf"
                          multiple
                          className="hidden"
                          onChange={handleBatchFileSelect}
                        />
                        <Button 
                          variant="outline"
                          onClick={() => batchInputRef.current?.click()}
                        >
                          选择文件
                        </Button>
                      </div>
                      
                      {batchFiles.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">
                              已选择 {batchFiles.length} 个文件
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setBatchFiles([])}
                            >
                              清除
                            </Button>
                          </div>
                          
                          <div className="h-[150px] border rounded-md p-2 overflow-auto">
                            <div className="space-y-2">
                              {batchFiles.map((file, index) => (
                                <div 
                                  key={`${file.name}-${file.size}`} 
                                  className="flex items-center justify-between text-sm"
                                >
                                  <div className="flex items-center space-x-2 truncate">
                                    {file.type.includes('pdf') ? (
                                      <FileIcon className="h-4 w-4 text-red-500" />
                                    ) : (
                                      <FileText className="h-4 w-4 text-blue-500" />
                                    )}
                                    <span className="truncate max-w-[180px]">
                                      {file.name}
                                    </span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleRemoveFile(index)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {importProgress && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>导入进度</span>
                            <span>
                              {importProgress.processed}/{importProgress.total}
                            </span>
                          </div>
                          <Progress 
                            value={(importProgress.processed / importProgress.total) * 100} 
                            className="h-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>
                              成功: {importProgress.success}
                            </span>
                            <span>
                              失败: {importProgress.failed}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {importErrors.length > 0 && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            {importErrors.length} 个文件导入失败
                          </AlertDescription>
                          <div className="h-[80px] mt-2 overflow-auto">
                            <div className="space-y-1 text-xs">
                              {importErrors.map((error) => (
                                <div key={`${error.file}-${error.error}`}>
                                  <span className="font-medium">{error.file}:</span> {error.error}
                                </div>
                              ))}
                            </div>
                          </div>
                        </Alert>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <DialogFooter>
                  <Button
                    variant="ghost"
                    onClick={() => setIsImportOpen(false)}
                  >
                    取消
                  </Button>
                  
                  {batchFiles.length > 0 && (
                    <Button
                      onClick={handleBatchImport}
                      disabled={importProgress !== null}
                    >
                      {importProgress ? (
                        <>处理中...</>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          导入 {batchFiles.length} 个文件
                        </>
                      )}
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
} 