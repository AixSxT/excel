import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import Header from './components/Header';
import FlowToolbar from './components/FlowToolbar';
import NodeDrawer from './components/NodeDrawer';
import Inspector from './components/Inspector';
import ExampleStrip from './components/ExampleStrip';
import useDragDrop from './hooks/useDragDrop';
import nodeTypes from './nodes';
import useFlowStore from './store/useFlowStore';

const App = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const onConnect = useFlowStore((state) => state.onConnect);
  const storeOnReconnect = useFlowStore((state) => state.onReconnect);
  const deleteEdge = useFlowStore((state) => state.deleteEdge);
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);
  const setSelectedNode = useFlowStore((state) => state.setSelectedNode);
  const clearSelection = useFlowStore((state) => state.clearSelection);

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

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes }) => {
      const nextId = selectedNodes?.[0]?.id || null;
      setSelectedNode?.(nextId);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    clearSelection?.();
  }, [clearSelection]);

  return (
    <div className="app">
      <Header />
      <div className="app-body">
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
            onSelectionChange={onSelectionChange}
            onPaneClick={onPaneClick}
            fitView
          >
            <Controls />
            <Background variant="dots" gap={18} size={1} color="#e2e8f0" />
          </ReactFlow>

          <FlowToolbar onOpenNodeDrawer={openDrawer} />
          <NodeDrawer open={drawerOpen} onClose={closeDrawer} />
          <ExampleStrip />

          {selectedNodeId ? (
            <Inspector nodeId={selectedNodeId} onClose={() => setSelectedNode?.(null)} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
