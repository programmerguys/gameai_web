// 从npc库导入类型
import type { NPC as LibNPC } from '@/lib/npc';

// 扩展NPC类型，添加avatarUrl属性
export interface NPC extends LibNPC {
  avatarUrl?: string;
}

// 消息发送者类型
export type MessageSender = 'user' | 'npc' | 'system';

// 消息类型定义
export interface Message {
  id: string;
  content: string;
  sender: MessageSender; // 替换isUser为更灵活的sender字段
  timestamp: Date;
}

// 聊天会话类型定义
export interface ChatSession {
  id: string;
  npc: NPC;
  messages: Message[];
  createdAt: Date;
  lastMessageAt: Date;
}

// 扩展消息类型，用于支持图片
export interface ExtendedMessage extends Message {
  imageUrl?: string;
  type?: 'text' | 'image' | 'system';
} 