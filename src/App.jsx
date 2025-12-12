import React, { useCallback, useRef, useState } from 'react';
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
  const storeOnReconnect = useFlowStore((state) => state.onReconnect);
  const deleteEdge = useFlowStore((state) => state.deleteEdge);

  const { onDragOver, onDrop } = useDragDrop();

  const handleDrop = useCallback(
    (event) => onDrop(event, reactFlowInstance),
    [onDrop, reactFlowInstance]
  );

  const isValidConnection = useCallback(
    (connection) => connection?.source !== connection?.target,
    []
  );

  const edgeReconnectSuccessful = useRef(false);

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge, newConnection) => {
      if (typeof storeOnReconnect !== 'function') {
        console.warn('[Flow] store.onReconnect is missing; skipping edge reconnect.');
        edgeReconnectSuccessful.current = true;
        return;
      }

      storeOnReconnect(oldEdge, newConnection);
      edgeReconnectSuccessful.current = true;
    },
    [storeOnReconnect]
  );

  const onReconnectEnd = useCallback(
    (_event, edge) => {
      if (!edgeReconnectSuccessful.current && edge?.id) {
        if (typeof deleteEdge !== 'function') {
          console.warn('[Flow] store.deleteEdge is missing; cannot delete edge.');
        } else {
          deleteEdge(edge.id);
        }
      }
      edgeReconnectSuccessful.current = false;
    },
    [deleteEdge]
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
            onReconnectStart={onReconnectStart}
            onReconnect={onReconnect}
            onReconnectEnd={onReconnectEnd}
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
