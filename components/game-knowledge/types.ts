// 游戏类型
export interface Game {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

// 知识分类类型
export interface KnowledgeCategory {
  id: string;
  gameId: string;
  name: string;
  description: string;
  icon?: string;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

// 知识条目类型
export interface KnowledgeItem {
  id: string;
  categoryId: string;
  gameId: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  images?: string[];
  relatedItems?: string[]; // 相关条目ID列表
}

// 树节点类型
export interface TreeNode {
  id: string;
  name: string;
  type: 'game' | 'category' | 'item';
  children?: TreeNode[];
  parentId?: string;
  data?: Game | KnowledgeCategory | KnowledgeItem;
}

// 游戏知识库组件Props
export interface GameKnowledgeProps {
  initialGames?: Game[];
  readOnly?: boolean;
}

// 知识树组件Props
export interface KnowledgeTreeProps {
  nodes: TreeNode[];
  selectedNode?: TreeNode | null;
  onSelectNode: (node: TreeNode) => void;
  onAddNode?: (parentId: string, type: 'game' | 'category' | 'item') => void;
  onDeleteNode?: (nodeId: string) => void;
  readOnly?: boolean;
}

// 知识详情组件Props
export interface KnowledgeDetailProps {
  node: TreeNode | null;
  onSave?: (data: Game | KnowledgeCategory | KnowledgeItem) => void;
  onDelete?: () => void;
  readOnly?: boolean;
}

// 搜索栏组件Props
export interface SearchBarProps {
  nodes: TreeNode[];
  allTags: string[];
  onSearchResult: (results: TreeNode[]) => void;
  onClearSearch: () => void;
}

// 标签云组件Props
export interface TagCloudProps {
  nodes: TreeNode[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

// 导入导出组件Props
export interface ImportExportProps {
  treeData: TreeNode[];
  onImport: (importedData: TreeNode[]) => void;
}

// 批量导入进度类型
export interface ImportProgress {
  total: number;
  processed: number;
  success: number;
  failed: number;
}

// 导入错误类型
export interface ImportError {
  file: string;
  error: string;
}

// 示例数据类型
export interface DemoData {
  games: Game[];
  categories: KnowledgeCategory[];
  items: KnowledgeItem[];
} 