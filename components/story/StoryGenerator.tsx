'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
  ReactFlowProvider, 
  type Connection, 
  useNodesState, 
  useEdgesState,
  addEdge,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import type { StoryNode, StoryEdge, StoryData, NodeType, StoryNodeData } from './types';
import StoryFlow from './StoryFlow';
import StoryEditor from './StoryEditor';
import { demoStory } from './demo-data';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

// 节点的默认位置
const DEFAULT_NODE_POSITION = { x: 100, y: 100 };

interface StoryGeneratorProps {
  initialStory?: StoryData;
  readOnly?: boolean;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({
  initialStory = demoStory,
  readOnly = false
}) => {
  // 故事数据状态
  const [story, setStory] = useState<StoryData>(initialStory);
  
  // ReactFlow 节点和边状态
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  
  // 当前选中的节点
  const [selectedNode, setSelectedNode] = useState<StoryNode | null>(null);
  
  // 用户需求输入
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // 初始化故事数据
  useEffect(() => {
    if (initialStory) {
      setStory(initialStory);
      
      // 转换节点数据为ReactFlow格式
      const storyNodes = initialStory.nodes.map(node => ({
        id: node.id,
        type: 'storyNode',
        position: node.position || DEFAULT_NODE_POSITION,
        data: node,
        draggable: !readOnly,
      }));
      
      setNodes(storyNodes);
      setEdges(initialStory.edges);
    }
  }, [initialStory, setNodes, setEdges, readOnly]);
  
  // 更新故事基本信息
  const handleStoryUpdate = useCallback((updatedStory: Partial<StoryData>) => {
    setStory(prev => ({ ...prev, ...updatedStory }));
  }, []);
  
  // 创建新节点
  const handleAddNode = useCallback(() => {
    const newId = uuidv4();
    const nodeType: NodeType = 'event';
    
    const newNodeData: StoryNodeData = {
      id: newId,
      nodeType,
      title: '新节点',
      description: '请编辑此节点内容...',
      image: '/images/story/event.svg',
      position: {
        x: 300 + Math.random() * 1200,
        y: 200 + Math.random() * 600
      },
      characters: [],
      items: []
    };
    
    const newNode = {
      id: newId,
      type: 'storyNode',
      position: newNodeData.position,
      data: newNodeData,
      draggable: !readOnly,
    };
    
    setNodes(nds => [...nds, newNode]);
    
    // 更新故事数据
    setStory(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNodeData]
    }));
    
    // 选中新创建的节点
    setSelectedNode(newNode);
  }, [setNodes, readOnly]);
  
  // 更新节点数据
  const handleNodesChange = useCallback((changedNodes: StoryNode[]) => {
    // 更新故事数据中的节点
    const nodeData = changedNodes.map(node => {
      const { data } = node;
      return {
        ...data,
        position: node.position
      };
    });
    
    setStory(prev => ({
      ...prev,
      nodes: nodeData
    }));
    
    // 如果当前有选中的节点，更新它的引用
    if (selectedNode) {
      const updatedSelectedNode = changedNodes.find(n => n.id === selectedNode.id);
      if (updatedSelectedNode) {
        setSelectedNode(updatedSelectedNode);
      }
    }
  }, [selectedNode]);
  
  // 更新边数据
  const handleEdgesChange = useCallback((changedEdges: StoryEdge[]) => {
    // 更新故事数据中的边
    setStory(prev => ({
      ...prev,
      edges: changedEdges
    }));
  }, []);
  
  // 选择节点
  const handleNodeSelect = useCallback((node: StoryNode | null) => {
    setSelectedNode(node);
  }, []);
  
  // 创建连接
  const handleConnect = useCallback((connection: Connection) => {
    // 创建新的边
    const newEdge = {
      ...connection,
      id: `e-${connection.source}-${connection.target}`,
      data: {
        label: '下一步',
        condition: '',
      },
    };
    
    setEdges(eds => addEdge(newEdge, eds));
    
    // 更新故事数据
    setStory(prev => ({
      ...prev,
      edges: [...prev.edges, newEdge as StoryEdge]
    }));
  }, [setEdges]);
  
  // 更新节点
  const handleNodeUpdate = useCallback((updatedNodeData: Partial<StoryNodeData>) => {
    if (!selectedNode) return;
    
    // 更新节点
    setNodes(nds => {
      return nds.map(node => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updatedNodeData
            }
          };
        }
        return node;
      });
    });
    
    // 更新故事数据
    setStory(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => {
        if (node.id === selectedNode.data.id) {
          return {
            ...node,
            ...updatedNodeData
          };
        }
        return node;
      })
    }));
  }, [selectedNode, setNodes]);
  
  // 删除节点
  const handleDeleteNode = useCallback(() => {
    if (!selectedNode) return;
    
    // 删除节点
    setNodes(nds => nds.filter(node => node.id !== selectedNode.id));
    
    // 删除与该节点相关的所有边
    setEdges(eds => eds.filter(
      edge => edge.source !== selectedNode.id && edge.target !== selectedNode.id
    ));
    
    // 更新故事数据
    setStory(prev => ({
      ...prev,
      nodes: prev.nodes.filter(node => node.id !== selectedNode.data.id),
      edges: prev.edges.filter(
        edge => edge.source !== selectedNode.id && edge.target !== selectedNode.id
      )
    }));
    
    // 清除选中状态
    setSelectedNode(null);
  }, [selectedNode, setNodes, setEdges]);
  
  // 处理需求生成
  const handleGenerateFromPrompt = () => {
    if (!userPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // 这里可以添加实际的生成逻辑，调用API等
    // 示例实现，仅用于演示
    setTimeout(() => {
      // 模拟处理完成
      console.log(`正在根据需求生成内容: ${userPrompt}`);
      
      // 实际应用中应该调用真实的生成API
      
      setIsGenerating(false);
      setUserPrompt(''); // 清空输入
    }, 1500);
  };
  
  return (
    <div className="flex flex-col w-full h-full">
      {/* 主编辑区域 - 流程图和属性面板 */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* 编辑器左侧 - 流程图 */}
        <div className="w-2/3 relative">
          <ReactFlowProvider>
            <StoryFlow 
              nodes={nodes}
              edges={edges}
              onNodesChange={handleNodesChange}
              onEdgesChange={handleEdgesChange}
              onNodeSelect={handleNodeSelect}
              onConnect={handleConnect}
              onAddNode={!readOnly ? handleAddNode : undefined}
              readOnly={readOnly}
            />
          </ReactFlowProvider>
        </div>
        
        {/* 编辑器右侧 - 属性编辑面板 */}
        <div className="w-1/3 border-l bg-gray-50 overflow-auto p-4">
          <StoryEditor 
            story={story}
            selectedNode={selectedNode?.data || null}
            onStoryChange={handleStoryUpdate}
            onNodeChange={handleNodeUpdate}
            onDeleteNode={handleDeleteNode}
            readOnly={readOnly}
          />
        </div>
      </div>
      
      {/* 底部输入区域 */}
      <div className="w-full p-4 border-t bg-white">
        <div className="flex gap-2">
          <Textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="输入你的需求，例如：'创建一个太空冒险故事' 或 '添加一个关于外星人的分支情节'"
            className="flex-1 min-h-[60px] resize-none"
            disabled={isGenerating || readOnly}
          />
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleGenerateFromPrompt} 
              disabled={!userPrompt.trim() || isGenerating || readOnly}
              className="h-12 px-4"
            >
              <Wand2 className="mr-2 h-5 w-5" />
              生成内容
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setUserPrompt('')}
              disabled={!userPrompt.trim() || isGenerating || readOnly}
              className="h-10 px-4"
            >
              清空
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          提示：可以描述故事主题、角色关系、情节转折点等，AI将为你生成合适的节点和连接。
        </p>
      </div>
    </div>
  );
};

export default StoryGenerator; 