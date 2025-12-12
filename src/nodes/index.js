// Node registry: central place to map node type keys to components.
import StartNode from './StartNode';
import LLMNode from './LLMNode';
import OutputNode from './OutputNode';

export const nodeTypes = {
  start: StartNode,
  llm: LLMNode,
  output: OutputNode,
};

export default nodeTypes;
