// Custom hook: manages drag/drop from sidebar into the React Flow canvas.
import { useCallback } from 'react';
import useFlowStore from '../store/useFlowStore';

const useDragDrop = () => {
  const addNode = useFlowStore((state) => state.addNode);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event, reactFlowInstance) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type || !reactFlowInstance) return;

      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [addNode]
  );

  return { onDragOver, onDrop };
};

export default useDragDrop;
