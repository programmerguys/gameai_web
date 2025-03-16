'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { MessageSender } from './types';

interface ChatMessageProps {
  content: string;
  sender: MessageSender;
  timestamp: Date;
  npcName: string;
}

export function ChatMessage({ content, sender, timestamp, npcName }: ChatMessageProps) {
  // 系统消息使用居中样式
  if (sender === 'system') {
    return (
      <div className="flex flex-col items-center my-4">
        <div className="max-w-[80%] px-4 py-2 bg-muted/30 text-muted-foreground text-sm rounded-lg text-center">
          {content}
        </div>
      </div>
    );
  }

  // 用户和NPC消息
  const isUser = sender === 'user';
  
  return (
    <div className={cn(
      "flex items-start gap-2",
      isUser && "flex-row-reverse"
    )}>
      {/* 头像 */}
      <Avatar className="h-8 w-8 mt-0.5">
        <AvatarFallback className={cn(
          isUser ? "bg-blue-100 text-blue-600" : "bg-primary/10 text-primary"
        )}>
          {isUser ? "你" : npcName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      {/* 消息气泡 */}
      <div className="max-w-[80%] flex flex-col">
        <div className={cn(
          "px-3 py-2 rounded-lg",
          isUser ? 
            "bg-primary text-primary-foreground rounded-tr-none" : 
            "bg-muted rounded-tl-none"
        )}>
          <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        </div>
        
        {/* 时间戳 */}
        <span className={cn(
          "text-xs text-muted-foreground mt-1",
          isUser && "text-right"
        )}>
          {timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })}
        </span>
      </div>
    </div>
  );
} 