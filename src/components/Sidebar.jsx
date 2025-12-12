// Sidebar: hosts draggable node definitions.
import React from 'react';

const items = [
  { type: 'start', label: 'Start' },
  { type: 'llm', label: 'LLM' },
  { type: 'output', label: 'Output' },
];

const Sidebar = () => {
  const onDragStart = (event, type) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Nodes</h3>
      <div className="sidebar-list">
        {items.map((item) => (
          <div
            key={item.type}
            className="sidebar-item"
            draggable
            onDragStart={(event) => onDragStart(event, item.type)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
