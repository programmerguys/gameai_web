import type { ExtendedMessage as Message, MessageSender } from '@/components/chat/types';
import type { NPC } from './npc';
import * as crypto from "node:crypto";

// 扩展NPC类型，添加avatarUrl属性
declare module './npc' {
  interface NPC {
    avatarUrl?: string;
  }
}

// 示例对话中的消息类型
interface NPCMessage {
  id: string;
  content: string;
  imageUrl?: string;
  sender: string;
  timestamp: string;
}

// 示例对话会话类型
interface ExampleChatSession {
	id?: string;
	npc: {
		id?: string;
		name: string;
		description?: string;
		tags?: string[];
		avatarUrl?: string;
	};
	messages: NPCMessage[];
}

// Web端的聊天会话类型
export interface ChatSession {
  id: string;
  npc: Partial<NPC>;
  messages: Message[];
}

// 哈希函数，用于生成图片持久化映射
function hashString(str: string): string {
  return crypto.createHash('md5').update(str).digest('hex').substring(0, 8);
}

// 本地SVG图像映射表
const localSvgImages: Record<string, string> = {
  'rune_constellation_comparison': '/images/rune_constellation_comparison.svg',
  'ancient_civilizations_chronicle': '/images/ancient_civilizations_chronicle.svg',
  'spell_book_interface': '/images/spell_book_interface.svg',
  'elemental_combinations': '/images/elemental_combinations.svg',
  'library_map': '/images/library_map.svg',
  'deer_tracks': '/images/deer_tracks.svg',
  'meteoric_iron_ore': '/images/meteoric_iron_ore.svg'
};

// 将示例会话转换为实际会话格式
export function convertExampleToSession(example: ExampleChatSession): ChatSession {
  const npc: Partial<NPC> = {
    id: example.npc.id || 'default-npc',
    name: example.npc.name,
    description: example.npc.description || '',
    tags: example.npc.tags || [],
  };

  // 添加可选的头像URL
  if (example.npc.avatarUrl) {
    npc.avatarUrl = example.npc.avatarUrl;
  }

  // 消息转换
  const messages: Message[] = example.messages.map((msg) => {
    // 确定消息发送者类型
    let sender: MessageSender;
    if (msg.sender === 'system') {
      sender = 'system';
    } else if (msg.sender === npc.id || msg.sender === npc.name) {
      sender = 'npc';
    } else {
      sender = 'user';
    }

    // 处理图片URL - 检查是否为预定义的本地SVG图像
    let imageUrl = msg.imageUrl;
    if (imageUrl) {
      // 从URL中提取图片名称，用于本地映射
      const imageName = extractImageNameFromUrl(imageUrl);
      
      // 检查是否有对应的本地SVG图像
      if (localSvgImages[imageName]) {
        imageUrl = localSvgImages[imageName];
      } else if (imageUrl.includes('unsplash')) {
        // 如果是Unsplash的链接，生成一个持久化的映射
        const hash = hashString(imageUrl);
        imageUrl = `https://source.unsplash.com/random/800x600?${hash}`;
      }
    }

    // 返回转换后的消息
    return {
      id: msg.id || Date.now().toString(),
      content: msg.content,
      imageUrl: imageUrl,
      timestamp: new Date(msg.timestamp),
      sender: sender,
    };
  });

  return {
    id: example.id || "example-session",
    npc,
    messages,
  };
}

// 从URL中提取图片名称
function extractImageNameFromUrl(url: string): string {
  // 处理形如 /images/name.jpg 或 https://example.com/images/name.jpg 的URL
  const match = url.match(/\/([^\/]+)\.(jpg|jpeg|png|svg)$/i);
  if (match?.at(1)) {
    return match[1].toLowerCase();
  }
  return '';
} 