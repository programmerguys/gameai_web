"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { 
  vscDarkPlus, 
  vs
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  generateUnityCodeExample, 
  type NPC,
} from '@/lib/npc';
import { Download, Copy, Check, Code, FileCode, GitFork, Moon, Sun } from 'lucide-react';

interface CodeExampleProps {
  npc: NPC;
}

export function CodeExample({ npc }: CodeExampleProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [engineOption, setEngineOption] = useState<'unity' | 'unreal' | 'godot'>('unity');
  const [languageOption, setLanguageOption] = useState<'csharp' | 'cpp' | 'python'>('csharp');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  
  // 复制代码示例
  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error('无法复制代码:', err);
    }
  };
  
  // 生成Unity代码示例
  const unityCode = generateUnityCodeExample(npc);
  
  // 模拟下载SDK包
  const downloadSDK = () => {
    alert('SDK包下载功能将在正式版本中启用');
    // 实际实现会调用API下载SDK包
  };

  // 获取当前选择的代码示例
  const getCurrentCodeExample = () => {
    if (engineOption === 'unity') {
      return unityCode;
    }
    
    // 未实现的引擎返回占位信息
    return `// ${engineOption.toUpperCase()} SDK集成示例正在开发中...\n// 敬请期待!`;
  };

  // 获取当前语言的语法高亮语言标识符
  const getSyntaxLanguage = () => {
    if (engineOption === 'unity') return 'csharp';
    if (engineOption === 'unreal') return 'cpp';
    if (engineOption === 'godot') return 'python';
    return 'csharp';
  };
  
  // 切换高亮主题
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className="space-y-4">
      <div className="bg-card p-4 rounded-lg border shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center mb-4">
          <div>
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Code className="h-5 w-5 text-purple-500" />
              <span>代码示例生成器</span>
            </h3>
            <p className="text-sm text-muted-foreground">NPC ID: {npc.id}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select
              value={engineOption}
              onValueChange={(value) => setEngineOption(value as 'unity' | 'unreal' | 'godot')}
            >
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="选择引擎" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unity">Unity</SelectItem>
                <SelectItem value="unreal">Unreal</SelectItem>
                <SelectItem value="godot">Godot</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={languageOption}
              onValueChange={(value) => setLanguageOption(value as 'csharp' | 'cpp' | 'python')}
              disabled={engineOption !== 'unity'}
            >
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="选择语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="h-9" onClick={downloadSDK}>
              <Download className="mr-2 h-4 w-4" />
              下载SDK包
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute right-2 top-2 flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-8 w-8 p-0"
              title={isDarkTheme ? "切换浅色主题" : "切换深色主题"}
            >
              {isDarkTheme ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">切换主题</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(getCurrentCodeExample())}
              className="h-8 flex items-center space-x-1 text-xs"
            >
              {copyStatus === 'copied' ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span>已复制!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>复制代码</span>
                </>
              )}
            </Button>
          </div>
          
          <div className="bg-muted/50 rounded-md overflow-hidden">
            <div className="bg-muted px-4 py-2 text-xs font-medium flex items-center">
              <FileCode className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                {engineOption === 'unity' ? `${npc.name.replace(/\s+/g, '')}Controller.cs` : 
                 engineOption === 'unreal' ? `${npc.name.replace(/\s+/g, '')}Controller.h` :
                 `${npc.name.replace(/\s+/g, '')}Controller.gd`}
              </span>
            </div>
            <div className="overflow-auto max-h-[400px]">
              <SyntaxHighlighter
                language={getSyntaxLanguage()}
                style={isDarkTheme ? vscDarkPlus : vs}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  fontSize: '0.875rem',
                  backgroundColor: isDarkTheme ? '#1E1E1E' : '#FFFFFF',
                  borderRadius: '0 0 0.375rem 0.375rem'
                }}
                lineNumberStyle={{
                  opacity: 0.5,
                  minWidth: '2.5em',
                  paddingRight: '1em',
                  textAlign: 'right',
                  userSelect: 'none'
                }}
              >
                {getCurrentCodeExample()}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-muted/30 p-4 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <GitFork className="h-4 w-4 text-purple-500" />
            <h4 className="text-sm font-medium">快速集成指南</h4>
          </div>
          <ol className="text-sm text-muted-foreground list-decimal pl-5 space-y-1">
            <li>将<span className="font-mono text-xs bg-muted p-1 rounded">GameAI SDK</span>包导入到您的{engineOption === 'unity' ? 'Unity' : engineOption === 'unreal' ? 'Unreal Engine' : 'Godot'}项目中</li>
            <li>创建一个新的{engineOption === 'unity' ? 'C#脚本' : engineOption === 'unreal' ? 'C++类' : 'GDScript脚本'}，命名为<code className="text-xs bg-muted p-1 rounded">{npc.name.replace(/\s+/g, '')}Controller{engineOption === 'unity' ? '.cs' : engineOption === 'unreal' ? '.h/.cpp' : '.gd'}</code></li>
            <li>将上面的代码复制到脚本中</li>
            <li>将脚本挂载到游戏场景中的NPC对象上</li>
            <li>配置脚本中的引用</li>
            <li>根据注释修改实现各个动作方法</li>
          </ol>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">前置要求</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 下载并导入GameAI SDK</li>
              <li>• 配置API密钥和游戏ID</li>
              <li>• 设置基本UI组件</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">GameAI Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              确保场景中有GameAI Manager组件，用于全局管理SDK和AI NPC。
            </p>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <Button variant="outline" size="sm" className="w-full text-xs" onClick={downloadSDK}>
              获取Manager示例
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">NPC预制体</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              使用SDK提供的AI NPC预制体可快速集成，无需手动编写代码。
            </p>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <Button variant="outline" size="sm" className="w-full text-xs" onClick={downloadSDK}>
              获取预制体
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 