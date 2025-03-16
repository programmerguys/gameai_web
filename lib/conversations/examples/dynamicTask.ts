import type { Conversation } from '../types';

export const dynamicTaskConversation: Conversation = {
  id: 'dynamic-task-example',
  title: '动态程序化任务例子',
  description: '系统根据玩家行为和偏好动态生成符合玩家风格的任务',
  scenario: 'dynamicTask',
  participants: {
    npc: 'NPC探险家',
    player: '偏好探索和潜行策略的冒险者'
  },
  context: {
    location: '城市遗迹外围',
    time: '傍晚',
    playerState: {
      level: 15,
      reputation: 60,
      inventory: ['精良匕首', '隐身药水x3', '绳索', '潜行装备'],
      class: '盗贼',
      recentBehavior: ['潜入废弃建筑', '避开正面冲突', '收集古物']
    }
  },
  messages: [
    {
      id: 'msg1',
      sender: 'npc',
      type: 'text',
      content: '嘿冒险家，我注意到你对城市废墟很感兴趣。',
      timestamp: '2024-03-16T18:30:00Z'
    },
    {
      id: 'msg2',
      sender: 'player',
      type: 'text',
      content: '是的，我一直在探索那些被遗忘的地方。',
      timestamp: '2024-03-16T18:30:30Z'
    },
    {
      id: 'msg3',
      sender: 'npc',
      type: 'text',
      content: '听说东区的旧图书馆地下室藏着一批珍贵手稿，但那里现在被一群擅长听声辨位的变异生物占据。以你的潜行技巧，应该能悄悄取回它们。感兴趣吗？',
      timestamp: '2024-03-16T18:31:00Z'
    },
    {
      id: 'msg4',
      sender: 'player',
      type: 'text',
      content: '这正是我擅长的。那些生物有什么特别需要注意的？',
      timestamp: '2024-03-16T18:31:30Z'
    },
    {
      id: 'msg5',
      sender: 'npc',
      type: 'text',
      content: '它们几乎看不见，但听力极其敏锐。地板上散落着玻璃碎片，一不小心就会发出声音。我建议你准备一些布料缠在靴子上，并在前进时利用水滴声作为掩护。',
      timestamp: '2024-03-16T18:32:00Z'
    },
    {
      id: 'msg6',
      sender: 'npc',
      type: 'image',
      content: '这是我上次冒险时绘制的地图，红色标记的是危险区域，蓝色的是可能藏有手稿的位置。',
      imageUrl: '/images/library_map.svg',
      timestamp: '2024-03-16T18:32:30Z'
    },
    {
      id: 'msg7',
      sender: 'player',
      type: 'text',
      content: '明白了。报酬是什么？',
      timestamp: '2024-03-16T18:33:00Z'
    },
    {
      id: 'msg8',
      sender: 'npc',
      type: 'text',
      content: '学者协会愿意支付300金币，还有一件特殊的隐形斗篷。对了，如果你能找到记载古代隐身术的手稿，我可以教你一些高级潜行技巧。',
      timestamp: '2024-03-16T18:33:30Z'
    },
    {
      id: 'msg9',
      sender: 'player',
      type: 'text',
      content: '成交。我什么时候应该出发？',
      timestamp: '2024-03-16T18:34:00Z'
    },
    {
      id: 'msg10',
      sender: 'npc',
      type: 'text',
      content: '最好在午夜，那时候大多数生物会聚集在图书馆中央的水池旁。记得带上你的隐身药水，那将是你的保险。祝你好运，我在东门等你的好消息。',
      timestamp: '2024-03-16T18:34:30Z'
    }
  ],
  tags: ['任务生成', '动态任务', '潜行任务', '玩家偏好', '个性化内容']
}; 