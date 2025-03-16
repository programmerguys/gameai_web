import type { Conversation } from './types';

// 导入所有场景示例
import { dynamicTaskConversation } from "./examples/dynamicTask";
import { personalizedRelationshipConversation } from "./examples/personalizedRelationship";
import { adaptiveStoryConversation } from "./examples/adaptiveStory";
import { adaptiveTutorialConversation } from "./examples/adaptiveTutorial";
import { realTimeQAConversation } from "./examples/realTimeQA";
import { invisibleTutorialConversation } from "./examples/invisibleTutorial";
import { personalizedRelationshipBuildingConversation } from "./examples/personalizedRelationshipBuilding";

// 导出所有示例对话
export const exampleConversations: Conversation[] = [
  dynamicTaskConversation,
  personalizedRelationshipConversation,
  adaptiveStoryConversation,
  adaptiveTutorialConversation,
  realTimeQAConversation,
  invisibleTutorialConversation,
  personalizedRelationshipBuildingConversation
];

// 按场景获取对话示例
export const getConversationsByScenario = (scenario: string): Conversation[] => {
  return exampleConversations.filter(conv => conv.scenario === scenario);
};

// 按ID获取对话示例
export const getConversationById = (id: string): Conversation | undefined => {
  return exampleConversations.find(conv => conv.id === id);
};

// 导出单独的示例对话，方便直接导入
export {
	dynamicTaskConversation,
	personalizedRelationshipConversation,
	adaptiveStoryConversation,
	adaptiveTutorialConversation,
	realTimeQAConversation,
	invisibleTutorialConversation,
	personalizedRelationshipBuildingConversation,
}; 