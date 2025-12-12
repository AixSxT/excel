import React from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

const mockRows = [
  { name: 'Alice', age: 29, job: 'Analyst' },
  { name: 'Bob', age: 34, job: 'Engineer' },
  { name: 'Carol', age: 42, job: 'Manager' },
];

const TableNode = ({ selected }) => {
  const handles = [{ id: 'table-in', type: 'target', position: Position.Top }];

  return (
    <BaseNode title="Data Preview" selected={selected} handles={handles}>
      <div
        className="table-preview"
        style={{
          overflowX: 'auto',
          border: '1px solid #1e263d',
          borderRadius: 8,
          background: '#0f172a',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 12,
            minWidth: 260,
          }}
        >
          <thead>
            <tr style={{ background: '#1f2937', color: '#e5e7eb' }}>
              <th style={{ padding: '8px', borderBottom: '1px solid #334155', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #334155', textAlign: 'left' }}>Age</th>
              <th style={{ padding: '8px', borderBottom: '1px solid #334155', textAlign: 'left' }}>Job</th>
            </tr>
          </thead>
          <tbody>
            {mockRows.map((row, index) => (
              <tr key={index} style={{ color: '#e2e8f0' }}>
                <td style={{ padding: '8px', borderBottom: '1px solid #1f2937' }}>{row.name}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #1f2937' }}>{row.age}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #1f2937' }}>{row.job}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BaseNode>
  );
};

export default TableNode;
