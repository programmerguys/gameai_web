import type { Conversation, ConversationMessage } from './types';
import { exampleConversations } from './index';
import type { NPC, NPCStatus } from '@/lib/npc';
import type { ChatSession, Message, MessageSender } from '@/components/chat/types';

// 本地SVG图像映射表
const localSvgImages: Record<string, string> = {
  'rune_constellation_comparison': '/images/rune_constellation_comparison.svg',
  'ancient_civilizations_chronicle': '/images/ancient_civilizations_chronicle.svg',
  'spell_book_interface': '/images/spell_book_interface.svg',
  'elemental_combinations': '/images/elemental_combinations.svg',
  'library_map': '/images/library_map.svg',
  'deer_tracks': '/images/deer_tracks.svg',
  'meteoric_iron_ore': '/images/meteoric_iron_ore.svg',
  'blue_cap_mushroom': '/images/blue_cap_mushroom.svg',
  'mushroom_sprite': '/images/mushroom_sprite.svg'
};

// 从URL中提取图片名称
function extractImageNameFromUrl(url: string): string {
  // 处理形如 /images/name.jpg 或 https://example.com/images/name.jpg 的URL
  const match = url.match(/\/([^\/]+)\.(jpg|jpeg|png|svg)$/i);
  if (match?.at(1)) {
    return match[1].toLowerCase();
  }
  return '';
}

/**
 * 将Conversation类型转换为ChatSession类型
 */
export function convertConversationToSession(conversation: Conversation): ChatSession {
  // 创建一个简单的NPC对象
  const npcId = Object.keys(conversation.participants).find(key => key === 'npc') || 'npc';
  const npc: NPC = {
    id: conversation.id,
    name: conversation.participants[npcId],
    description: conversation.description,
    systemPrompt: `示例对话: ${conversation.title}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active' as NPCStatus,
    actions: [],
    variables: [],
    tags: conversation.tags,
    modelId: 'gpt-4'
  };

  // 转换消息
  const messages: Message[] = conversation.messages.map(msg => convertMessage(msg));

  // 使用第一条消息的时间作为创建时间，最后一条消息的时间作为最后更新时间
  const firstMsgTime = new Date(conversation.messages[0]?.timestamp || new Date());
  const lastMsgTime = new Date(conversation.messages[conversation.messages.length - 1]?.timestamp || new Date());

  return {
    id: conversation.id,
    npc,
    messages,
    createdAt: firstMsgTime,
    lastMessageAt: lastMsgTime
  };
}

/**
 * 将ConversationMessage转换为Message
 */
function convertMessage(message: ConversationMessage): Message & { imageUrl?: string } {
  // 确定消息发送者类型
  let sender: MessageSender;
  if (message.sender === 'player') {
    sender = 'user';
  } else if (message.sender === 'system') {
    sender = 'system';
  } else {
    sender = 'npc';
  }

  // 基本消息结构
  const baseMessage: Message = {
    id: message.id,
    content: message.content,
    sender,
    timestamp: new Date(message.timestamp)
  };

  // 如果是图片消息，添加imageUrl属性
  if (message.type === 'image' && message.imageUrl) {
    // 处理图片URL
    let imageUrl = message.imageUrl;
    if (imageUrl.startsWith('/images/')) {
      const imageName = extractImageNameFromUrl(imageUrl);
      if (localSvgImages[imageName]) {
        imageUrl = localSvgImages[imageName];
      }
    }
    
    return {
      ...baseMessage,
      imageUrl
    };
  }

  return baseMessage;
}

/**
 * 获取所有示例会话
 */
export function getAllExampleSessions(): ChatSession[] {
  return exampleConversations.map(convertConversationToSession);
}

/**
 * 获取特定ID的示例会话
 */
export function getExampleSessionById(id: string): ChatSession | undefined {
  const conversation = exampleConversations.find(conv => conv.id === id);
  if (!conversation) return undefined;
  
  return convertConversationToSession(conversation);
} 