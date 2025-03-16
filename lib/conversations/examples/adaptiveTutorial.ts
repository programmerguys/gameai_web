import type { Conversation } from '../types';

export const adaptiveTutorialConversation: Conversation = {
  id: 'adaptive-tutorial-example',
  title: '自适应教程对话示例',
  description: '系统根据玩家熟练度和困难点动态调整游戏教程内容',
  scenario: 'adaptiveTutorial',
  participants: {
    npc: '导师维拉',
    player: '新手法师学徒'
  },
  context: {
    location: '法师学院训练场',
    time: '上午',
    playerState: {
      level: 1,
      completedTutorials: ['基础UI操作', '移动控制'],
      struggledWith: ['法术选择界面', '元素组合'],
      skillProficiency: {
        '移动': 'high',
        '目标选择': 'medium',
        '法术施放': 'low'
      }
    }
  },
  messages: [
    {
      id: 'msg1',
      sender: 'npc',
      type: 'text',
      content: '早上好，学徒！我看你已经掌握了基本的移动技巧，这很好。今天我们将学习魔法施放的基础。',
      timestamp: '2024-03-21T09:00:00Z'
    },
    {
      id: 'msg2',
      sender: 'player',
      type: 'text',
      content: '谢谢您，维拉导师。我对魔法施放很感兴趣，但那个法术选择界面有点让我困惑。',
      timestamp: '2024-03-21T09:00:30Z'
    },
    {
      id: 'msg3',
      sender: 'npc',
      type: 'text',
      content: '很多新学徒都有这个问题，别担心。让我们先从界面开始。你可以通过按下键盘上的"F"键打开法术书，或者点击屏幕右下角的书本图标。',
      timestamp: '2024-03-21T09:01:00Z'
    },
    {
      id: 'msg4',
      sender: 'npc',
      type: 'image',
      content: '这是法术书界面，注意右侧的分类标签可以帮助你快速找到不同类型的法术。',
      imageUrl: '/images/spell_book_interface.svg',
      timestamp: '2024-03-21T09:01:30Z'
    },
    {
      id: 'msg5',
      sender: 'player',
      type: 'text',
      content: '我明白了，这比我想象的要简单。那么，我如何选择并施放法术呢？',
      timestamp: '2024-03-21T09:02:00Z'
    },
    {
      id: 'msg6',
      sender: 'npc',
      type: 'text',
      content: '很好的问题！一旦你选择了法术，它会出现在你的快捷栏中。你现在应该能看到你的第一个法术"火花"已经在快捷栏的第一个位置了。',
      timestamp: '2024-03-21T09:02:30Z'
    },
    {
      id: 'msg7',
      sender: 'npc',
      type: 'text',
      content: '要施放法术，首先按下对应的数字键选择它（火花是"1"），然后将鼠标指向目标，左键点击即可施放。试试对那个训练假人施放火花吧。',
      timestamp: '2024-03-21T09:03:00Z'
    },
    {
      id: 'msg8',
      sender: 'player',
      type: 'text',
      content: '[尝试施法但失败] 呃...没有效果？我按了1，点击了假人，但什么都没发生。',
      timestamp: '2024-03-21T09:03:30Z'
    },
    {
      id: 'msg9',
      sender: 'npc',
      type: 'text',
      content: '啊，我忘了提醒你关于法力值的事。看看屏幕左下角，有一个蓝色的条，那是你的法力值。每次施法都会消耗一定量的法力。当前你的法力值可能已经耗尽了。',
      timestamp: '2024-03-21T09:04:00Z'
    },
    {
      id: 'msg10',
      sender: 'npc',
      type: 'text',
      content: '在你的物品栏中应该有一瓶初级法力药水，使用它可以恢复法力。按"I"打开物品栏，右键点击那个蓝色的小瓶子。',
      timestamp: '2024-03-21T09:04:30Z'
    },
    {
      id: 'msg11',
      sender: 'player',
      type: 'text',
      content: '好的，我找到了。[使用药水] 现在蓝条恢复了一些。',
      timestamp: '2024-03-21T09:05:00Z'
    },
    {
      id: 'msg12',
      sender: 'npc',
      type: 'text',
      content: '完美！现在再试一次施放火花术。记住：选择法术（按1），瞄准目标，点击左键。',
      timestamp: '2024-03-21T09:05:30Z'
    },
    {
      id: 'msg13',
      sender: 'player',
      type: 'text',
      content: '[成功施法] 哇！我做到了！假人上出现了火花！',
      timestamp: '2024-03-21T09:06:00Z'
    },
    {
      id: 'msg14',
      sender: 'npc',
      type: 'text',
      content: '太棒了！你掌握得很快。我注意到你对元素组合似乎有些困难，这是更高级的技巧，但既然你对基础施法已经有了了解，我们可以简单介绍一下。',
      timestamp: '2024-03-21T09:06:30Z'
    },
    {
      id: 'msg15',
      sender: 'npc',
      type: 'text',
      content: '元素法术可以组合产生更强大的效果。例如，如果你先施放"水流术"，然后立即施放"冰冻术"，你可以创造出一个冰面，使敌人滑倒。',
      timestamp: '2024-03-21T09:07:00Z'
    },
    {
      id: 'msg16',
      sender: 'npc',
      type: 'image',
      content: '这张图展示了一些基本的元素组合效果。你可以在法术书的"组合"标签下找到更多信息。',
      imageUrl: '/images/elemental_combinations.svg',
      timestamp: '2024-03-21T09:07:30Z'
    },
    {
      id: 'msg17',
      sender: 'player',
      type: 'text',
      content: '这看起来很复杂，但也很有趣！我需要记住所有这些组合吗？',
      timestamp: '2024-03-21T09:08:00Z'
    },
    {
      id: 'msg18',
      sender: 'npc',
      type: 'text',
      content: '不必担心记忆所有组合，游戏中有一个便捷的参考系统。当你解锁新法术时，可能的组合会在法术描述中高亮显示。随着你的练习，这些组合会变得越来越自然。',
      timestamp: '2024-03-21T09:08:30Z'
    },
    {
      id: 'msg19',
      sender: 'npc',
      type: 'text',
      content: '现在，让我们继续练习基础施法。尝试对不同距离的目标施放火花术，感受一下法术的射程限制。掌握了这个，我们下节课再讨论目标选择的进阶技巧。',
      timestamp: '2024-03-21T09:09:00Z'
    },
    {
      id: 'msg20',
      sender: 'player',
      type: 'text',
      content: '谢谢您，维拉导师。这次解释非常清楚，我对法术系统有了更好的理解！',
      timestamp: '2024-03-21T09:09:30Z'
    }
  ],
  tags: ['自适应教程', '技能学习', '玩家困难点', '教学方法', '游戏机制解释']
};