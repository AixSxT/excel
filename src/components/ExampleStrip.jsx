// ExampleStrip: bottom sample templates placeholders.
import React from 'react';

const examples = [
  { id: 'split_messages', title: 'split_messages', description: '' },
  { id: 'condition', title: 'condition', description: '' },
  { id: 'PPT_Generate', title: 'PPT_Generate', description: '' },
  { id: 'image_cover', title: 'image_cover', description: '' },
];

const ExampleStrip = () => (
  <div className="example-strip" aria-label="示例">
    {examples.map((example) => (
      <div key={example.id} className="example-card">
        <div className="example-card-header">
          <div className="example-card-icon" aria-hidden="true">[EX]</div>
          <div className="example-card-title">{example.title}</div>
        </div>
        {example.description ? (
          <div className="example-card-desc">{example.description}</div>
        ) : (
          <div className="example-card-desc example-card-desc-empty" />
        )}
      </div>
    ))}
  </div>
);

export default ExampleStrip;
