import React, { useCallback, useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import useDragDrop from './hooks/useDragDrop';
import nodeTypes from './nodes';
import useFlowStore from './store/useFlowStore';

const App = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const onConnect = useFlowStore((state) => state.onConnect);

  const { onDragOver, onDrop } = useDragDrop();

  const handleDrop = useCallback(
    (event) => onDrop(event, reactFlowInstance),
    [onDrop, reactFlowInstance]
  );

  const isValidConnection = useCallback(
    (connection) => connection?.source !== connection?.target,
    []
  );

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <div className="flow-wrapper">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={handleDrop}
            onDragOver={onDragOver}
            isValidConnection={isValidConnection}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default App;
