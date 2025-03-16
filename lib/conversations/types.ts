// 消息类型
export type MessageType = 'text' | 'image' | 'mixed';

// 基础消息接口
export interface ConversationMessage {
  id: string;
  sender: string; // 改为string类型以支持多个NPC
  type: MessageType;
  content: string;
  imageUrl?: string; // 可选的图片URL
  timestamp: string;
}

// 上下文信息
export interface ConversationContext {
  location?: string; // 对话发生的位置
  time?: string; // 对话发生的时间
  playerState?: {
    level?: number;
    reputation?: number | Record<string, number>;
    inventory?: string[] | Record<string, string | string[]>;
    class?: string;
    questProgress?: Record<string, unknown>;
    recentBehavior?: string[];
    pastActions?: string[];
    tutorial?: Record<string, unknown>;
    interactionHistory?: Array<Record<string, string>>;
    relationshipLevel?: string;
    sharedInterests?: string[];
    townChoices?: Record<string, string>;
    townContributions?: string[];
    lastActive?: string;
    completedMainQuests?: string;
    activeQuests?: string[];
    [key: string]: unknown; // 其他玩家状态信息
  };
  gameState?: {
    environment?: string;
    npcRelationships?: Record<string, number>;
    townDevelopment?: string;
    townMood?: string;
    recentEvents?: string[];
    population?: number;
    securityLevel?: string;
    prosperityLevel?: string;
    currentVersion?: string;
    lastPlayedVersion?: string;
    majorChanges?: string[];
    [key: string]: unknown; // 其他游戏状态信息
  };
  [key: string]: unknown; // 其他上下文信息
}

// 示例对话接口
export interface Conversation {
  id: string;
  title: string;
  description: string;
  scenario: string; // 场景类型，如"动态任务"、"NPC关系"等
  participants: {
    [key: string]: string; // 参与者ID到名称的映射
  };
  context: ConversationContext;
  messages: ConversationMessage[];
  tags: string[]; // 分类标签
}

// 所有的场景类型
export type ScenarioType = 
  | 'dynamicTask' // 动态程序化任务
  | 'personalizedRelationship' // 个性化NPC关系
  | 'npcInteraction' // NPC间互动网络
  | 'evolvingTown' // 演化中的城镇生态
  | 'adaptiveStory' // 自适应故事叙述
  | 'adaptiveTutorial' // 自适应教程对话
  | 'realTimeQA' // 实时问答系统
  | 'invisibleTutorial' // 隐形教程
  | 'gameReturnAssistant' // 游戏回归辅助
  | 'personalizedRelationshipBuilding'; // 个性化关系构建