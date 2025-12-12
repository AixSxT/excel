// Output node: displays final or intermediate results.
import React from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

const OutputNode = ({ data, selected }) => {
  const handles = [{ id: 'output-in', type: 'target', position: Position.Top }];

  return (
    <BaseNode title="Output" selected={selected} handles={handles}>
      {data?.result || 'Result'}
    </BaseNode>
  );
};

export default OutputNode;
