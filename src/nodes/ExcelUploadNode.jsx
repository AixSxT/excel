import React from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import useFlowStore from '../store/useFlowStore';

const ExcelUploadNode = ({ id, data = {}, selected }) => {
  const handles = [{ id: 'excel-upload-out', type: 'source', position: Position.Bottom }];
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    updateNodeData?.(id, { fileName: file.name });
  };

  const fileName = data.fileName || '未选择文件';

  return (
    <BaseNode
      title={<span style={{ color: '#10b981' }}>{data.label || 'Excel读取'}</span>}
      selected={selected}
      handles={handles}
    >
      <div className="node-field">
        <label className="node-label" htmlFor={`excel-file-${id}`}>
          上传Excel
        </label>
        <div
          className="upload-dropzone"
          style={{
            border: '1px dashed #10b981',
            borderRadius: 10,
            padding: '10px',
            background: 'rgba(16, 185, 129, 0.05)',
          }}
        >
          <input
            id={`excel-file-${id}`}
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
          <div className="upload-hint" style={{ fontSize: 12, color: '#9bb5ff', marginTop: 6 }}>
            拖拽文件到此处，或点击选择
          </div>
        </div>
        <div className="upload-filename" style={{ fontSize: 12, marginTop: 8, color: '#d9e4ff' }}>
          {fileName}
        </div>
      </div>
    </BaseNode>
  );
};

export default ExcelUploadNode;
