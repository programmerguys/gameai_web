import type { DemoData, TreeNode } from './types';

export const demoData: DemoData = {
  games: [
    {
      id: 'game-1',
      name: '星际探险',
      description: '科幻太空探索游戏，玩家驾驶飞船探索未知星球，收集资源并与外星文明互动。',
      coverImage: '/images/games/space-adventure.jpg',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-03-01T15:45:00Z'
    },
    {
      id: 'game-2',
      name: '魔法王国',
      description: '奇幻角色扮演游戏，玩家扮演一名年轻的魔法师，学习各种魔法并拯救王国免于黑暗势力的侵袭。',
      coverImage: '/images/games/magic-kingdom.jpg',
      createdAt: '2023-11-20T14:20:00Z',
      updatedAt: '2024-02-28T09:15:00Z'
    },
    {
      id: 'game-3',
      name: '城市建设者',
      description: '模拟城市建设游戏，玩家扮演市长角色，规划和发展自己的城市，解决各种城市问题。',
      coverImage: '/images/games/city-builder.jpg',
      createdAt: '2023-09-05T11:10:00Z',
      updatedAt: '2024-01-18T16:30:00Z'
    }
  ],
  
  categories: [
    // 星际探险的分类
    {
      id: 'cat-1',
      gameId: 'game-1',
      name: '宝箱知识库',
      description: '游戏中各类宝箱的位置、内容及开启方法',
      icon: 'Treasure',
      itemCount: 8,
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-03-05T15:45:00Z'
    },
    {
      id: 'cat-2',
      gameId: 'game-1',
      name: 'BOSS怪物知识库',
      description: '游戏中各个BOSS的属性、技能和战斗策略',
      icon: 'Swords',
      itemCount: 5,
      createdAt: '2024-01-22T11:30:00Z',
      updatedAt: '2024-03-10T14:45:00Z'
    },
    {
      id: 'cat-3',
      gameId: 'game-1',
      name: '装备知识库',
      description: '游戏中各类装备的属性、获取方式和升级路径',
      icon: 'Shield',
      itemCount: 12,
      createdAt: '2024-01-25T09:30:00Z',
      updatedAt: '2024-03-12T16:45:00Z'
    },
    
    // 魔法王国的分类
    {
      id: 'cat-4',
      gameId: 'game-2',
      name: '地图知识库',
      description: '游戏中各个区域的地图、隐藏路径和特殊地点',
      icon: 'Map',
      itemCount: 7,
      createdAt: '2024-02-01T10:30:00Z',
      updatedAt: '2024-03-15T15:45:00Z'
    },
    {
      id: 'cat-5',
      gameId: 'game-2',
      name: 'NPC关系知识库',
      description: '游戏中NPC之间的关系网络、对话选项和任务线索',
      icon: 'Users',
      itemCount: 9,
      createdAt: '2024-02-05T11:30:00Z',
      updatedAt: '2024-03-18T14:45:00Z'
    },
    
    // 城市建设者的分类
    {
      id: 'cat-6',
      gameId: 'game-3',
      name: '建筑知识库',
      description: '游戏中各类建筑的功能、成本和升级路径',
      icon: 'Building',
      itemCount: 15,
      createdAt: '2024-02-10T09:30:00Z',
      updatedAt: '2024-03-20T16:45:00Z'
    }
  ],
  
  items: [
    // 星际探险-宝箱知识库的条目
    {
      id: 'item-1',
      categoryId: 'cat-1',
      gameId: 'game-1',
      title: '太空站隐藏宝箱',
      content: '在太空站的维修通道内有一个隐藏宝箱，需要使用维修钥匙才能打开。宝箱中含有高级能源核心和稀有装备图纸。\n\n获取方法：完成"修复通讯系统"任务后，从工程师处获得维修钥匙，然后前往太空站底层的维修通道。',
      tags: ['宝箱', '太空站', '稀有物品'],
      createdAt: '2024-02-15T10:30:00Z',
      updatedAt: '2024-03-01T15:45:00Z'
    },
    {
      id: 'item-2',
      categoryId: 'cat-1',
      gameId: 'game-1',
      title: '荒漠星球宝藏',
      content: '在荒漠星球的古代遗迹中心有一个大型宝藏室，需要集齐三块遗迹钥匙碎片才能开启。宝藏室内有大量稀有材料和一件传说装备。\n\n钥匙碎片位置：\n1. 第一块：沙漠商人处购买\n2. 第二块：击败沙漠巨虫后掉落\n3. 第三块：完成当地居民的"寻找失落文明"任务',
      tags: ['宝藏', '荒漠星球', '传说装备'],
      createdAt: '2024-02-16T11:30:00Z',
      updatedAt: '2024-03-02T14:45:00Z'
    },
    
    // 星际探险-BOSS知识库的条目
    {
      id: 'item-3',
      categoryId: 'cat-2',
      gameId: 'game-1',
      title: '太空站守卫者',
      content: '太空站守卫者是游戏中第一个主要BOSS，是一个失控的安保机器人。\n\n攻击模式：\n- 激光扫射：横向扫射整个平台，需要跳跃躲避\n- 无人机部署：释放小型无人机攻击玩家，优先击破\n- 护盾充能：每损失25%血量会开启护盾，此时需要攻击四周的能量节点\n\n弱点：头部的中央处理器，使用电磁类武器可以造成额外伤害。\n\n掉落物：高级电路板、守卫者核心、随机太空站装备',
      tags: ['BOSS', '机器人', '太空站'],
      createdAt: '2024-02-17T09:30:00Z',
      updatedAt: '2024-03-03T16:45:00Z'
    },
    
    // 魔法王国-地图知识库的条目
    {
      id: 'item-4',
      categoryId: 'cat-4',
      gameId: 'game-2',
      title: '古代图书馆隐藏入口',
      content: '魔法王国的古代图书馆有一个隐藏入口，通往禁忌魔法典籍区域。\n\n开启方法：在图书馆主厅的四个角落按特定顺序（北、东、南、西）点亮魔法灯，然后在中央的书架上使用"真实视界"魔法，将显示一个隐藏的门。\n\n注意：进入该区域需要至少30级的魔法师等级，否则会触发陷阱。',
      tags: ['隐藏区域', '图书馆', '禁忌魔法'],
      createdAt: '2024-02-18T10:30:00Z',
      updatedAt: '2024-03-04T15:45:00Z'
    },
    
    // 城市建设者-建筑知识库的条目
    {
      id: 'item-5',
      categoryId: 'cat-6',
      gameId: 'game-3',
      title: '高效发电厂布局',
      content: '发电厂是城市的关键基础设施，正确的布局可以提高效率并减少污染。\n\n最佳布局：\n- 将发电厂建在城市边缘，靠近水源但远离居民区\n- 周围建设配电站和变电站形成网络\n- 使用公园或树林作为缓冲区减少污染影响\n- 相邻建设回收中心可提高原料利用效率\n\n升级路径：标准发电厂 → 高效发电厂 → 清洁能源中心\n\n解锁条件：完成"电力革新"城市项目后可解锁高级发电厂类型。',
      tags: ['建筑', '发电厂', '布局优化'],
      createdAt: '2024-02-19T11:30:00Z',
      updatedAt: '2024-03-05T14:45:00Z'
    }
  ]
};

// 构建树状结构
export const buildTreeData = () => {
  const treeData: TreeNode[] = [];
  
  // 添加游戏节点
  for (const game of demoData.games) {
    const gameNode: TreeNode = {
      id: game.id,
      name: game.name,
      type: 'game',
      data: game,
      children: []
    };
    
    // 添加该游戏的分类节点
    const gameCategories = demoData.categories.filter(cat => cat.gameId === game.id);
    for (const category of gameCategories) {
      const categoryNode: TreeNode = {
        id: category.id,
        name: category.name,
        type: 'category',
        parentId: game.id,
        data: category,
        children: []
      };
      
      // 添加该分类的知识条目节点
      const categoryItems = demoData.items.filter(item => item.categoryId === category.id);
      for (const item of categoryItems) {
        const itemNode: TreeNode = {
          id: item.id,
          name: item.title,
          type: 'item',
          parentId: category.id,
          data: item
        };
        categoryNode.children?.push(itemNode);
      }
      
      gameNode.children?.push(categoryNode);
    }
    
    treeData.push(gameNode);
  }
  
  return treeData;
}; 