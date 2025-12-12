// FlowToolbar: bottom centered canvas toolbar.
import React from 'react';

const zoomOptions = [25, 50, 75, 100, 125, 150];

const FlowToolbar = ({ onOpenNodeDrawer, onRun }) => (
  <div className="flow-toolbar" role="toolbar" aria-label="画布工具栏">
    <div className="flow-toolbar-group">
      <button type="button" className="flow-toolbar-icon" disabled aria-label="选择工具">
        选择
      </button>
      <select className="flow-toolbar-zoom-select" defaultValue={86} disabled aria-label="缩放">
        {zoomOptions.map((value) => (
          <option key={value} value={value}>
            {value}%
          </option>
        ))}
      </select>
      <button type="button" className="flow-toolbar-icon" disabled aria-label="视图设置">
        视图
      </button>
      <button type="button" className="flow-toolbar-icon" disabled aria-label="更多操作">
        更多
      </button>
    </div>

    <div className="flow-toolbar-divider" />

    <div className="flow-toolbar-group">
      <button type="button" className="flow-toolbar-add" onClick={onOpenNodeDrawer}>
        <span className="flow-toolbar-add-icon">+</span>
        添加节点
      </button>
      <button type="button" className="flow-toolbar-run" onClick={onRun}>
        试运行
      </button>
    </div>
  </div>
);

export default FlowToolbar;
