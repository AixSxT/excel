// LLM node: chooses a model and captures a system prompt; uses BaseNode for styling.
import React from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

const modelOptions = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'claude', label: 'Claude' },
];

const LLMNode = ({ data = {}, selected }) => {
  const handles = [
    { id: 'llm-in', type: 'target', position: Position.Top },
    { id: 'llm-out', type: 'source', position: Position.Bottom },
  ];

  const onChange = data.onChange || (() => {});

  const handleModelChange = (event) => {
    const nextModel = event.target.value;
    onChange({ ...data, model: nextModel });
  };

  const handlePromptChange = (event) => {
    const nextPrompt = event.target.value;
    onChange({ ...data, prompt: nextPrompt });
  };

  return (
    <BaseNode title="LLM" selected={selected} handles={handles}>
      <div className="node-field">
        <label className="node-label" htmlFor="llm-model">
          Model
        </label>
        <select
          id="llm-model"
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
        <label className="node-label" htmlFor="llm-prompt">
          System Prompt
        </label>
        <textarea
          id="llm-prompt"
          rows={3}
          value={data.prompt || ''}
          onChange={handlePromptChange}
          placeholder="e.g., You are a helpful assistant..."
        />
      </div>
    </BaseNode>
  );
};

export default LLMNode;
