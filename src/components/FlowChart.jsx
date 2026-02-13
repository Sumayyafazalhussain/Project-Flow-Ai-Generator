import React from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

const FlowChart = ({ nodes, edges }) => {
  return (
    <div style={{ height: "600px", border: "2px solid #e5e7eb", borderRadius: "0.5rem" }}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        fitView
      >
        <Controls />
        <Background color="#888" gap={16} />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;