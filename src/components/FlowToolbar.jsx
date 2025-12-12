// FlowToolbar: canvas-level actions (e.g., open node drawer).
import React from 'react';

const FlowToolbar = ({ onOpenNodeDrawer }) => (
  <div className="flow-toolbar" role="toolbar" aria-label="画布工具栏">
    <button type="button" className="flow-toolbar-add" onClick={onOpenNodeDrawer}>
      <span className="flow-toolbar-add-icon">+</span>
      添加节点
    </button>
  </div>
);

export default FlowToolbar;
