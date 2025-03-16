import type { Node, Edge, XYPosition } from 'reactflow';

// 节点类型
export type NodeType = 'start' | 'event' | 'choice' | 'end';

// 故事节点数据
export interface StoryNodeData {
  id: string;
  nodeType: NodeType;
  title: string;
  description: string;
  image: string;
  position: XYPosition;
  location?: string;
  characters?: string[];
  items?: string[];
}

// 故事边数据
export interface StoryEdgeData {
  label: string;
  condition?: string;
}

// 完整的故事节点类型（扩展ReactFlow Node类型）
export type StoryNode = Node<StoryNodeData>;

// 完整的故事边类型（扩展ReactFlow Edge类型）
export type StoryEdge = Edge<StoryEdgeData>;

// 故事数据结构
export interface StoryData {
  id: string;
  title: string;
  description: string;
  npcs: string[];
  goals: string[];
  nodes: StoryNodeData[];
  edges: StoryEdge[];
  createdAt: string;
  updatedAt: string;
} 