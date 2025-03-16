import { v4 as uuidv4 } from 'uuid';
import type { StoryData, StoryNodeData, StoryEdge, NodeType } from './types';

// 创建唯一ID
const createId = () => uuidv4();

// 创建节点辅助函数
const createNode = (
	id: string,
	nodeType: NodeType,
	title: string,
	description: string,
	x: number,
	y: number,
	image: string,
	location = "",
	characters: string[] = [],
	items: string[] = [],
): StoryNodeData => ({
	id,
	nodeType,
	title,
	description,
	image,
	position: { x, y },
	location,
	characters,
	items,
});

// 创建边辅助函数
const createEdge = (source: string, target: string, label = '下一步', condition = ''): StoryEdge => ({
  id: `e-${source}-${target}`,
  source,
  target,
  data: {
    label,
    condition
  }
});

// 节点ID
const startId = createId();
const findMapId = createId();
const findKeyId = createId();
const findTreasureId = createId();
const meetOwnerMaleId = createId();
const meetOwnerFemaleId = createId();
const escapeId = createId();
const endSuccessId = createId();
const endFailureId = createId();

// 创建演示故事 - 古堡的秘密
export const demoStory: StoryData = {
  id: createId(),
  title: '古堡的秘密',
  description: '探险队在一座古老的城堡中探索，寻找传说中的宝藏。然而，城堡中隐藏着种种谜团和危险...',
  npcs: ['管家老汤姆', '神秘的女主人', '守护骑士幽灵'],
  goals: ['找到隐藏的宝藏', '揭开城堡的秘密', '安全离开城堡'],
  
  // 故事节点
  nodes: [
    // 起点 - 进入城堡
    createNode(
      startId,
      'start',
      '进入古堡',
      '探险队小心翼翼地推开沉重的橡木大门，踏入这座已被遗忘数百年的古老城堡。大厅里回荡着奇怪的回音，墙上的肖像画似乎在注视着你们...',
      100, 100,
      '/images/story/start.svg',
      '城堡大厅',
      ['探险队长', '年轻考古学家'],
      ['手电筒', '地图']
    ),
    
    // 事件 - 找到地图
    createNode(
      findMapId,
      'event',
      '找到古老地图',
      '在城堡的图书室里，你们发现了一张泛黄的地图，上面标记着城堡的秘密通道和一个宝藏室的位置。',
      500, 300,
      '/images/story/event.svg',
      '城堡图书室',
      ['图书管理员幽灵'],
      ['古老的地图', '羊皮卷']
    ),
    
    // 选择 - 寻找钥匙
    createNode(
      findKeyId,
      'choice',
      '寻找钥匙',
      '地图显示宝藏室需要一把特殊的钥匙才能打开。你们可以选择在主卧室或地下室寻找。',
      900, 300,
      '/images/story/choice.svg',
      '城堡中庭',
      ['管家老汤姆'],
      ['地图', '火把']
    ),
    
    // 事件 - 找到宝藏
    createNode(
      findTreasureId,
      'event',
      '发现宝藏室',
      '顺着密道，你们终于来到了传说中的宝藏室。黄金、珠宝和艺术品闪烁着诱人的光芒。然而，就在这时，你们听到了脚步声...',
      1300, 500,
      '/images/story/event.svg',
      '宝藏密室',
      [],
      ['宝箱', '金币', '古代艺术品']
    ),
    
    // 选择 - 遇到男主人
    createNode(
      meetOwnerMaleId,
      'choice',
      '遇到城堡男主人',
      '一位穿着古典礼服的男子突然出现。他自称是城堡的主人，声称这些宝藏归他所有。你是要与他交涉还是试图逃跑？',
      1700, 300,
      '/images/story/choice.svg',
      '宝藏密室',
      ['城堡男主人'],
      ['宝剑', '魔法护符']
    ),
    
    // 选择 - 遇到女主人
    createNode(
      meetOwnerFemaleId,
      'choice',
      '遇到城堡女主人',
      '一位优雅的女士从阴影中走出。她自称是城堡的女主人，表示愿意让你们带走部分宝藏，但有一个条件...',
      1700, 700,
      '/images/story/choice.svg',
      '宝藏密室',
      ['神秘的女主人'],
      ['古老的契约', '月光宝石']
    ),
    
    // 事件 - 逃离城堡
    createNode(
      escapeId,
      'event',
      '逃离城堡',
      '带着宝藏，你们匆忙穿过蜿蜒的走廊，寻找出口。身后传来的奇怪声音催促着你们加快脚步...',
      1300, 900,
      '/images/story/event.svg',
      '城堡走廊',
      ['探险队员们'],
      ['宝藏袋', '火把']
    ),
    
    // 结局 - 成功
    createNode(
      endSuccessId,
      'end',
      '成功逃脱',
      '在黎明到来之前，你们成功逃出了古堡，带着宝藏和解开的谜团。这段冒险将永远铭刻在每个人的记忆中。',
      900, 900,
      '/images/story/end.svg',
      '城堡外',
      ['探险队全员'],
      ['宝藏', '古堡地图', '神秘钥匙']
    ),
    
    // 结局 - 失败
    createNode(
      endFailureId,
      'end',
      '永久囚禁',
      '你们被困在了城堡中，成为它永恒的囚徒。随着时间流逝，你们渐渐忘记了外界的样子，成为了城堡众多幽灵中的一部分。',
      1700, 900,
      '/images/story/end.svg',
      '城堡深处',
      ['新的幽灵们'],
      []
    )
  ],
  
  // 故事边 - 连接节点
  edges: [
    // 起点 -> 找到地图
    createEdge(startId, findMapId, '探索城堡'),
    
    // 找到地图 -> 寻找钥匙
    createEdge(findMapId, findKeyId, '阅读地图'),
    
    // 寻找钥匙 -> 找到宝藏
    createEdge(findKeyId, findTreasureId, '找到钥匙'),
    
    // 找到宝藏 -> 遇到男主人
    createEdge(findTreasureId, meetOwnerMaleId, '50%概率'),
    
    // 找到宝藏 -> 遇到女主人
    createEdge(findTreasureId, meetOwnerFemaleId, '50%概率'),
    
    // 遇到男主人 -> 逃离城堡
    createEdge(meetOwnerMaleId, escapeId, '交涉成功'),
    
    // 遇到男主人 -> 失败结局
    createEdge(meetOwnerMaleId, endFailureId, '交涉失败'),
    
    // 遇到女主人 -> 逃离城堡
    createEdge(meetOwnerFemaleId, escapeId, '接受条件'),
    
    // 逃离城堡 -> 成功结局
    createEdge(escapeId, endSuccessId, '找到出口'),
    
    // 逃离城堡 -> 失败结局
    createEdge(escapeId, endFailureId, '迷失方向')
  ],
  
  // 时间戳
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};