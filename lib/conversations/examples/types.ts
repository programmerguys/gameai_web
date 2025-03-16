import type { ConversationMessage } from '../types';

// 消息类型，包含消息发送者的ID
export interface NPCMessage extends ConversationMessage {
  sender: string;
}

// 聊天会话类型
export interface ChatSession {
  id: string;
  npc: {
    id?: string;
    name: string;
    description?: string;
    tags?: string[];
    avatarUrl?: string;
  };
  messages: NPCMessage[];
} 