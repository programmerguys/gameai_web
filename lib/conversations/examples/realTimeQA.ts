import type { Conversation } from '../types';

export const realTimeQAConversation: Conversation = {
	id: "real-time-qa-example",
	title: "实时问答系统示例",
	description: "NPC根据玩家的问题实时提供相关游戏信息和指导",
	scenario: "realTimeQA",
	participants: {
		npc: "智慧之树古精灵",
		player: "迷失在森林的新手冒险者",
		system: "系统",
	},
	context: {
		location: "迷雾森林中心",
		time: "黄昏",
		playerState: {
			level: 3,
			health: "30%",
			inventory: ["破损的地图", "基础治疗药水x1", "火把x2"],
			currentQuest: "寻找丢失的挂坠",
			timePlayed: "2小时15分钟", // 游戏时长较短的新手
		},
	},
	messages: [
		{
			id: "msg1",
			sender: "player",
			type: "text",
			content: "这该死的迷雾森林，我完全迷路了...咦，那棵树在发光？",
			timestamp: "2024-03-23T18:30:00Z",
		},
		{
			id: "msg2",
			sender: "system",
			type: "text",
			content: "【玩家发现了智慧之树，触发了新的对话选项】",
			timestamp: "2024-03-23T18:30:15Z",
		},
		{
			id: "msg3",
			sender: "npc",
			type: "text",
			content:
				"欢迎，年轻的冒险者。我是这片森林的守护者。你看起来受了伤，迷失了方向。有什么我能帮助你的吗？",
			timestamp: "2024-03-23T18:30:30Z",
		},
		{
			id: "msg4",
			sender: "player",
			type: "text",
			content:
				"我在寻找一个挂坠，据说它在森林深处。但我的血量很低，而且我的地图破损了。",
			timestamp: "2024-03-23T18:31:00Z",
		},
		{
			id: "msg5",
			sender: "npc",
			type: "text",
			content:
				"我了解你的处境。首先，你的健康状况确实令人担忧。我注意到你背包里有一瓶基础治疗药水，现在使用它会是明智之举。",
			timestamp: "2024-03-23T18:31:30Z",
		},
		{
			id: "msg6",
			sender: "npc",
			type: "text",
			content:
				"关于你提到的挂坠，它可能是指月光挂坠，一个古老的精灵遗物。它确实在森林深处，但具体位置是在北面的蓝水湖底。你需要学会水下呼吸技能或获得相关药水才能取得它。",
			timestamp: "2024-03-23T18:32:00Z",
		},
		{
			id: "msg7",
			sender: "player",
			type: "text",
			content: "水下呼吸？我完全不知道这个。我该如何获得这种技能或药水？",
			timestamp: "2024-03-23T18:32:30Z",
		},
		{
			id: "msg8",
			sender: "npc",
			type: "text",
			content:
				"作为3级法师，你还无法学习水下呼吸法术，它需要8级。不过，你可以从森林边缘的药草师那里购买水下呼吸药水，价格是25金币。另外，湖边的鱼人有时会掉落腮状物，可以临时提供水下呼吸能力。",
			timestamp: "2024-03-23T18:33:00Z",
		},
		{
			id: "msg9",
			sender: "player",
			type: "image",
			content: "我刚才在路边发现了这个蓝色的蘑菇，这是什么？可以食用吗？",
			imageUrl: "/images/blue_cap_mushroom.svg",
			timestamp: "2024-03-23T18:33:30Z",
		},
		{
			id: "msg10",
			sender: "system",
			type: "text",
			content: "【系统识别玩家发现了稀有的蓝盖蘑菇，更新任务信息】",
			timestamp: "2024-03-23T18:33:45Z",
		},
		{
			id: "msg11",
			sender: "npc",
			type: "text",
			content:
				"啊！你发现了蓝盖蘑菇，这是一种珍贵的药材。不，它不能直接食用，生吃会导致幻觉和中毒。但它是制作水下呼吸药水的关键材料之一！药草师收购一个能给你2金币，而如果你收集10个并交给她，她会免费为你制作一瓶水下呼吸药水。",
			timestamp: "2024-03-23T18:34:00Z",
		},
		{
			id: "msg12",
			sender: "npc",
			type: "text",
			content:
				"这些蘑菇通常生长在老橡树的根部，当你靠近时，它们会轻微发光。你很幸运能找到一个。继续在这附近搜索，可能会找到更多。",
			timestamp: "2024-03-23T18:34:30Z",
		},
		{
			id: "msg13",
			sender: "player",
			type: "text",
			content:
				"了解了！我会搜集更多。不过要小心，我刚才看到附近有些奇怪的生物。",
			timestamp: "2024-03-23T18:35:00Z",
		},
		{
			id: "msg14",
			sender: "player",
			type: "image",
			content: "这是我刚才拍到的，这种生物危险吗？",
			imageUrl: "/images/mushroom_sprite.svg",
			timestamp: "2024-03-23T18:35:30Z",
		},
		{
			id: "msg15",
			sender: "system",
			type: "text",
			content: "【系统识别到玩家遭遇了蘑菇精灵，触发战斗警告】",
			timestamp: "2024-03-23T18:35:45Z",
		},
		{
			id: "msg16",
			sender: "npc",
			type: "text",
			content:
				"危险！那是蘑菇精灵，它们会保护蓝盖蘑菇并攻击任何试图采集的人。以你目前的健康状况，最好先使用治疗药水再接近它们。它们对火焰特别脆弱，所以使用你的火把可以吓退它们。",
			timestamp: "2024-03-23T18:36:00Z",
		},
		{
			id: "msg17",
			sender: "player",
			type: "text",
			content:
				"谢谢提醒！我会先喝药水，然后拿出火把。关于挂坠的任务，如果我无法完成，会有什么后果吗？",
			timestamp: "2024-03-23T18:36:30Z",
		},
		{
			id: "msg18",
			sender: "npc",
			type: "text",
			content:
				'寻找挂坠的任务没有严格的时间限制，你可以随时回来继续。如果你决定放弃，只需要回到森林入口的任务发布者那里，选择"放弃任务"选项。',
			timestamp: "2024-03-23T18:37:00Z",
		},
		{
			id: "msg19",
			sender: "npc",
			type: "text",
			content:
				"放弃后果是失去潜在奖励（50经验值和一件稀有防具），但不会影响你的声望或主线任务进展。不过，完成此任务会解锁一系列与精灵相关的支线任务，它们提供独特的奖励。",
			timestamp: "2024-03-23T18:37:30Z",
		},
		{
			id: "msg20",
			sender: "player",
			type: "text",
			content:
				"我决定继续任务。先使用治疗药水，然后用火把驱赶蘑菇精灵，收集蓝盖蘑菇，最后去找药草师换取水下呼吸药水。谢谢你的指导！",
			timestamp: "2024-03-23T18:38:00Z",
		},
		{
			id: "msg21",
			sender: "system",
			type: "text",
			content:
				"【任务更新：收集蓝盖蘑菇(1/10)】\n【发现新NPC：森林边缘的药草师】\n【新物品发现：蓝盖蘑菇，价值2金币，可用于合成水下呼吸药水】",
			timestamp: "2024-03-23T18:38:15Z",
		},
		{
			id: "msg22",
			sender: "npc",
			type: "text",
			content:
				"这是个明智的计划。祝你好运，年轻的冒险者。如果你在旅途中遇到更多困难，可以通过冥想（按M键）随时与我交流。愿古树的智慧指引你的道路。",
			timestamp: "2024-03-23T18:38:30Z",
		},
		{
			id: "msg23",
			sender: "npc",
			type: "text",
			content:
				"对了，我注意到天色已晚。在森林中夜晚的能见度很低，你的火把会派上用场。记得在需要时使用它们（按F键）。安全的旅程。",
			timestamp: "2024-03-23T18:39:00Z",
		},
	],
	tags: ["实时问答", "游戏指导", "动态信息", "上下文感知", "新手引导"],
};