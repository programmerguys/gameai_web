import type { Conversation } from '../types';

export const adaptiveStoryConversation: Conversation = {
  id: 'adaptive-story-example',
  title: '自适应故事叙述示例',
  description: '展示游戏如何根据玩家选择和偏好调整故事发展',
  scenario: 'adaptiveStory',
  participants: {
    npc: '皇家图书馆管理员莉娜',
    player: '对历史和魔法感兴趣的学者',
    system: '系统'
  },
  context: {
    location: '皇家图书馆古籍区',
    time: '午后',
    playerState: {
      previousChoices: [
        '选择研究古代遗迹',
        '对魔法符文表现出兴趣',
        '帮助图书馆整理失落的手稿',
        '曾尝试解读被禁的咒语书'
      ],
      inventory: ['学者徽章', '魔法鉴定工具', '古代符文拓印'],
      questProgress: {
        '失落知识': '进行中',
        '符文研究': '已完成'
      }
    }
  },
  messages: [
    {
      id: 'msg1',
      sender: 'npc',
      type: 'text',
      content: '下午好，学者。我注意到你对北方遗迹的魔法符文很感兴趣。你的研究进展如何？',
      timestamp: '2024-03-20T14:00:00Z'
    },
    {
      id: 'msg2',
      sender: 'player',
      type: 'text',
      content: '进展顺利，莉娜女士。我发现那些符文可能与古代元素控制有关，而不仅仅是防护咒语。',
      timestamp: '2024-03-20T14:00:30Z'
    },
    {
      id: 'msg3',
      sender: 'npc',
      type: 'text',
      content: '元素控制？这很有趣的观点。你知道，我们最近收到了一批从东境废墟带回的卷轴，其中有几份正好提到了类似的元素操控理论。',
      timestamp: '2024-03-20T14:01:00Z'
    },
    {
      id: 'msg4',
      sender: 'player',
      type: 'image',
      content: '我在遗迹中发现的这些符文，您看，它们的结构似乎暗示了某种能量流动的控制。',
      imageUrl: '/images/rune_constellation_comparison.svg',
      timestamp: '2024-03-20T14:01:30Z'
    },
    {
      id: 'msg5',
      sender: 'npc',
      type: 'text',
      content: '确实非常相似！这几乎可以确认是同一个文明的遗留物。这可能是突破性的发现。我想你应该查看那批卷轴，它们可能包含解读这些符文的关键。',
      timestamp: '2024-03-20T14:02:00Z'
    },
    {
      id: 'msg6',
      sender: 'npc',
      type: 'text',
      content: '当然可以，考虑到你在符文研究上的成就，我相信你会妥善处理这些珍贵文物。不过，有一个问题...',
      timestamp: '2024-03-20T14:02:30Z'
    },
    {
      id: 'msg7',
      sender: 'npc',
      type: 'text',
      content: '这些卷轴被魔法封印保护，需要特定的解封仪式。图书馆委员会认为这可能涉及一些...危险的知识。鉴于你之前尝试过解读被禁的咒语书，他们对你接触这些卷轴有些担忧。',
      timestamp: '2024-03-20T14:03:00Z'
    },
    {
      id: 'msg8',
      sender: 'player',
      type: 'text',
      content: '我理解他们的担忧。那次只是出于学术好奇，我从未打算使用那些咒语。我只对知识本身感兴趣。',
      timestamp: '2024-03-20T14:03:30Z'
    },
    {
      id: 'msg9',
      sender: 'npc',
      type: 'text',
      content: '我相信你的初衷。事实上，正是因为你帮助我们整理失落手稿的贡献，我才敢向你提及这些卷轴。我有两个建议：',
      timestamp: '2024-03-20T14:04:00Z'
    },
    {
      id: 'msg10',
      sender: 'npc',
      type: 'text',
      content: '你可以等待委员会的正式批准，可能需要几周时间。或者，你可以在我的监督下研究这些卷轴，但所有发现必须先由图书馆记录备案，你无法将任何内容带出图书馆。你更倾向于哪种方式？',
      timestamp: '2024-03-20T14:04:30Z'
    },
    {
      id: 'msg11',
      sender: 'player',
      type: 'text',
      content: '我愿意在你的监督下进行研究。时间就是知识，等待几周可能会错过重要发现。我完全尊重图书馆的规定。',
      timestamp: '2024-03-20T14:05:00Z'
    },
    {
      id: 'msg12',
      sender: 'system',
      type: 'text',
      content: '【玩家选择了更冒险的研究路径，获得了莉娜的信任加成，但也增加了潜在的魔法风险】',
      timestamp: '2024-03-20T14:05:15Z'
    },
    {
      id: 'msg13',
      sender: 'npc',
      type: 'text',
      content: '很好。我欣赏你的热情和对规则的尊重。明天下午来找我，我会安排一个安静的研究室。我们还需要找第三位见证人...考虑到你对遗迹的兴趣，我想邀请奥利维亚教授，她刚从北方遗迹考察回来。',
      timestamp: '2024-03-20T14:05:30Z'
    },
    {
      id: 'msg14',
      sender: 'player',
      type: 'text',
      content: '奥利维亚教授？我读过她的几篇论文，能与她共事将是莫大的荣幸！',
      timestamp: '2024-03-20T14:06:00Z'
    },
    {
      id: 'msg15',
      sender: 'npc',
      type: 'text',
      content: '我想她也会对你的研究感兴趣。[低声]而且，有她作为权威见证人，委员会也会更加安心。对了，你在解封仪式方面有什么经验吗？',
      timestamp: '2024-03-20T14:06:30Z'
    },
    {
      id: 'msg16',
      sender: 'player',
      type: 'text',
      content: '我在南方学院学习过基础魔法解封，但从未处理过古代封印。',
      timestamp: '2024-03-20T14:07:00Z'
    },
    {
      id: 'msg17',
      sender: 'player',
      type: 'image',
      content: '这是我之前解封的一个小型护符，使用的是标准的解封流程。与古代封印相比可能太基础了。',
      imageUrl: '/images/ancient_civilizations_chronicle.svg',
      timestamp: '2024-03-20T14:07:15Z'
    },
    {
      id: 'msg18',
      sender: 'system',
      type: 'text',
      content: '【莉娜查看了玩家的解封经验，评估风险等级略有提高】',
      timestamp: '2024-03-20T14:07:20Z'
    },
    {
      id: 'msg19',
      sender: 'npc',
      type: 'text',
      content: '了解。虽然基础，但你的技术看起来相当扎实。那么明天我会准备必要的工具和参考书籍。请记得带上你的魔法鉴定工具，它会对我们有所帮助。我很期待我们的合作，这可能会改变我们对古代魔法的理解！',
      timestamp: '2024-03-20T14:07:30Z'
    },
    {
      id: 'msg20',
      sender: 'system',
      type: 'text',
      content: '【任务接受：古代卷轴解封】\n【新关系建立：奥利维亚教授将成为重要研究伙伴】\n【风险提示：该研究路径可能引发图书馆委员会的警觉】',
      timestamp: '2024-03-20T14:08:00Z'
    }
  ],
  tags: ['自适应叙事', '玩家选择', '剧情分支', '个性化故事', '隐性选择']
}; 