'use client';

import { useCallback, useEffect } from 'react';
import ReactFlow, {
	Background,
	Controls,
	MiniMap,
	Panel,
	useReactFlow,
	useNodesState,
	useEdgesState,
	addEdge,
	ConnectionLineType,
	MarkerType,
	type Connection,
	type NodeChange,
	type EdgeChange,
	type Node,
	BackgroundVariant,
} from "reactflow";
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  ZoomIn, 
  ZoomOut, 
  Focus, 
  Maximize,
} from 'lucide-react';
import type { StoryNode, StoryEdge } from './types';
import StoryNodeComponent from './StoryNode';

// 自定义节点类型
const nodeTypes = {
  storyNode: StoryNodeComponent
};

// 自定义边（连接）类型和样式
const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: '#666' },
  type: 'smoothstep',
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
  },
  curvature: 0.5,
};

interface StoryFlowProps {
  nodes: StoryNode[];
  edges: StoryEdge[];
  onNodesChange: (nodes: StoryNode[]) => void;
  onEdgesChange: (edges: StoryEdge[]) => void;
  onNodeSelect: (node: StoryNode | null) => void;
  onConnect?: (params: Connection) => void;
  onAddNode?: () => void;
  readOnly?: boolean;
  fitView?: boolean;
}

const StoryFlow = ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange,
  onEdgesChange,
  onNodeSelect,
  onConnect,
  onAddNode,
  readOnly = false,
  fitView = true,
}: StoryFlowProps) => {
  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(initialEdges);
  const { fitView: fitViewport, zoomIn, zoomOut, setViewport } = useReactFlow();
  
  // 当外部nodes和edges变化时更新内部状态
  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);
  
  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  // 节点变更处理
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChangeInternal(changes);
      // 将变更后的节点传递给父组件
      setTimeout(() => {
        onNodesChange(nodes);
      }, 0);
    },
    [nodes, onNodesChange, onNodesChangeInternal]
  );

  // 边变更处理
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChangeInternal(changes);
      // 将变更后的边传递给父组件
      setTimeout(() => {
        onEdgesChange(edges);
      }, 0);
    },
    [edges, onEdgesChange, onEdgesChangeInternal]
  );

  // 连接处理
  const handleConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `e${params.source}-${params.target}`,
        data: { label: '连接' },
        ...defaultEdgeOptions,
        curvature: 0.5,
      };
      
      if (onConnect) {
        onConnect(params);
      } else {
        setEdges((eds) => addEdge(newEdge, eds));
        setTimeout(() => {
          onEdgesChange(edges);
        }, 0);
      }
    },
    [edges, onConnect, onEdgesChange, setEdges]
  );

  // 节点选择处理
  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const typedNode = node as StoryNode;
      onNodeSelect(typedNode);
    },
    [onNodeSelect]
  );

  // 背景点击处理 - 清除选择
  const handlePaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  return (
    <div className="absolute inset-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: '#666', strokeWidth: 3 }}
        snapToGrid={true}
        snapGrid={[20, 20]}
        fitView={fitView}
        fitViewOptions={{ padding: 0.4, includeHiddenNodes: false }}
        minZoom={0.1}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        className="bg-white rounded-md border"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={15}
          size={1}
          color="#e5e7eb"
          className="bg-gray-50"
        />
        <Controls
          position="bottom-right"
          showInteractive={false}
          className="bg-white border shadow-sm"
        />
        <MiniMap
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            switch (node.data.nodeType) {
              case 'start': return '#10b981';
              case 'choice': return '#6366f1';
              case 'event': return '#f59e0b';
              case 'end': return '#f43f5e';
              default: return '#94a3b8';
            }
          }}
          maskColor="rgba(240, 240, 246, 0.4)"
          className="border shadow-sm"
        />
        
        {/* 顶部工具栏 */}
        <Panel position="top-left" className="bg-white p-2 rounded-md border shadow-sm flex space-x-2">
          {onAddNode && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAddNode} 
              className="text-xs h-8"
              disabled={readOnly}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              添加节点
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fitViewport()}
            className="text-xs h-8"
          >
            <Focus className="h-3.5 w-3.5 mr-1" />
            适应视图
          </Button>
          <div className="flex border rounded-md">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => zoomIn({ duration: 300 })} 
              className="h-8 px-2"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => zoomOut({ duration: 300 })} 
              className="h-8 px-2"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 300 })} 
              className="h-8 px-2"
            >
              <Maximize className="h-3.5 w-3.5" />
            </Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default StoryFlow; 