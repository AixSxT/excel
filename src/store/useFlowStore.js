// Zustand store: centralizes React Flow state and handlers.
import { create } from 'zustand';
import {
  addEdge as addReactFlowEdge,
  applyEdgeChanges,
  applyNodeChanges,
  reconnectEdge,
} from 'reactflow';

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `node_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const defaultLabelsByType = {
  start: 'Start',
  llm: 'AI智能处理',
  'ai-process': 'AI智能处理',
  'excel-upload': 'Excel读取',
  'csv-read': 'CSV读取',
  'data-clean': '数据清洗',
  'type-convert': '类型转换',
  'missing-handle': '缺失值处理',
  deduplicate: '去重',
  'text-process': '文本处理',
  'date-process': '日期处理',
  'group-aggregate': '分组聚合',
  'pivot-table': '透视表',
  unpivot: '逆透视',
  'multi-join': '多表关联',
  'vertical-merge': '纵向合并',
  vlookup: 'VLOOKUP',
  'table-diff': '表格对比',
  reconcile: '对账核算',
  'python-script': 'Python脚本',
  'export-excel': '导出Excel',
  'export-csv': '导出CSV',
  output: '输出',
  'table-preview': '数据预览',
};

const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  setSelectedNode: (id) => set({ selectedNodeId: id }),
  clearSelection: () => set({ selectedNodeId: null }),

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

  onReconnect: (oldEdge, newConnection) =>
    set((state) => ({
      edges: reconnectEdge(oldEdge, newConnection, state.edges),
    })),

  deleteEdge: (id) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== id),
    })),

  updateNodeData: (id, updater) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== id) return node;
        const nextData =
          typeof updater === 'function' ? updater(node.data || {}) : updater;
        return { ...node, data: { ...(node.data || {}), ...(nextData || {}) } };
      }),
    })),

  addNode: (type, position, data = {}) => {
    const id = createId();
    const defaultLabel = defaultLabelsByType[type];
    const node = {
      id,
      type,
      position,
      data: {
        ...(defaultLabel ? { label: defaultLabel } : {}),
        ...data,
      },
    };

    set((state) => ({ nodes: [...state.nodes, node] }));
    return id;
  },

  resetFlow: () => set({ nodes: [], edges: [], selectedNodeId: null }),

  getState: () => get(),
}));

export default useFlowStore;
