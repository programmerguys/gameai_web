'use client';

import React from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatTestPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">对话测试</h1>
        <p className="text-muted-foreground mt-1">
          与NPC进行对话测试，体验AI对话的交互效果
        </p>
      </div>
      
      <ChatInterface />
    </div>
  );
} 