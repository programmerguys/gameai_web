'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Send } from 'lucide-react';
import Image from 'next/image';
import { ChatMessage } from './ChatMessage';
import { NPCSelectDialog } from './NPCSelectDialog';
import { getNPCs } from '@/lib/npc';
import type { Message, ChatSession, NPC } from './types';
import { getAllExampleSessions } from '@/lib/conversations/adapter';

export function ChatInterface() {
  // 状态变量
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNPCDialog, setShowNPCDialog] = useState(false);
  const [availableNPCs, setAvailableNPCs] = useState<NPC[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 加载NPC列表和示例会话
  useEffect(() => {
    const loadNPCs = async () => {
      try {
        const npcs = await getNPCs({ status: 'active' });
        setAvailableNPCs(npcs);
      } catch (error) {
        console.error('加载NPC失败:', error);
      }
    };
    
    // 加载示例对话作为初始会话列表
    const exampleSessions = getAllExampleSessions();
    setSessions(exampleSessions);
    
    // 如果有示例会话，选择第一个作为当前会话
    if (exampleSessions.length > 0) {
      setCurrentSession(exampleSessions[0]);
    }
    
    loadNPCs();
  }, []);

  // 自动滚动到最新消息
  useEffect(() => {
    if (messagesEndRef.current && currentSession?.messages?.length) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSession?.messages?.length]);

  // 创建新会话
  const createNewSession = (npc: NPC) => {
    const newSession: ChatSession = {
      id: `session_${Date.now()}`,
      npc,
      messages: [{
        id: `msg_${Date.now()}`,
        content: `你好，我是${npc.name}。${npc.description}`,
        sender: 'npc',
        timestamp: new Date()
      }],
      createdAt: new Date(),
      lastMessageAt: new Date()
    };
    
    setSessions(prev => [newSession, ...prev]);
    setCurrentSession(newSession);
    setShowNPCDialog(false);
  };

  // 发送消息
  const sendMessage = async () => {
    if (!message.trim() || !currentSession) return;
    
    // 创建用户消息
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      content: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    // 更新当前会话
    const updatedSession: ChatSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      lastMessageAt: new Date()
    };
    
    // 更新状态
    setCurrentSession(updatedSession);
    setSessions(prev => 
      prev.map(session => 
        session.id === currentSession.id ? updatedSession : session
      )
    );
    
    // 清空输入框
    setMessage('');
    
    // 模拟NPC回复
    setIsLoading(true);
    
    try {
      // 这里可以接入实际的NPC回复逻辑
      // 目前使用简单的模拟回复
      setTimeout(() => {
        const npcMessage: Message = {
          id: `msg_${Date.now()}`,
          content: `这是${currentSession.npc.name}的回复。`,
          sender: 'npc',
          timestamp: new Date()
        };
        
        const finalSession: ChatSession = {
          ...updatedSession,
          messages: [...updatedSession.messages, npcMessage],
          lastMessageAt: new Date()
        };
        
        setCurrentSession(finalSession);
        setSessions(prev => 
          prev.map(session => 
            session.id === currentSession.id ? finalSession : session
          )
        );
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('NPC回复失败:', error);
      setIsLoading(false);
    }
  };

  // 选择会话
  const selectSession = (session: ChatSession) => {
    setCurrentSession(session);
  };

  // 处理按键事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 渲染消息内容（支持文本和图片）
  const renderMessageContent = (msg: Message & { imageUrl?: string }) => {
    // 检查是否为图片消息
    const isImageMessage = 'imageUrl' in msg && !!msg.imageUrl;
    
    if (isImageMessage && msg.imageUrl) {
      return (
        <>
          {/* 显示消息文本内容 */}
          <ChatMessage
            content={msg.content}
            sender={msg.sender}
            timestamp={msg.timestamp}
            npcName={currentSession?.npc.name || ''}
          />
          
          {/* 显示图片 */}
          <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} my-2`}>
            <div className={`${msg.sender === 'user' ? 'mr-4' : 'ml-4'}`} style={{ maxWidth: '80%' }}>
              <div className="w-full" style={{ maxWidth: '600px' }}>
                <Image 
                  src={msg.imageUrl} 
                  alt="消息图片" 
                  width={600}
                  height={400}
                  className="rounded-lg border shadow-sm" 
                  style={{ 
                    maxHeight: '500px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                  unoptimized={msg.imageUrl.startsWith('http')}
                  priority={msg.imageUrl.startsWith('/images/')}
                />
              </div>
              <span className="text-xs text-muted-foreground block mt-1 text-right">
                {msg.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </span>
            </div>
          </div>
        </>
      );
    }
    
    // 普通文本消息
    return (
      <ChatMessage
        content={msg.content}
        sender={msg.sender}
        timestamp={msg.timestamp}
        npcName={currentSession?.npc.name || ''}
      />
    );
  };

  return (
    <div className="grid grid-cols-5 gap-6 h-[calc(100vh-13rem)]">
      {/* 左侧会话列表 */}
      <div className="col-span-1 border rounded-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b bg-card">
          <Button 
            onClick={() => setShowNPCDialog(true)} 
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            新建会话
          </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          {sessions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              暂无会话记录
            </div>
          ) : (
            <div className="divide-y">
              {sessions.map(session => (
                <button 
                  key={session.id}
                  type="button"
                  className={`p-3 w-full text-left cursor-pointer hover:bg-accent/50 ${
                    currentSession?.id === session.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => selectSession(session)}
                  aria-pressed={currentSession?.id === session.id}
                >
                  <h3 className="font-medium truncate">{session.npc.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {session.messages[session.messages.length - 1]?.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(session.lastMessageAt).toLocaleTimeString()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* 右侧聊天窗口 */}
      <div className="col-span-4 border rounded-lg overflow-hidden flex flex-col">
        {currentSession ? (
          <>
            {/* 聊天头部 */}
            <div className="p-4 border-b bg-card">
              <h2 className="font-semibold">{currentSession.npc.name}</h2>
              <p className="text-sm text-muted-foreground">{currentSession.npc.description}</p>
            </div>
            
            {/* 消息列表 */}
            <div className="flex-grow overflow-y-auto p-4">
              <div className="space-y-4">
                {currentSession.messages.map(msg => (
                  <div key={msg.id}>
                    {renderMessageContent(msg as Message & { imageUrl?: string })}
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </div>
            
            {/* 输入区域 */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入消息..."
                  className="min-h-[60px]"
                  disabled={isLoading}
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!message.trim() || isLoading}
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
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Card className="w-96 shadow-sm">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-medium mb-2">开始一个新对话</h3>
                <p className="text-muted-foreground mb-4">
                  点击左侧的&quot;新建会话&quot;按钮，选择一个NPC开始对话
                </p>
                <Button onClick={() => setShowNPCDialog(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  新建会话
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* NPC选择对话框 */}
      {showNPCDialog && (
        <NPCSelectDialog 
          npcs={availableNPCs}
          onSelect={createNewSession}
          onClose={() => setShowNPCDialog(false)}
        />
      )}
    </div>
  );
} 