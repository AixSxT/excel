// Zustand store: centralizes React Flow state and handlers.
import { create } from 'zustand';
import { addEdge as addReactFlowEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `node_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const buildInitialNodes = () => [
  { id: 'start-1', type: 'start', position: { x: 120, y: 180 }, data: { label: 'Start' } },
  { id: 'llm-1', type: 'llm', position: { x: 360, y: 160 }, data: { model: 'gpt-4', prompt: '' } },
  { id: 'output-1', type: 'output', position: { x: 620, y: 180 }, data: { result: 'Result' } },
];

const buildInitialEdges = () => [
  {
    id: 'e-start-llm',
    source: 'start-1',
    target: 'llm-1',
    sourceHandle: 'start-out',
    targetHandle: 'llm-in',
  },
  {
    id: 'e-llm-output',
    source: 'llm-1',
    target: 'output-1',
    sourceHandle: 'llm-out',
    targetHandle: 'output-in',
  },
];

const useFlowStore = create((set, get) => ({
  nodes: buildInitialNodes(),
  edges: buildInitialEdges(),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) =>
    set((state) => ({
      edges: addReactFlowEdge(connection, state.edges),
    })),

  addNode: (type, position, data = {}) => {
    const id = createId();
    const node = { id, type, position, data };
    set((state) => ({ nodes: [...state.nodes, node] }));
    return id;
  },

  resetFlow: () =>
    set({
      nodes: buildInitialNodes(),
      edges: buildInitialEdges(),
    }),

  getState: () => get(),
}));

export default useFlowStore;
