import React, { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

const ExcelUploadNode = ({ data = {}, selected }) => {
  const handles = [{ id: 'excel-upload-out', type: 'source', position: Position.Bottom }];
  const [fileName, setFileName] = useState(data.fileName || 'No file selected');
  const onChange = data.onChange || (() => {});

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange({ ...data, fileName: file.name });
    }
  };

  return (
    <BaseNode
      title={<span style={{ color: '#10b981' }}>Excel Upload</span>}
      selected={selected}
      handles={handles}
    >
      <div className="node-field">
        <label className="node-label" htmlFor="excel-file">
          Upload Excel
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
          <input id="excel-file" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <div className="upload-hint" style={{ fontSize: 12, color: '#9bb5ff', marginTop: 6 }}>
            Drop file here or click to browse
          </div>
        </div>
        <div className="upload-filename" style={{ fontSize: 12, marginTop: 8, color: '#e8ecf2' }}>
          {fileName}
        </div>
      </div>
    </BaseNode>
  );
};

export default ExcelUploadNode;
