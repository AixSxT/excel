// Sidebar: legacy wrapper. Prefer NodeDrawer + NodeLibrary.
import React from 'react';
import NodeLibrary from './NodeLibrary';

const Sidebar = (props) => <NodeLibrary {...props} />;

export default Sidebar;
