import type { Conversation } from '../types';

export const personalizedRelationshipConversation: Conversation = {
  id: 'personalized-relationship-example',
  title: '个性化NPC关系示例',
  description: 'NPC根据玩家过去的互动和行为调整态度的对话示例',
  scenario: 'personalizedRelationship',
  participants: {
    npc: '村庄铁匠格雷姆',
    player: '曾经帮助过村庄的冒险者',
    system: '系统'
  },
  context: {
    location: '边境村庄铁匠铺',
    time: '中午',
    playerState: {
      reputation: {
        village: 75, // 在村庄的声望较高
        withNPC: 60  // 与铁匠的个人关系良好
      },
      pastActions: [
        '帮助村民抵御了狼群',
        '为铁匠寻找稀有矿石',
        '修好了村庄水井',
        '与铁匠有过几次生意往来'
      ]
    }
  },
  messages: [
    {
      id: 'msg1',
      sender: 'system',
      type: 'text',
      content: '【初次见面：铁匠对陌生人保持礼貌但谨慎的态度】',
      timestamp: '2024-03-18T11:00:00Z'
    },
    {
      id: 'msg2',
      sender: 'npc',
      type: 'text',
      content: '需要什么吗，冒险者？如果是要修理装备，价格是10金币一件，先付钱。我这里不赊账。',
      timestamp: '2024-03-18T11:00:30Z'
    },
    {
      id: 'msg3',
      sender: 'player',
      type: 'text',
      content: '其实我刚从北山回来，带回了一些矿石样本，不知道你有没有兴趣看看？',
      timestamp: '2024-03-18T11:01:00Z'
    },
    {
      id: 'msg4',
      sender: 'player',
      type: 'image',
      content: '这是我在北山发现的一种奇特矿石，看起来有些不一样。',
      imageUrl: '/images/meteoric_iron_ore.svg',
      timestamp: '2024-03-18T11:01:30Z'
    },
    {
      id: 'msg5',
      sender: 'system',
      type: 'text',
      content: '【玩家展示了稀有矿石，铁匠的兴趣被激发】',
      timestamp: '2024-03-18T11:01:45Z'
    },
    {
      id: 'msg6',
      sender: 'npc',
      type: 'text',
      content: '等等，让我看看这是什么...星陨铁！这种矿石极其罕见，据说只有陨石撞击后才能形成。你从哪里找到的？我找了这种材料20年了！',
      timestamp: '2024-03-18T11:02:00Z'
    },
    {
      id: 'msg7',
      sender: 'player',
      type: 'text',
      content: '北山有一处隐蔽的峡谷，我在那里找到了几块。如果你感兴趣，我可以带更多给你。',
      timestamp: '2024-03-18T11:02:30Z'
    },
    {
      id: 'msg8',
      sender: 'system',
      type: 'text',
      content: '【建立初步关系：铁匠对玩家产生了好感，态度明显改变】',
      timestamp: '2024-03-18T11:02:45Z'
    },
    {
      id: 'msg9',
      sender: 'npc',
      type: 'text',
      content: '当然感兴趣！这种材料可以打造出无与伦比的武器。你知道这值多少钱吗？我愿意付你普通铁矿十倍的价格！如果你能再带来更多，我还能教你一些特殊的锻造技巧。',
      timestamp: '2024-03-18T11:03:00Z'
    },
    {
      id: 'msg10',
      sender: 'system',
      type: 'text',
      content: '【时间流逝：数周后，玩家多次为铁匠带来稀有材料，并协助村庄抵御狼群】',
      timestamp: '2024-03-18T12:00:00Z'
    },
    {
      id: 'msg11',
      sender: 'npc',
      type: 'text',
      content: '哈！是你啊，冒险者！上次你带来的那块星陨铁真是好东西，我用它打造了几件不错的武器。',
      timestamp: '2024-03-18T12:00:30Z'
    },
    {
      id: 'msg12',
      sender: 'player',
      type: 'text',
      content: '很高兴能帮上忙。今天来是想看看有什么新货。',
      timestamp: '2024-03-18T12:01:00Z'
    },
    {
      id: 'msg13',
      sender: 'npc',
      type: 'text',
      content: '对你这样的老朋友，我当然有特别的东西留着。还记得我提到过的那把传说中的剑胚吗？我终于找到合适的材料来完成它了。',
      timestamp: '2024-03-18T12:01:30Z'
    },
    {
      id: 'msg14',
      sender: 'player',
      type: 'text',
      content: '听起来很不错！需要什么材料才能完成它？',
      timestamp: '2024-03-18T12:02:00Z'
    },
    {
      id: 'msg15',
      sender: 'npc',
      type: 'text',
      content: '我需要一种特殊的火山晶石，据说只在北方火山口的深处才能找到。普通人根本无法靠近，但你...嘿，你可是救了整个村子的英雄！',
      timestamp: '2024-03-18T12:02:30Z'
    },
    {
      id: 'msg16',
      sender: 'npc',
      type: 'text',
      content: '如果你愿意帮忙找来这种晶石，这把剑完成后就归你所有。当然，我会给你老朋友价格，只收取基本的工时费用。',
      timestamp: '2024-03-18T12:03:00Z'
    },
    {
      id: 'msg17',
      sender: 'player',
      type: 'text',
      content: '听起来很危险，但也很有挑战性。你为什么这么信任我？',
      timestamp: '2024-03-18T12:03:30Z'
    },
    {
      id: 'msg18',
      sender: 'npc',
      type: 'text',
      content: '哈哈，你还记得去年冬天吗？当狼群来袭时，大多数人躲在家里，是你站出来保护了我们。而且，你找到的那块星陨铁救了我的生意。这不是信任，这是友谊和尊重！',
      timestamp: '2024-03-18T12:04:00Z'
    },
    {
      id: 'msg19',
      sender: 'npc',
      type: 'text',
      content: '对了，我儿子想成为一名冒险者，就像你一样。也许哪天你能给他讲讲你的冒险故事？孩子会很高兴的。',
      timestamp: '2024-03-18T12:04:30Z'
    },
    {
      id: 'msg20',
      sender: 'player',
      type: 'text',
      content: '当然可以，我很乐意。关于火山晶石的任务，我接受了。有什么需要特别注意的吗？',
      timestamp: '2024-03-18T12:05:00Z'
    },
    {
      id: 'msg21',
      sender: 'npc',
      type: 'text',
      content: '你真是个好人！火山那边很热，带上耐热药水。另外，晶石会对强光产生共鸣，所以夜晚去可能更容易找到它们。这是个小地图，标记了我听说过的几个可能的位置。',
      timestamp: '2024-03-18T12:05:30Z'
    },
    {
      id: 'msg22',
      sender: 'player',
      type: 'text',
      content: '谢谢你的信息和信任。我会尽快带回晶石的。',
      timestamp: '2024-03-18T12:06:00Z'
    },
    {
      id: 'msg23',
      sender: 'npc',
      type: 'text',
      content: '小心点，朋友。我还等着看你挥舞这把剑呢！哦对了，回来的路上如果能顺便带些铁砂回来，我会额外付你酬劳。保重！',
      timestamp: '2024-03-18T12:06:30Z'
    },
    {
      id: 'msg24',
      sender: 'system',
      type: 'text',
      content: '【任务转折点：玩家在火山找到晶石后，发现竞争对手铁匠提供了更好的条件】',
      timestamp: '2024-03-18T17:00:00Z'
    },
    {
      id: 'msg25',
      sender: 'system',
      type: 'text',
      content: '【玩家选择：将晶石卖给竞争对手铁匠换取更多金币】',
      timestamp: '2024-03-18T17:01:00Z'
    },
    {
      id: 'msg26',
      sender: 'system',
      type: 'text',
      content: '【时间流逝：两周后，玩家回到村庄】',
      timestamp: '2024-03-18T17:30:00Z'
    },
    {
      id: 'msg27',
      sender: 'npc',
      type: 'text',
      content: '你...你竟然敢回来？我听说了你在北城做的事。把我需要的晶石卖给了那个骗子德文！',
      timestamp: '2024-03-18T17:30:30Z'
    },
    {
      id: 'msg28',
      sender: 'player',
      type: 'text',
      content: '格雷姆，我可以解释，他提供的条件更好，而且...',
      timestamp: '2024-03-18T17:31:00Z'
    },
    {
      id: 'msg29',
      sender: 'npc',
      type: 'text',
      content: '闭嘴！我信任你，把我最重要的项目交给你，而你却背叛了这份信任！德文的剑会在一个月内断裂，那种骗子根本不懂真正的锻造工艺！',
      timestamp: '2024-03-18T17:31:30Z'
    },
    {
      id: 'msg30',
      sender: 'system',
      type: 'text',
      content: '【关系受损：铁匠对玩家的信任度严重下降，声望减少25点】',
      timestamp: '2024-03-18T17:31:45Z'
    },
    {
      id: 'msg31',
      sender: 'npc',
      type: 'text',
      content: '从今天起，我铺子里的所有东西对你来说都是双倍价格！如果你急需修理装备，还是去找你的新朋友德文吧。看他能不能帮你修好那些垃圾。现在，请离开我的铺子。',
      timestamp: '2024-03-18T17:32:00Z'
    },
    {
      id: 'msg32',
      sender: 'player',
      type: 'text',
      content: '我真的很抱歉，有什么我能做的来弥补吗？',
      timestamp: '2024-03-18T17:32:30Z'
    },
    {
      id: 'msg33',
      sender: 'npc',
      type: 'text',
      content: '[冷漠地] 除非你能从德文那里把晶石拿回来，否则我们之间没什么好说的。但我猜那已经不可能了，不是吗？那家伙肯定已经把它用掉了。请你离开。',
      timestamp: '2024-03-18T17:33:00Z'
    },
    {
      id: 'msg34',
      sender: 'system',
      type: 'text',
      content: '【新任务可用：赢回铁匠的信任】\n【物品价格变更：在格雷姆铺子购买物品价格提高100%】\n【村庄影响：村民们听说了你的背叛，普遍态度变冷】',
      timestamp: '2024-03-18T17:33:30Z'
    }
  ],
  tags: ['个性化关系', 'NPC记忆', '声望系统', '互动历史', '玩家选择影响', '背叛后果']
}; 