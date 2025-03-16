'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// 消息类型定义
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// 组件属性定义
interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
}

export function ChatInterface({ onSendMessage }: ChatInterfaceProps) {
  // 状态变量
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome',
    content: '欢迎使用游戏代码生成器！请描述您想要实现的游戏功能，我会为您生成相应的Unity C#代码。\n\n例如：\n- "实现玩家角色移动控制"\n- "开发碰撞检测系统"\n- "设计游戏管理器单例"',
    sender: 'ai',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 自动滚动到最新消息
		useEffect(() => {
			if (messagesEndRef.current) {
				messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
			}
		}, []);
  
  // 发送消息处理
  const handleSendMessage = () => {
    if (!input.trim() || isLoading) return;
    
    // 用户消息
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    // 更新消息列表
    setMessages(prev => [...prev, userMessage]);
    
    // 清空输入框
    setInput('');
    
    // 设置加载状态
    setIsLoading(true);
    
    // 向父组件传递消息
    onSendMessage(input);
    
    // 模拟AI响应
    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: '正在为您生成代码...',
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      {/* 聊天头部 */}
      <div className="p-3 border-b bg-card flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">代码生成助手</div>
          <div className="text-xs text-muted-foreground">
            通过对话生成Unity游戏代码
          </div>
        </div>
      </div>
      
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id}
            className={cn(
              "flex items-start gap-2",
              message.sender === 'user' && "flex-row-reverse"
            )}
          >
            {/* 头像 */}
            <Avatar className="h-8 w-8 mt-0.5">
              <AvatarFallback className={cn(
                message.sender === 'user' ? "bg-blue-100 text-blue-600" : "bg-primary/10 text-primary"
              )}>
                {message.sender === 'user' ? "你" : "AI"}
              </AvatarFallback>
            </Avatar>
            
            {/* 消息气泡 */}
            <div className="max-w-[80%] flex flex-col">
              <div className={cn(
                "px-3 py-2 rounded-lg whitespace-pre-wrap",
                message.sender === 'user' ? 
                  "bg-primary text-primary-foreground rounded-tr-none" : 
                  "bg-muted rounded-tl-none"
              )}>
                {message.content}
              </div>
              
              {/* 时间戳 */}
              <span className={cn(
                "text-xs text-muted-foreground mt-1",
                message.sender === 'user' && "text-right"
              )}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* 输入区域 */}
      <div className="p-3 border-t bg-background">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="描述您想要实现的功能..."
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            {isLoading ? (
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 