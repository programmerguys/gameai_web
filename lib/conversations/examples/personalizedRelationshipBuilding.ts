import type { Conversation } from '../types';

export const personalizedRelationshipBuildingConversation: Conversation = {
  id: 'personalized-relationship-building-example',
  title: '个性化关系构建示例',
  description: 'NPC根据与玩家的多次互动逐渐发展出深入而独特的关系',
  scenario: 'personalizedRelationshipBuilding',
  participants: {
    npc: '学者艾琳娜',
    player: '对古代文明有共同兴趣的冒险者'
  },
  context: {
    location: '水晶城学院图书馆',
    time: '晚上',
    playerState: {
      interactionHistory: [
        {
          time: '一个月前',
          event: '帮助艾琳娜找回丢失的研究笔记',
          outcome: '获得基础信任'
        },
        {
          time: '三周前',
          event: '从古遗迹带回一块碑文拓片',
          outcome: '增进学术交流'
        },
        {
          time: '两周前',
          event: '陪同艾琳娜前往危险地区考察',
          outcome: '建立战友情谊'
        },
        {
          time: '一周前',
          event: '为艾琳娜的研究提供关键线索',
          outcome: '深化学术合作'
        }
      ],
      relationshipLevel: '挚友',
      sharedInterests: ['古代文明研究', '符文解析', '历史考古']
    }
  },
  messages: [
    {
      id: 'msg1',
      sender: 'npc',
      type: 'text',
      content: '[看到你进入图书馆，立刻眼睛一亮] 啊！我正希望你会来。你绝对想不到我有什么发现！',
      timestamp: '2024-03-26T20:00:00Z'
    },
    {
      id: 'msg2',
      sender: 'player',
      type: 'text',
      content: '艾琳娜，晚上好！你看起来很兴奋，是关于上次那块碑文的新发现吗？',
      timestamp: '2024-03-26T20:00:30Z'
    },
    {
      id: 'msg3',
      sender: 'npc',
      type: 'text',
      content: '[熟悉地拍拍你的肩膀] 没错！还记得你上周指出的那个奇怪的符号序列吗？我把它与学院档案中的古代星图对比，发现那竟然是一个天文日历！',
      timestamp: '2024-03-26T20:01:00Z'
    },
    {
      id: 'msg4',
      sender: 'npc',
      type: 'image',
      content: '看这张对比图，左边是你带回的拓片上的符号，右边是古星图。完美吻合！',
      imageUrl: '/images/rune_constellation_comparison.svg',
      timestamp: '2024-03-26T20:01:30Z'
    },
    {
      id: 'msg5',
      sender: 'player',
      type: 'text',
      content: '这太神奇了！所以那个文明使用星象来记录时间？这解释了为什么那些符号会随季节变化...',
      timestamp: '2024-03-26T20:02:00Z'
    },
    {
      id: 'msg6',
      sender: 'npc',
      type: 'text',
      content: '[眼睛闪烁着兴奋的光芒] 正是如此！你总是能迅速抓住要点，这就是为什么我喜欢和你讨论这些发现。[压低声音] 其实我本应该先向院长报告的，但我忍不住想先告诉你。',
      timestamp: '2024-03-26T20:02:30Z'
    },
    {
      id: 'msg7',
      sender: 'player',
      type: 'text',
      content: '我很荣幸！话说回来，基于这个发现，你认为那个仪式室的入口会在特定的天文时刻开启吗？',
      timestamp: '2024-03-26T20:03:00Z'
    },
    {
      id: 'msg8',
      sender: 'npc',
      type: 'text',
      content: '[惊讶地看着你] 你怎么知道仪式室的事？我还没有告诉任何人我的这个猜测！[随即露出了然的微笑] 当然，你也想到了同样的结论。这就是为什么我们合作如此默契。',
      timestamp: '2024-03-26T20:03:30Z'
    },
    {
      id: 'msg9',
      sender: 'npc',
      type: 'text',
      content: '根据我的计算，下一个符合碑文描述的星象排列将在三天后出现。[犹豫了一下] 我本打算独自前往遗迹，但考虑到上次的危险，或许...你愿意再次陪我一起去吗？',
      timestamp: '2024-03-26T20:04:00Z'
    },
    {
      id: 'msg10',
      sender: 'player',
      type: 'text',
      content: '当然愿意。上次要不是你及时使用那个防护符文，我可能就被那些机关伤到了。我们是最好的探险搭档！',
      timestamp: '2024-03-26T20:04:30Z'
    },
    {
      id: 'msg11',
      sender: 'npc',
      type: 'text',
      content: '[表情柔和下来] 那次确实吓到我了。看到你差点被那些飞镖击中...之后我专门研究了更多防护咒语。[从包里拿出两个小护符] 这个给你，应该能提供更好的保护。',
      timestamp: '2024-03-26T20:05:00Z'
    },
    {
      id: 'msg12',
      sender: 'player',
      type: 'text',
      content: '你亲手做的？这一定花了不少时间。谢谢你，艾琳娜，这对我意义重大。',
      timestamp: '2024-03-26T20:05:30Z'
    },
    {
      id: 'msg13',
      sender: 'npc',
      type: 'text',
      content: '[轻微脸红] 别放在心上。学院里没有其他人能真正理解我的研究热情，能遇到你这样的同行真是幸运。[突然想起什么] 对了，还记得我们上次讨论的那本《失落文明编年史》吗？',
      timestamp: '2024-03-26T20:06:00Z'
    },
    {
      id: 'msg14',
      sender: 'player',
      type: 'text',
      content: '当然记得，你说那是绝版书，全国只有三本，而且都在私人收藏中。',
      timestamp: '2024-03-26T20:06:30Z'
    },
    {
      id: 'msg15',
      sender: 'npc',
      type: 'text',
      content: '[神秘地微笑] 跟我来。[带你走向图书馆深处的一个私人阅览室，用钥匙打开门] 学院院长欠我个人情，借了他的珍藏版。我们有整整一晚上可以研究它！',
      timestamp: '2024-03-26T20:07:00Z'
    },
    {
      id: 'msg16',
      sender: 'npc',
      type: 'image',
      content: '这就是那本传说中的《失落文明编年史》，保存完好的初版。',
      imageUrl: '/images/ancient_civilizations_chronicle.svg',
      timestamp: '2024-03-26T20:07:30Z'
    },
    {
      id: 'msg17',
      sender: 'player',
      type: 'text',
      content: '难以置信！艾琳娜，你真是...我不知道该说什么好。能亲眼看到这本书是我多年的梦想！',
      timestamp: '2024-03-26T20:08:00Z'
    },
    {
      id: 'msg18',
      sender: 'npc',
      type: 'text',
      content: '[满意地看着你的反应] 看到你这样的表情就值得了。[声音变得认真] 你知道，自从我们开始合作，我的研究进展比过去五年还要快。大学院士们开始重视我的工作了。',
      timestamp: '2024-03-26T20:08:30Z'
    },
    {
      id: 'msg19',
      sender: 'npc',
      type: 'text',
      content: '实际上...我被提名为下一届考古研究主席了。如果当选，我将可以组建自己的研究团队，[目光直视你] 我希望你能考虑成为正式成员，不再只是"顾问"身份。',
      timestamp: '2024-03-26T20:09:00Z'
    },
    {
      id: 'msg20',
      sender: 'player',
      type: 'text',
      content: '艾琳娜，这是我的荣幸！虽然我一直更习惯独自冒险，但为了与你共同揭开那些古老的秘密，我愿意改变这个习惯。',
      timestamp: '2024-03-26T20:09:30Z'
    },
    {
      id: 'msg21',
      sender: 'npc',
      type: 'text',
      content: '[眼中闪过一丝喜悦] 太好了！[稍作停顿，语气变得温和] 你知道，最初你帮我找回笔记时，我只当你是个有用的冒险者。没想到我们会有如此多的共同语言，更没想到...',
      timestamp: '2024-03-26T20:10:00Z'
    },
    {
      id: 'msg22',
      sender: 'player',
      type: 'text',
      content: '更没想到什么？',
      timestamp: '2024-03-26T20:10:30Z'
    },
    {
      id: 'msg23',
      sender: 'npc',
      type: 'text',
      content: '[轻笑] 更没想到一个满身是伤的冒险者对古文明史会有如此深入的见解。[严肃起来] 说真的，谢谢你。不仅是为了研究上的帮助，还有...你的友谊。学术界很孤独，而你让这一切变得不同。',
      timestamp: '2024-03-26T20:11:00Z'
    },
    {
      id: 'msg24',
      sender: 'player',
      type: 'text',
      content: '这份友谊对我同样珍贵，艾琳娜。现在，让我们看看这本传说中的书能告诉我们什么有关星象历法的秘密吧！',
      timestamp: '2024-03-26T20:11:30Z'
    },
    {
      id: 'msg25',
      sender: 'npc',
      type: 'text',
      content: '[亲切地点头] 你读我心。[打开古书，小心翻到目录] 就像我们总是能相互理解一样。来吧，冒险者，让我们一起解开另一个远古之谜！',
      timestamp: '2024-03-26T20:12:00Z'
    }
  ],
  tags: ['个性化关系', '情感发展', '共同兴趣', '互动历史', '长期互动']
}; 