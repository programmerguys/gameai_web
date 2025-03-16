import type { Conversation } from '../types';

export const invisibleTutorialConversation: Conversation = {
  id: 'invisible-tutorial-example',
  title: '隐形教程示例',
  description: '通过自然的对话和任务隐式地引导玩家学习游戏机制',
  scenario: 'invisibleTutorial',
  participants: {
    npc: '老猎人格雷格',
    player: '初到荒野的新手猎人'
  },
  context: {
    location: '荒野边缘的猎人小屋',
    time: '黄昏',
    playerState: {
      level: 2,
      tutorial: {
        explicitTutorials: false, // 玩家选择关闭了明确的教程
        discoveredMechanics: ['基础移动', '背包管理'],
        needsToLearn: ['潜行', '追踪', '猎物处理', '制作陷阱']
      }
    }
  },
  messages: [
    {
      id: 'msg1',
      sender: 'npc',
      type: 'text',
      content: '晚上好，年轻人。看你的装备，是刚开始猎人生涯吧？我是格雷格，在这片荒野打猎四十多年了。',
      timestamp: '2024-03-24T18:00:00Z'
    },
    {
      id: 'msg2',
      sender: 'player',
      type: 'text',
      content: '您好，格雷格先生。我确实刚开始学习狩猎，希望能在这片荒野有所收获。',
      timestamp: '2024-03-24T18:00:30Z'
    },
    {
      id: 'msg3',
      sender: 'npc',
      type: 'text',
      content: '有志气！不过这片荒野可不是闹着玩的。我看你带了把不错的弓，但光有装备还不够。想不想跟我出去走走？正好我要去检查几个陷阱。',
      timestamp: '2024-03-24T18:01:00Z'
    },
    {
      id: 'msg4',
      sender: 'player',
      type: 'text',
      content: '当然愿意！能向您学习是我的荣幸。',
      timestamp: '2024-03-24T18:01:30Z'
    },
    {
      id: 'msg5',
      sender: 'npc',
      type: 'text',
      content: '好！先等我拿些东西...[老猎人从架子上取下一把小刀递给你] 这把皮革刀你拿着，处理猎物会需要它。把它放在你随手可及的位置。',
      timestamp: '2024-03-24T18:02:00Z'
    },
    {
      id: 'msg6',
      sender: 'npc',
      type: 'text',
      content: '我们走吧。记住，在荒野中要尽量安静，跟在我后面，看我怎么走的。[老猎人开始向前走，明显放慢了脚步，半蹲着身体]',
      timestamp: '2024-03-24T18:02:30Z'
    },
    {
      id: 'msg7',
      sender: 'player',
      type: 'text',
      content: '[跟随老猎人，模仿他的动作] 我应该像这样走吗？',
      timestamp: '2024-03-24T18:03:00Z'
    },
    {
      id: 'msg8',
      sender: 'npc',
      type: 'text',
      content: '对，就是这样！按住Ctrl键可以让你保持低姿态潜行。这样动物不容易发现你，而且能让你看到地上的痕迹。[指向地面] 看到这些浅浅的印记了吗？这是鹿蹄印，看方向是向西北方去了。',
      timestamp: '2024-03-24T18:03:30Z'
    },
    {
      id: 'msg9',
      sender: 'npc',
      type: 'image',
      content: '这些就是鹿的蹄印，注意它们的形状和大小。',
      imageUrl: '/images/deer_tracks.svg',
      timestamp: '2024-03-24T18:04:00Z'
    },
    {
      id: 'msg10',
      sender: 'player',
      type: 'text',
      content: '我明白了。所以潜行不仅是为了不惊动猎物，还能帮助发现这些线索？',
      timestamp: '2024-03-24T18:04:30Z'
    },
    {
      id: 'msg11',
      sender: 'npc',
      type: 'text',
      content: '聪明！荒野中处处有线索，只要你眼睛够尖。看那边的树，树皮被蹭掉了一小块，那是雄鹿在磨角。新手容易忽略这些细节，但它们能告诉你猎物的位置、大小甚至健康状况。',
      timestamp: '2024-03-24T18:05:00Z'
    },
    {
      id: 'msg12',
      sender: 'npc',
      type: 'text',
      content: '啊，到了。这是我昨天设的陷阱。[指向一个精心隐藏在灌木丛中的绳套陷阱] 陷阱空了，但看这个足迹，有只狐狸经过但没触发陷阱。我们需要调整一下。',
      timestamp: '2024-03-24T18:05:30Z'
    },
    {
      id: 'msg13',
      sender: 'npc',
      type: 'text',
      content: '制作陷阱需要耐心和了解动物习性。这个陷阱需要靠近动物常走的路径，还需要合适的诱饵。我们用这个...[从背包取出一小块肉] 不需要太多，只需要足够的气味。',
      timestamp: '2024-03-24T18:06:00Z'
    },
    {
      id: 'msg14',
      sender: 'player',
      type: 'text',
      content: '我该如何制作自己的陷阱？需要什么材料？',
      timestamp: '2024-03-24T18:06:30Z'
    },
    {
      id: 'msg15',
      sender: 'npc',
      type: 'text',
      content: '基础的绳套陷阱需要强韧的绳子和一些木棍。找一个动物经常通过的狭窄路径，将绳套悬挂在合适高度。陷阱制作界面在你的生存技能菜单中，按B键打开。',
      timestamp: '2024-03-24T18:07:00Z'
    },
    {
      id: 'msg16',
      sender: 'npc',
      type: 'text',
      content: '嘘！[老猎人突然低声示意] 你听到了吗？[远处传来轻微的树枝断裂声] 那边有动静。跟我来，记住保持潜行，顺着风向走，这样它们闻不到我们的气味。',
      timestamp: '2024-03-24T18:07:30Z'
    },
    {
      id: 'msg17',
      sender: 'npc',
      type: 'text',
      content: '[带你穿过灌木丛，最后停在一个小山坡上，指向远处的空地] 看，一只成年公鹿。现在，拿出你的弓，但别急着射击。观察它的行动，等它侧身站立时瞄准肩胛骨后面的位置。',
      timestamp: '2024-03-24T18:08:00Z'
    },
    {
      id: 'msg18',
      sender: 'player',
      type: 'text',
      content: '[拿出弓，紧张地瞄准] 像这样吗？我有点紧张...',
      timestamp: '2024-03-24T18:08:30Z'
    },
    {
      id: 'msg19',
      sender: 'npc',
      type: 'text',
      content: '深呼吸，放松。拉弓时按住鼠标右键可以稳定你的瞄准。等鹿停下来喝水的瞬间...就是现在，射击！',
      timestamp: '2024-03-24T18:09:00Z'
    },
    {
      id: 'msg20',
      sender: 'player',
      type: 'text',
      content: '[松开箭] 我击中它了！',
      timestamp: '2024-03-24T18:09:30Z'
    },
    {
      id: 'msg21',
      sender: 'npc',
      type: 'text',
      content: '好射击！现在等它倒下，不要立即追上去。有时猎物受伤后会跑一段距离才倒下。跟着血迹走，但保持警惕，受伤的动物可能很危险。',
      timestamp: '2024-03-24T18:10:00Z'
    },
    {
      id: 'msg22',
      sender: 'npc',
      type: 'text',
      content: '[几分钟后，你们找到了倒下的鹿] 现在，拿出我给你的皮革刀。处理猎物时，先用刀在腹部划一条线，小心不要刺破内脏。按E键开始剥皮，然后按照屏幕提示完成处理。',
      timestamp: '2024-03-24T18:10:30Z'
    },
    {
      id: 'msg23',
      sender: 'player',
      type: 'text',
      content: '[按照指示处理猎物] 这样做对吗？',
      timestamp: '2024-03-24T18:11:00Z'
    },
    {
      id: 'msg24',
      sender: 'npc',
      type: 'text',
      content: '做得很好！记住，处理得当的话，一只鹿能提供肉、皮和角，全都有用。皮可以制作装备，肉当然是食物，角可以用来制作工具。不要浪费任何部分。',
      timestamp: '2024-03-24T18:11:30Z'
    },
    {
      id: 'msg25',
      sender: 'npc',
      type: 'text',
      content: '今天的收获不错！你学得很快。回到小屋，我教你如何保存这些肉。记住今天学到的：潜行、追踪、等待最佳射击时机，以及如何处理猎物。这些都是荒野生存的基本技能。',
      timestamp: '2024-03-24T18:12:00Z'
    }
  ],
  tags: ['隐形教程', '游戏机制学习', '情境教学', '自然引导', '技能培养']
}; 