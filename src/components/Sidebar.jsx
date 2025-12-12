// Sidebar: grouped, draggable toolbox for data processing flows.
import React from 'react';

const categories = [
  {
    title: 'Inputs',
    defaultOpen: true,
    items: [
      { type: 'excel-upload', label: 'Excel Upload', icon: '[XLS]' },
      { type: 'text-input', label: 'Text Input', icon: '[TXT]' },
    ],
  },
  {
    title: 'Processing',
    defaultOpen: true,
    items: [
      { type: 'filter-rows', label: 'Filter Rows', icon: '[FLTR]' },
      { type: 'column-mapper', label: 'Column Mapper', icon: '[MAP]' },
      { type: 'formula', label: 'Formula', icon: '[?]' },
    ],
  },
  {
    title: 'Outputs',
    defaultOpen: true,
    items: [
      { type: 'export-excel', label: 'Export Excel', icon: '[XLS]' },
      { type: 'preview-table', label: 'Preview Table', icon: '[PRV]' },
    ],
  },
];

const Sidebar = () => {
  const onDragStart = (event, type) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar" style={{ background: '#1e293b' }}>
      <h3 className="sidebar-title">Toolbox</h3>
      <div className="sidebar-accordion">
        {categories.map((category) => (
          <details key={category.title} open={category.defaultOpen} className="sidebar-section">
            <summary className="sidebar-summary">{category.title}</summary>
            <div className="sidebar-list">
              {category.items.map((item) => (
                <div
                  key={item.type}
                  className="sidebar-item"
                  draggable
                  onDragStart={(event) => onDragStart(event, item.type)}
                >
                  <span className="sidebar-item-icon">{item.icon}</span>
                  <span className="sidebar-item-label">{item.label}</span>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
