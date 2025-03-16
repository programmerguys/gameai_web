'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileCode, ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeEditorTabsProps {
  code: string;
  language: string;
}

// 模拟的文件结构
interface FileNode {
  name: string;
  type: 'file' | 'folder';
  language?: string;
  content?: string;
  children?: FileNode[];
}

export function CodeEditorTabs({ code, language }: CodeEditorTabsProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));
  const [selectedFile, setSelectedFile] = useState<string>('PlayerController');
  
  // 创建模拟的文件树
  const getFileTree = (): FileNode[] => {
    return [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'PlayerController',
            type: 'file',
            language: language,
            content: code
          },
          {
            name: 'GameManager',
            type: 'file',
            language: language,
            content: `// GameManager.${language === 'csharp' ? 'cs' : language === 'cpp' ? 'h' : 'js'}\n\n// 这里是游戏管理器的代码示例`
          },
          {
            name: 'utils',
            type: 'folder',
            children: [
              {
                name: 'Helper',
                type: 'file',
                language: language,
                content: `// Helper.${language === 'csharp' ? 'cs' : language === 'cpp' ? 'h' : 'js'}\n\n// 这里是辅助工具类`
              }
            ]
          }
        ]
      },
      {
        name: 'assets',
        type: 'folder',
        children: [
          {
            name: 'Config',
            type: 'file',
            language: 'json',
            content: `{\n  "version": "1.0.0",\n  "settings": {\n    "debug": true\n  }\n}`
          }
        ]
      }
    ];
  };
  
  // 获取文件扩展名图标
  const getFileIcon = (fileName: string, fileLanguage: string = language) => {
    switch (fileLanguage) {
      case 'csharp':
        return <FileCode size={16} className="text-blue-500" />;
      case 'cpp':
        return <FileCode size={16} className="text-purple-500" />;
      case 'js':
        return <FileCode size={16} className="text-yellow-500" />;
      case 'json':
        return <FileCode size={16} className="text-green-500" />;
      default:
        return <File size={16} className="text-gray-500" />;
    }
  };
  
  // 切换文件夹展开/折叠状态
  const toggleFolder = (folderName: string) => {
    const newExpandedFolders = new Set(expandedFolders);
    if (newExpandedFolders.has(folderName)) {
      newExpandedFolders.delete(folderName);
    } else {
      newExpandedFolders.add(folderName);
    }
    setExpandedFolders(newExpandedFolders);
  };
  
  // 渲染文件树节点
  const renderFileTreeNode = (node: FileNode, path = '') => {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    
    if (node.type === 'folder') {
      const isExpanded = expandedFolders.has(node.name);
      return (
							<div key={currentPath}>
								<div
									className="flex items-center py-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
									onClick={() => toggleFolder(node.name)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											toggleFolder(node.name);
										}
									}}
								>
									{isExpanded ? (
										<ChevronDown size={16} className="mr-1 text-gray-500" />
									) : (
										<ChevronRight size={16} className="mr-1 text-gray-500" />
									)}
									<Folder size={16} className="mr-2 text-yellow-400" />
									<span className="text-sm">{node.name}</span>
								</div>
								{isExpanded && node.children && (
									<div className="pl-4 border-l border-dashed border-gray-300 dark:border-gray-700 ml-2">
										{node.children.map((child) =>
											renderFileTreeNode(child, currentPath),
										)}
									</div>
								)}
							</div>
						);
    }
      const fileExt =
							node.language === "csharp"
								? ".cs"
								: node.language === "cpp"
									? ".h"
									: ".js";
      const displayName = `${node.name}${fileExt}`;
      const isSelected = selectedFile === node.name;
      
      return (
							<div
								key={currentPath}
								className={cn(
									"flex items-center py-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer",
									isSelected && "bg-blue-100 dark:bg-blue-900",
								)}
								onClick={() => setSelectedFile(node.name)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										setSelectedFile(node.name);
									}
								}}
							>
								{getFileIcon(node.name, node.language)}
								<span className="text-sm ml-2">{displayName}</span>
							</div>
						);
  };
  
  // 根据语言生成示例文件名
  const getFileName = () => {
    const extension = language === 'csharp' ? '.cs' : language === 'cpp' ? '.h' : '.js';
    return `${selectedFile}${extension}`;
  };
  
  return (
    <div className="flex h-full">
      {/* 左侧文件树 */}
      <div className="w-60 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
        {getFileTree().map(node => renderFileTreeNode(node))}
      </div>
      
      {/* 右侧内容区 */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center px-4 py-2 bg-muted/30 border-b">
          <div className="flex items-center gap-1">
            <FileCode className="h-4 w-4" />
            <span className="font-medium">{getFileName()}</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto m-0 p-0">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={true}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
              height: '100%',
              backgroundColor: '#1E1E1E',
              borderRadius: 0
            }}
            lineNumberStyle={{
              opacity: 0.5,
              minWidth: '2.5em',
              paddingRight: '1em',
              textAlign: 'right',
              userSelect: 'none'
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
} 