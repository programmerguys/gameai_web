// NPC类型定义
export interface NPCAction {
  name: string;
  description: string;
  parameters?: Record<string, {
    description: string;
    type?: string;
    required?: boolean;
  }>;
}

export interface NPCVariable {
  name: string;
  description: string;
  example: string;
}

export type NPCStatus = 'active' | 'inactive' | 'draft';

export interface NPC {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  createdAt: string;
  updatedAt: string;
  status: NPCStatus;
  actions: NPCAction[];
  variables: NPCVariable[];
  tags: string[];
  modelId: string;
}

// 示例NPC数据
export const NPCs: NPC[] = [
  {
    id: '1',
    name: '商人马库斯',
    description: '城镇资深商人，对待顾客态度取决于过往交易和信任度',
    systemPrompt: `你是商人马库斯，经营着镇上最大的商店。你很注重生意关系和信誉。对信任的顾客友善慷慨，提供特别优惠；对陌生人保持礼貌但谨慎；对曾经欺骗过你的人冷淡甚至拒绝交易。你的语气随关系变化而变化。

根据{playerReputation}调整对话态度和价格。
如果玩家携带稀有物品，表现出兴趣。
可能向关系良好的玩家提供特殊商品或情报。
对待轻度讨价还价表示理解，但对过分压价会生气。`,
    createdAt: '2024-03-15T14:30:00Z',
    updatedAt: '2024-03-16T10:15:00Z',
    status: 'active',
    modelId: 'gpt-4',
    actions: [
      {
        name: 'openShop',
        description: '打开商店界面展示商品'
      },
      {
        name: 'offerDiscount',
        description: '为关系好的玩家提供折扣',
        parameters: {
          discountPercent: {
            description: '折扣百分比',
            type: 'number',
            required: true
          }
        }
      },
      {
        name: 'shareRumor',
        description: '分享城镇流言或任务线索'
      }
    ],
    variables: [
      {
        name: 'playerName',
        description: '玩家角色名称',
        example: '亚历克斯'
      },
      {
        name: 'playerReputation',
        description: '玩家在城镇的声望值(0-100)',
        example: '75'
      },
      {
        name: 'playerInventory',
        description: '玩家当前携带的物品',
        example: '["生锈的剑", "治疗药水x3", "神秘宝石"]'
      }
    ],
    tags: ['商人', '城镇NPC', '任务发布者']
  },
  {
    id: '2',
    name: '冒险家艾拉',
    description: '经验丰富的女猎人，擅长追踪和讲述冒险故事',
    systemPrompt: `你是冒险家艾拉，一位经验丰富的猎人和探险家。你性格直率，说话简洁有力，偶尔会分享你的冒险故事。你对森林和野外环境了如指掌，对初次见面的人保持警惕，但愿意帮助真诚的求助者。

你会根据{timeOfDay}和{currentLocation}调整对话内容。
如果是夜晚，你会特别警惕并提醒玩家注意危险。
你喜欢考验新手冒险者，可能会给他们布置小任务以验证他们的能力。`,
    createdAt: '2024-03-14T09:45:00Z',
    updatedAt: '2024-03-15T11:20:00Z',
    status: 'active',
    modelId: 'gpt-4',
    actions: [
      {
        name: 'offerHunt',
        description: '提供狩猎任务'
      },
      {
        name: 'teachTrackingSkill',
        description: '教授追踪技能'
      },
      {
        name: 'showMap',
        description: '展示地区地图并标记重要位置'
      }
    ],
    variables: [
      {
        name: 'playerName',
        description: '玩家角色名称',
        example: '罗宾'
      },
      {
        name: 'timeOfDay',
        description: '游戏中的时间',
        example: '黄昏'
      },
      {
        name: 'currentLocation',
        description: '当前位置',
        example: '西部森林'
      }
    ],
    tags: ['猎人', '冒险家', '导师']
  },
  {
    id: '3',
    name: 'PEA智能助手',
    description: '讽刺幽默的游戏内AI助手，为玩家提供引导和建议',
    systemPrompt: `你是PEA（个人电子助手），一个具有讽刺幽默感的AI助手。你的语气轻松诙谐，喜欢用玩笑和双关语。作为新手玩家的引导者，你提供游戏提示和建议，但总是以一种略带调侃的方式。

你熟知游戏的所有规则和秘密，但不会直接透露剧透。
对于玩家的明显错误，你会用幽默的方式指出。
你会根据{playerLevel}和{playerClass}调整建议的复杂度。
当玩家处于危险情况时，你会暂时放下调侃语气给出明确警告。`,
    createdAt: '2024-03-10T16:20:00Z',
    updatedAt: '2024-03-16T08:30:00Z',
    status: 'active',
    modelId: 'claude-3-opus',
    actions: [
      {
        name: 'showTutorial',
        description: '显示特定功能的教程'
      },
      {
        name: 'markObjective',
        description: '在地图上标记目标位置'
      },
      {
        name: 'analyzeEnvironment',
        description: '分析当前环境并提供提示'
      }
    ],
    variables: [
      {
        name: 'playerName',
        description: '玩家角色名称',
        example: '新手冒险者'
      },
      {
        name: 'playerLevel',
        description: '玩家等级',
        example: '5'
      },
      {
        name: 'playerClass',
        description: '玩家职业',
        example: '法师'
      },
      {
        name: 'currentQuest',
        description: '当前任务',
        example: '寻找失落的图书馆'
      }
    ],
    tags: ['教程', '引导', '幽默', 'AI助手']
  }
];

// 获取NPC列表
export async function getNPCs(filter?: {
  status?: NPCStatus,
  tags?: string[]
}): Promise<NPC[]> {
  // 模拟获取数据的延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredNPCs = [...NPCs];
  
  if (filter?.status) {
    filteredNPCs = filteredNPCs.filter(npc => npc.status === filter.status);
  }
  
  if (filter?.tags && filter.tags.length > 0) {
    filteredNPCs = filteredNPCs.filter(npc => 
      filter.tags?.some(tag => npc.tags.includes(tag))
    );
  }
  
  return filteredNPCs;
}

// 获取单个NPC
export async function getNPCById(id: string): Promise<NPC | null> {
  // 模拟获取数据的延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NPCs.find(npc => npc.id === id) || null;
}

// 创建新的NPC
export async function createNPC(npcData: Omit<NPC, 'id' | 'createdAt' | 'updatedAt'>): Promise<NPC> {
  // 模拟创建数据的延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newNPC: NPC = {
    id: `npc_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...npcData,
  };
  
  // 在实际应用中，这里会将NPC保存到数据库
  // 为了演示，我们只是返回创建的NPC
  return newNPC;
}

// 更新NPC
export async function updateNPC(npcData: NPC): Promise<NPC> {
  // 模拟更新数据的延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 在实际应用中，这里会更新数据库中的NPC
  // 为了演示，我们只是返回更新后的NPC
  return {
    ...npcData,
    updatedAt: new Date().toISOString()
  };
}

// 格式化日期
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// 生成Unity SDK代码示例
export function generateUnityCodeExample(npc: NPC): string {
  // 处理NPC名称，移除空格并保证首字母大写
  const className = npc.name.replace(/\s+/g, '');
  
  return `// =============================================
// 自动生成的代码 - ${npc.name} (${npc.id})
// 复制此代码到您的Unity项目使用此NPC
// =============================================

using UnityEngine;
using GameAI.SDK;
using System.Collections.Generic;
using System.Threading.Tasks;

public class ${className}Controller : MonoBehaviour
{
    // 自动填充您的NPC ID
    private const string CHARACTER_ID = "${npc.id}";
    
    // 引用您的GameAI Manager组件
    [SerializeField] private GameAIManager gameAIManager;
    
    // 对话UI引用
    [SerializeField] private DialogueUI dialogueUI;
    
    // NPC组件
    private AINPC npc;
    
    // 初始化
    private void Start()
    {
        // 确保GameAI已初始化
        if (gameAIManager == null)
        {
            gameAIManager = FindObjectOfType<GameAIManager>();
            if (gameAIManager == null)
            {
                Debug.LogError("请在场景中添加GameAIManager组件!");
                return;
            }
        }
        
        // 创建NPC实例
        npc = gameAIManager.CreateNPC(CHARACTER_ID);
        
        // 注册动作处理函数
${npc.actions.map(action => `        npc.RegisterAction("${action.name}", ${action.name});`).join('\n')}
        
        // 初始化NPC记忆
        InitializeNPCMemory();
    }
    
    // 更新NPC上下文
    private void UpdateNPCContext()
    {
        // 获取玩家信息
        var player = GameManager.Instance.GetPlayer();
        
        // 创建上下文字典
        Dictionary<string, object> context = new Dictionary<string, object>
        {
${npc.variables.map(variable => `            {"${variable.name}", ${getContextValueExample(variable)}}`).join(',\n')}
        };
        
        // 更新NPC上下文
        npc.UpdateContext(context);
    }
    
    // 初始化NPC记忆
    private void InitializeNPCMemory()
    {
        // 如果是新游戏，可以添加一些初始记忆
        if (GameManager.Instance.IsNewGame)
        {
            npc.AddMemory("character_background", "${escapeStringForCode(npc.description)}");
${npc.tags.map(tag => `            npc.AddMemory("tag_${tag}", "我是一名${tag}");`).join('\n')}
        }
    }
    
    // 玩家与NPC互动
    public async void Interact()
    {
        // 更新最新上下文
        UpdateNPCContext();
        
        // 打开对话UI
        dialogueUI.Open(npc.Name, GetNPCPortrait());
        
        // 获取NPC问候语
        string greeting = await npc.GetGreeting();
        dialogueUI.DisplayMessage(greeting, isNPC: true);
        
        // 启用对话输入
        dialogueUI.EnablePlayerInput(async (playerMessage) => {
            // 显示玩家输入
            dialogueUI.DisplayMessage(playerMessage, isNPC: false);
            
            // 获取NPC回复
            AIResponse response = await npc.SendMessage(playerMessage);
            
            // 显示NPC回复
            dialogueUI.DisplayMessage(response.Message, isNPC: true);
            
            // 处理NPC触发的动作
            foreach (var action in response.Actions)
            {
                ProcessNPCAction(action);
            }
        });
    }
    
    // 处理NPC触发的动作
    private void ProcessNPCAction(AIAction action)
    {
        Debug.Log($"NPC触发动作: {action.Name} - 参数: {string.Join(", ", action.Parameters)}");
        
        // 动作将通过RegisterAction中注册的回调函数自动处理
    }
    
    // 获取NPC头像
    private Sprite GetNPCPortrait()
    {
        // 示例: 返回NPC头像
        return Resources.Load<Sprite>($"NPCPortraits/{CHARACTER_ID}");
    }
    
${npc.actions.map(action => generateActionMethod(action)).join('\n\n')}
}

// =============================================
// GameAI Manager设置代码
// 放置在您游戏启动场景中
// =============================================

/*
using UnityEngine;
using GameAI.SDK;

public class GameAISetup : MonoBehaviour
{
    [SerializeField] private string apiKey = "YOUR_API_KEY_HERE";
    [SerializeField] private string gameId = "YOUR_GAME_ID_HERE";
    
    [Header("配置")]
    [SerializeField] private bool enableLogging = true;
    [SerializeField] private GameAIEnvironment environment = GameAIEnvironment.Production;
    
    [Header("缓存设置")]
    [SerializeField] private bool enableResponseCaching = true;
    [SerializeField] private int memoryCacheSize = 50;
    
    private void Awake()
    {
        // 初始化GameAI SDK
        GameAIManager.Initialize(new GameAIConfig
        {
            ApiKey = apiKey,
            GameId = gameId,
            Environment = environment,
            EnableLogging = enableLogging,
            EnableResponseCaching = enableResponseCaching,
            MemoryCacheSize = memoryCacheSize
        });
        
        Debug.Log("GameAI SDK初始化完成!");
    }
}
*/`;
}

// 生成动作方法
function generateActionMethod(action: NPCAction): string {
  // 获取参数列表
  const hasParameters = action.parameters && Object.keys(action.parameters).length > 0;
  
  let methodBody = '';
  if (hasParameters) {
    // 生成处理参数的代码
    const paramExamples = Object.entries(action.parameters || {}).map(([key, param]) => {
      return `
        // 获取${param.description}
        if (parameters.ContainsKey("${key}"))
        {
            var ${key}Value = parameters["${key}"];
            Debug.Log($"${action.name}动作参数 - ${key}: {${key}Value}");
        }`;
    }).join('');
    
    methodBody = `    // ${action.description}
    private void ${action.name}(Dictionary<string, object> parameters)
    {
        Debug.Log("执行动作: ${action.name}");${paramExamples}
        
        // 在这里实现具体的游戏逻辑
        // 例如: GameManager.Instance.ExecuteAction("${action.name}", parameters);
    }`;
  } else {
    methodBody = `    // ${action.description}
    private void ${action.name}(Dictionary<string, object> parameters)
    {
        Debug.Log("执行动作: ${action.name}");
        
        // 在这里实现具体的游戏逻辑
        // 例如: GameManager.Instance.ExecuteAction("${action.name}");
    }`;
  }
  
  return methodBody;
}

// 获取变量上下文值的示例
function getContextValueExample(variable: NPCVariable): string {
  if (variable.example.startsWith('[')) {
    return `GetPlayerInventory() // 返回JSON: ${variable.example}`;
  }
  
  if (!Number.isNaN(Number(variable.example))) {
    return `player.Get${capitalizeFirstLetter(variable.name)}() // 示例值: ${variable.example}`;
  }
  
  return `"${variable.example}" // ${variable.description}`;
}

// 首字母大写辅助函数
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// 转义代码中的字符串
function escapeStringForCode(str: string): string {
  return str.replace(/"/g, '\\"').replace(/\n/g, ' ');
}

// 智能生成NPC
export async function autoGenerateNPC(inputDescription: string): Promise<Omit<NPC, 'id' | 'createdAt' | 'updatedAt'>> {
  // 在实际应用中，这里会通过API调用AI服务来生成内容
  // 这里我们模拟一个基于简单规则的生成逻辑
  
  // 模拟API调用的延迟
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // 处理描述文本
  let description = inputDescription;
  if (!description.match(/。$/)) {
    description = `${description}。`;
  }
  
  // 分析描述中的关键词
  const isShopkeeper = /商人|商店|店主|交易|贸易|买卖|卖家/.test(description);
  const isWarrior = /战士|剑士|武士|骑士|格斗|战斗|勇士/.test(description);
  const isWizard = /法师|魔法|巫师|咒语|魔法师|巫术|施法/.test(description);
  const isGuide = /引导|教程|指导|教学|助手|帮助|指引/.test(description);
  const isHumorous = /幽默|搞笑|有趣|诙谐|笑话|逗趣|风趣/.test(description);
  
  // 根据关键词确定NPC类型和标签
  let npcName = '';
  const tags: string[] = [];
  
  // 提取名字或生成随机名字
  const nameMatch = description.match(/名叫["']?([^"']+?)["']?的/);
  
  if (isShopkeeper) {
    npcName = nameMatch ? nameMatch[1] : `${generateRandomName()}商人`;
    tags.push('商人', '城镇NPC');
  } else if (isWarrior) {
    npcName = nameMatch ? nameMatch[1] : `${generateRandomName()}战士`;
    tags.push('战士', '冒险家');
  } else if (isWizard) {
    npcName = nameMatch ? nameMatch[1] : `${generateRandomName()}法师`;
    tags.push('法师', '智者');
  } else if (isGuide) {
    npcName = nameMatch ? nameMatch[1] : `${generateRandomName()}助手`;
    tags.push('引导', '教程', '帮手');
  } else {
    npcName = nameMatch ? nameMatch[1] : generateRandomName();
    tags.push('NPC');
  }
  
  if (isHumorous) {
    tags.push('幽默');
  }
  
  // 生成相应的提示词模板
  let systemPrompt = '';
  let variables: NPCVariable[] = [];
  let actions: NPCAction[] = [];
  
  if (isShopkeeper) {
    systemPrompt = `你是${npcName}，一位在{位置}经营店铺的商人。${description}

## 个性特点
- 精明且注重生意，但公平交易
- 说话直接，略带幽默感
- 重视诚信和声誉

## 知识范围
- 了解城镇近期发生的事件和流言
- 熟悉各类商品的价值和用途
- 知道哪些冒险者可信，哪些不可信

## 互动指南
- 根据{playerReputation}调整对话态度和价格
- 如果玩家携带稀有物品，表现出兴趣
- 可能向关系良好的玩家提供特殊商品或情报
- 对待轻度讨价还价表示理解，但对过分压价会生气`;

    variables = [
      {
        name: 'playerName',
        description: '玩家角色名称',
        example: '冒险者'
      },
      {
        name: 'playerReputation',
        description: '玩家声望值',
        example: '75'
      },
      {
        name: 'playerInventory',
        description: '玩家当前携带的物品',
        example: '["生锈的剑", "治疗药水x3", "神秘宝石"]'
      },
      {
        name: '位置',
        description: '商店所在位置',
        example: '中央广场'
      }
    ];
    
    actions = [
      {
        name: 'openShop',
        description: '打开商店界面展示商品'
      },
      {
        name: 'offerDiscount',
        description: '为关系好的玩家提供折扣',
        parameters: {
          discountPercent: {
            description: '折扣百分比',
            type: 'number',
            required: true
          }
        }
      },
      {
        name: 'shareRumor',
        description: '分享城镇流言或任务线索'
      }
    ];
  } else if (isWarrior) {
    systemPrompt = `你是${npcName}，一位经验丰富的战士。${description}

## 个性特点
- 勇敢无畏，风格粗犷
- 直接坦率，说话不拐弯抹角
- 重视实力和勇气，欣赏有胆识的人

## 知识范围
- 熟悉各种武器和战斗技巧
- 了解战场策略和团队配合
- 记得许多战斗故事和英雄传说

## 互动指南
- 根据{playerClass}调整对话内容，对战士类职业更亲切
- 可能会评价玩家的装备和战斗能力
- 愿意分享战斗技巧，但更看重实战经验
- 不喜欢过度谨慎和犹豫不决的态度`;

    variables = [
      {
        name: 'playerName',
        description: '玩家角色名称',
        example: '冒险者'
      },
      {
        name: 'playerClass',
        description: '玩家职业',
        example: '法师'
      },
      {
        name: 'playerEquipment',
        description: '玩家当前装备',
        example: '{"武器": "精钢长剑", "护甲": "皮革护胸"}'
      }
    ];
    
    actions = [
      {
        name: 'teachCombatSkill',
        description: '教授战斗技巧'
      },
      {
        name: 'evaluateEquipment',
        description: '评价玩家的装备'
      },
      {
        name: 'tellWarStory',
        description: '讲述战斗故事'
      }
    ];
  } else if (isWizard) {
    systemPrompt = `你是${npcName}，一位博学多才的法师。${description}

## 个性特点
- 聪明睿智，说话考究
- 好奇心强，喜欢研究未知事物
- 态度略显高傲，但愿意指导有天赋的人

## 知识范围
- 精通各类魔法知识和理论
- 了解奇特生物和稀有材料的特性
- 掌握古代历史和失落的知识

## 互动指南
- 根据{playerIntelligence}判断玩家的理解能力
- 对法师类职业更有耐心，愿意分享更深入的知识
- 喜欢考验玩家，提出谜题或问题
- 使用专业术语，偶尔解释复杂概念`;

    variables = [
      {
        name: 'playerName',
        description: '玩家角色名称',
        example: '学徒'
      },
      {
        name: 'playerClass',
        description: '玩家职业',
        example: '法师'
      },
      {
        name: 'playerIntelligence',
        description: '玩家智力属性',
        example: '85'
      }
    ];
    
    actions = [
      {
        name: 'teachSpell',
        description: '教授法术'
      },
      {
        name: 'identifyMagicItem',
        description: '鉴定魔法物品'
      },
      {
        name: 'explainMagicTheory',
        description: '解释魔法理论'
      }
    ];
  } else if (isGuide) {
    systemPrompt = `你是${npcName}，一个游戏内的引导助手。${description}

## 个性特点
- 友好耐心，乐于助人
- 语气轻松但专业
- 偶尔使用幽默感，但不过度

## 知识范围
- 熟悉所有游戏机制和玩法
- 了解游戏内所有地区和特殊位置
- 掌握任务攻略和隐藏内容

## 互动指南
- 根据{playerLevel}调整建议的复杂度
- 为新手玩家提供更详细的引导
- 当玩家询问特定问题时提供准确信息
- 鼓励玩家探索和尝试，而不是直接给出所有答案`;

    variables = [
      {
        name: 'playerName',
        description: '玩家角色名称',
        example: '新手冒险者'
      },
      {
        name: 'playerLevel',
        description: '玩家等级',
        example: '5'
      },
      {
        name: 'currentQuest',
        description: '当前任务',
        example: '寻找失落的图书馆'
      },
      {
        name: 'gameVersion',
        description: '游戏版本',
        example: '1.2.3'
      }
    ];
    
    actions = [
      {
        name: 'showTutorial',
        description: '显示特定功能的教程'
      },
      {
        name: 'markObjective',
        description: '在地图上标记目标位置'
      },
      {
        name: 'explainMechanic',
        description: '解释游戏机制'
      }
    ];
  } else {
    systemPrompt = `你是${npcName}，一个游戏中的NPC角色。${description}

## 个性特点
- 根据玩家互动调整态度
- 说话风格独特且一致
- 有自己的目标和动机

## 知识范围
- 了解自己所在地区的情况
- 掌握与自己相关的知识
- 对游戏世界有基本认知

## 互动指南
- 保持角色一致性
- 根据{conversationHistory}回忆之前的互动
- 提供有趣且有帮助的信息
- 不破坏游戏沉浸感`;

    variables = [
      {
        name: 'playerName',
        description: '玩家角色名称',
        example: '冒险者'
      },
      {
        name: 'timeOfDay',
        description: '游戏中的时间',
        example: '黄昏'
      },
      {
        name: 'conversationHistory',
        description: '之前的对话历史',
        example: '["初次见面", "完成了第一个任务"]'
      }
    ];
    
    actions = [
      {
        name: 'greet',
        description: '向玩家打招呼'
      },
      {
        name: 'giveAdvice',
        description: '给予建议'
      },
      {
        name: 'reactToPlayer',
        description: '对玩家行为做出反应'
      }
    ];
  }
  
  // 返回生成的NPC数据
  return {
    name: npcName,
    description: description,
    systemPrompt: systemPrompt,
    status: 'draft',
    modelId: 'gpt-4',
    tags: tags,
    variables: variables,
    actions: actions
  };
}

// 生成随机名字的辅助函数
function generateRandomName(): string {
  const firstNames = ['艾', '布', '赛', '德', '艾尔', '法兰', '高', '哈', '伊', '杰', '卡', '拉', '麦', '纳', '奥', '帕', '奎', '拉', '萨', '特', '乌', '维', '维斯', '沃', '泽', '亚'];
  const lastNames = ['德', '恩', '尔', '金', '拉', '林', '克', '特', '瑞', '尔', '诺', '斯', '索', '沃克', '伊', '伦', '里', '安', '内', '福', '洛', '纳', '登', '卡', '多'];
  
  return firstNames[Math.floor(Math.random() * firstNames.length)] + 
         lastNames[Math.floor(Math.random() * lastNames.length)];
} 