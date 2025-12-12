// Node registry: central place to map node type keys to components.
import StartNode from './StartNode';
import LLMNode from './LLMNode';
import OutputNode from './OutputNode';
import ExcelUploadNode from './ExcelUploadNode';
import TableNode from './TableNode';

export const nodeTypes = {
  start: StartNode,
  llm: LLMNode,
  'ai-process': LLMNode,
  output: OutputNode,
  'excel-upload': ExcelUploadNode,
  'table-preview': TableNode,
};

export default nodeTypes;
