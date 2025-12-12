// Inspector: right-side property panel for selected nodes.
import React, { useMemo, useCallback } from 'react';
import useFlowStore from '../store/useFlowStore';

const modelOptions = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'claude', label: 'Claude' },
];

const Inspector = ({ nodeId, onClose }) => {
  const node = useFlowStore(
    useCallback((state) => state.nodes.find((n) => n.id === nodeId), [nodeId])
  );
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const title = node?.data?.label || node?.type || '节点';

  const typeLabel = useMemo(() => {
    if (!node) return '';
    return node.type;
  }, [node]);

  const setField = (patch) => {
    if (!node) return;
    updateNodeData?.(node.id, patch);
  };

  const onLabelChange = (event) => setField({ label: event.target.value });

  if (!node) return null;

  return (
    <aside className="inspector-panel" role="complementary" aria-label="属性面板">
      <div className="inspector-header">
        <button type="button" className="inspector-close" onClick={onClose} aria-label="关闭">
          ×
        </button>
        <div className="inspector-title">配置节点</div>
        <div className="inspector-spacer" />
      </div>

      <div className="inspector-body">
        <div className="inspector-section">
          <div className="inspector-section-title">基础信息</div>
          <div className="inspector-field">
            <label className="inspector-label">节点名称</label>
            <input
              className="inspector-input"
              value={node.data?.label || ''}
              onChange={onLabelChange}
              placeholder="请输入节点名称"
            />
          </div>
          <div className="inspector-meta">类型：{typeLabel}</div>
          <div className="inspector-meta">ID：{node.id}</div>
        </div>

        {(node.type === 'llm' || node.type === 'ai-process') && (
          <div className="inspector-section">
            <div className="inspector-section-title">AI 配置</div>
            <div className="inspector-field">
              <label className="inspector-label">模型</label>
              <select
                className="inspector-select"
                value={node.data?.model || modelOptions[0].value}
                onChange={(e) => setField({ model: e.target.value })}
              >
                {modelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="inspector-field">
              <label className="inspector-label">系统提示词</label>
              <textarea
                className="inspector-textarea"
                rows={4}
                value={node.data?.prompt || ''}
                onChange={(e) => setField({ prompt: e.target.value })}
                placeholder="例如：你是一个严格的数据清洗助手..."
              />
            </div>
          </div>
        )}

        {node.type === 'excel-upload' && (
          <div className="inspector-section">
            <div className="inspector-section-title">Excel 文件</div>
            <div className="inspector-meta">
              当前文件：{node.data?.fileName || '未选择'}
            </div>
          </div>
        )}

        {node.type === 'table-preview' && (
          <div className="inspector-section">
            <div className="inspector-section-title">预览</div>
            <div className="inspector-meta">该节点用于展示表格预览。</div>
          </div>
        )}

        {!['llm', 'ai-process', 'excel-upload', 'table-preview'].includes(node.type) && (
          <div className="inspector-section">
            <div className="inspector-section-title">配置</div>
            <div className="inspector-meta">该节点暂无可编辑配置。</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Inspector;
