// NodeLibrary: renders categorized draggable node cards.
import React, { useMemo, useCallback } from 'react';
import nodeLibraryCategories from '../nodes/libraryConfig';

const normalize = (value) => (value || '').toLowerCase();

const NodeLibrary = ({ filterQuery = '', onAddItem }) => {
  const query = normalize(filterQuery.trim());

  const categories = useMemo(() => {
    if (!query) return nodeLibraryCategories;

    return nodeLibraryCategories
      .map((category) => {
        const items = category.items.filter((item) => {
          const haystack = normalize(
            [item.label, item.description, item.type].filter(Boolean).join(' ')
          );
          return haystack.includes(query);
        });
        return { ...category, items, defaultOpen: true };
      })
      .filter((category) => category.items.length > 0);
  }, [query]);

  const onDragStart = useCallback((event, type) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return (
    <div className="node-library" role="navigation" aria-label="节点库">
      <div className="sidebar-accordion">
        {categories.map((category) => (
          <details
            key={category.title}
            open={category.defaultOpen}
            className="sidebar-section"
          >
            <summary className="sidebar-summary">
              <span className="sidebar-summary-icon" style={{ color: category.accent }}>
                {category.icon}
              </span>
              <span className="sidebar-summary-title" style={{ color: category.accent }}>
                {category.title}
              </span>
            </summary>

            <div className="sidebar-list">
              {category.items.map((item) => (
                <div
                  key={item.type}
                  className="sidebar-card"
                  draggable
                  onDragStart={(event) => onDragStart(event, item.type)}
                >
                  <div
                    className="sidebar-card-icon"
                    style={{ background: item.accent }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>

                  <div className="sidebar-card-body">
                    <div className="sidebar-card-title">{item.label}</div>
                    <div className="sidebar-card-subtitle">{item.description}</div>
                  </div>

                  <button
                    type="button"
                    className="sidebar-card-add"
                    draggable={false}
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation();
                      onAddItem?.(item);
                    }}
                    aria-label={`添加 ${item.label}`}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </details>
        ))}
        {categories.length === 0 ? (
          <div className="node-library-empty">没有匹配的节点</div>
        ) : null}
      </div>
    </div>
  );
};

export default NodeLibrary;
