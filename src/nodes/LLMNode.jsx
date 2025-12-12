// LLM node: chooses a model and captures a system prompt; uses BaseNode for styling.
import React from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import useFlowStore from '../store/useFlowStore';

const modelOptions = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'claude', label: 'Claude' },
];

const LLMNode = ({ id, data = {}, selected }) => {
  const handles = [
    { id: 'llm-in', type: 'target', position: Position.Top },
    { id: 'llm-out', type: 'source', position: Position.Bottom },
  ];

  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleModelChange = (event) => {
    const nextModel = event.target.value;
    updateNodeData?.(id, { model: nextModel });
  };

  const handlePromptChange = (event) => {
    const nextPrompt = event.target.value;
    updateNodeData?.(id, { prompt: nextPrompt });
  };

  return (
    <BaseNode title={data.label || 'AI智能处理'} selected={selected} handles={handles}>
      <div className="node-field">
        <label className="node-label" htmlFor={`llm-model-${id}`}>
          模型
        </label>
        <select
          id={`llm-model-${id}`}
          value={data.model || modelOptions[0].value}
          onChange={handleModelChange}
        >
          {modelOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="node-field">
        <label className="node-label" htmlFor={`llm-prompt-${id}`}>
          系统提示词
        </label>
        <textarea
          id={`llm-prompt-${id}`}
          rows={3}
          value={data.prompt || ''}
          onChange={handlePromptChange}
          placeholder="例如：你是一个严格的数据清洗助手..."
        />
      </div>
    </BaseNode>
  );
};

export default LLMNode;
