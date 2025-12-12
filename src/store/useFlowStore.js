// Zustand store: centralizes React Flow state and handlers.
import { create } from 'zustand';
import { addEdge as addReactFlowEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `node_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const buildInitialNodes = () => [];

const buildInitialEdges = () => [];

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
