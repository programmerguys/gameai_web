import type { ModelData } from '@/components/marketplace/ModelCard';

// 模拟用户数据
interface UserData {
  id: string;
  name: string;
  points: number;
  email: string;
}

// 模拟数据 - 在实际应用中，这些数据会从API获取
const mockModels: ModelData[] = [
  {
    id: '1',
    name: '幻想城堡',
    thumbnailUrl: '/images/models/fantasy-castle.jpg',
    description: '一个精美的幻想风格的城堡模型，适合RPG和冒险类游戏使用。',
    authorName: '张三',
    pointsPrice: 120,
    tags: ['建筑', '幻想', '中世纪'],
    rating: 4.5,
    downloads: 253,
    type: '3d_model',
    createdAt: '2024-03-15T08:32:45Z'
  },
  {
    id: '2',
    name: '科幻战机',
    thumbnailUrl: '/images/models/sci-fi-fighter.jpg',
    description: '未来风格的科幻战斗机，包含高精度纹理和动画。',
    authorName: '李四',
    pointsPrice: 180,
    tags: ['飞行器', '科幻', '载具'],
    rating: 4.8,
    downloads: 417,
    type: '3d_model',
    createdAt: '2024-03-10T11:24:19Z'
  },
  {
    id: '3',
    name: '炫彩霓虹材质包',
    thumbnailUrl: '/images/models/neon-textures.jpg',
    description: '一套霓虹风格的材质纹理包，为您的游戏增添现代感。',
    authorName: '王五',
    pointsPrice: 80,
    tags: ['纹理', '霓虹', '现代'],
    rating: 4.2,
    downloads: 189,
    type: 'texture',
    createdAt: '2024-03-18T14:56:32Z'
  },
  {
    id: '4',
    name: '森林环境套装',
    thumbnailUrl: '/images/models/forest-pack.jpg',
    description: '包含各种树木、岩石和地形的森林环境模型套装。',
    authorName: '赵六',
    pointsPrice: 200,
    tags: ['自然', '环境', '植物'],
    rating: 4.7,
    downloads: 326,
    type: '3d_model',
    createdAt: '2024-02-28T09:15:47Z'
  },
  {
    id: '5',
    name: '卡通人物角色',
    thumbnailUrl: '/images/models/cartoon-character.jpg',
    description: '一个可爱的卡通风格人物模型，带有完整的骨骼绑定。',
    authorName: '孙七',
    pointsPrice: 150,
    tags: ['角色', '卡通', '动画'],
    rating: 4.6,
    downloads: 275,
    type: '3d_model',
    createdAt: '2024-03-05T16:43:21Z'
  },
  {
    id: '6',
    name: '金属材质包',
    thumbnailUrl: '/images/models/metal-textures.jpg',
    description: '高质量的金属材质纹理集合，包含多种金属类型和效果。',
    authorName: '张三',
    pointsPrice: 90,
    tags: ['纹理', '金属', '工业'],
    rating: 4.3,
    downloads: 142,
    type: 'texture',
    createdAt: '2024-03-20T10:22:38Z'
  }
];

// 模拟用户数据
const mockUser: UserData = {
  id: 'user1',
  name: '游戏开发者',
  points: 500,
  email: 'dev@example.com'
};

// 获取所有市场模型
export async function getMarketplaceModels(): Promise<ModelData[]> {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockModels;
}

// 获取当前用户信息
export async function getCurrentUser(): Promise<UserData> {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockUser;
}

// 根据ID获取模型详情
export async function getModelById(id: string): Promise<ModelData | null> {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 700));
  const model = mockModels.find(model => model.id === id);
  return model || null;
}

// 获取用户拥有的模型
export async function getUserModels(): Promise<ModelData[]> {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  // 在实际应用中，这里会返回用户购买/创建的模型
  // 这里为了演示，我们返回一个空数组，表示用户尚未拥有模型
  return [];
}

// 计算作者奖励积分
export function calculateAuthorReward(modelPrice: number): number {
  // 作者获得模型价格的30%作为奖励
  return Math.floor(modelPrice * 0.3);
}

// 执行二次创作
export async function performRecreation(modelId: string): Promise<{ success: boolean; message: string }> {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // 获取模型
  const model = await getModelById(modelId);
  if (!model) {
    return { success: false, message: '找不到指定模型' };
  }
  
  // 检查用户积分是否足够
  const user = await getCurrentUser();
  if (user.points < model.pointsPrice) {
    return { success: false, message: '积分不足' };
  }
  
  // 模拟扣除积分和创建二次创作过程
  // 在实际应用中，这里会更新用户积分和创建新的模型记录
  mockUser.points -= model.pointsPrice;
  
  return { 
    success: true, 
    message: `已成功基于"${model.name}"创建二次创作，消耗了${model.pointsPrice}积分`
  };
} 