// Entry node: marks the beginning of a flow; only exposes an output handle.
import React from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

const StartNode = ({ selected }) => {
  const handles = [{ id: 'start-out', type: 'source', position: Position.Bottom }];

  return <BaseNode title="Start" selected={selected} handles={handles} />;
};

export default StartNode;
