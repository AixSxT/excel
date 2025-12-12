// BaseNode: shared UI shell so individual nodes only worry about business content.
import React from 'react';
import { Handle, Position } from 'reactflow';

const defaultHandles = [
  { id: 'in', type: 'target', position: Position.Top },
  { id: 'out', type: 'source', position: Position.Bottom },
];

const coercePosition = (position) => {
  if (!position) return Position.Bottom;
  if (typeof position === 'string') {
    const key = position.charAt(0).toUpperCase() + position.slice(1).toLowerCase();
    return Position[key] || Position.Bottom;
  }
  return position;
};

const BaseNode = ({ title, selected, handles = defaultHandles, children }) => (
  <div className={`base-node${selected ? ' is-selected' : ''}`}>
    {handles.map((handle, index) => {
      const { id, type, position, ...rest } = handle;
      const handleKey = id || `${type}-${index}`;
      return (
        <Handle
          key={handleKey}
          id={id}
          type={type}
          position={coercePosition(position)}
          {...rest}
        />
      );
    })}

    <div className="node-body">
      {title ? <div className="node-title">{title}</div> : null}
      <div className="node-content">{children}</div>
    </div>
  </div>
);

export default BaseNode;
