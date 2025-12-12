// NodeDrawer: toggled drawer/popup that hosts the NodeLibrary.
import React, { useEffect, useState, useCallback } from 'react';
import NodeLibrary from './NodeLibrary';
import useFlowStore from '../store/useFlowStore';

const NodeDrawer = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const addNode = useFlowStore((state) => state.addNode);
  const nodesCount = useFlowStore((state) => state.nodes.length);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const handleAddItem = useCallback(
    (item) => {
      if (typeof addNode !== 'function') return;

      const position = {
        x: 360,
        y: 80 + nodesCount * 120,
      };

      addNode(item.type, position, { label: item.label });
      onClose?.();
    },
    [addNode, nodesCount, onClose]
  );

  if (!open) return null;

  return (
    <div className="node-drawer-root" aria-hidden={!open}>
      <div className="node-drawer-backdrop" onClick={onClose} />
      <div
        className="node-drawer-panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="添加节点"
      >
        <div className="node-drawer-header">
          <input
            className="node-drawer-search"
            placeholder="搜索节点、插件、工作流"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            type="button"
            className="node-drawer-close"
            onClick={onClose}
            aria-label="关闭"
          >
            ×
          </button>
        </div>
        <NodeLibrary filterQuery={query} onAddItem={handleAddItem} />
      </div>
    </div>
  );
};

export default NodeDrawer;
