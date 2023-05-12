// components/Neo4jGraph.js
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const coachPositions = [
  "Manager",
  "Senior Manager",
  "Director",
  "Principal",
  "Specialist Director",
  "Partner",
];

// Dynamically import the ForceGraph2D component
const ForceGraph2D = dynamic(
  () => import("react-force-graph").then((mod) => mod.ForceGraph2D),
  {
    ssr: false,
  }
);

const Neo4jGraph = ({ neo4jData, filter }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    if (neo4jData && filter) {
      var visibleNodeIds = [];
      var nodes = [];
      neo4jData.nodes.forEach((node) => {
        if (filter == "All" || filter == node.properties.Talent_Group) {
          nodes.push({
            id: JSON.stringify(node.identity),
            label: node.labels[0],
            ...node.properties,
          });
          visibleNodeIds.push(JSON.stringify(node.identity));
        }
      });

      var links = [];
      neo4jData.relationships.forEach((relationship) => {
        const linkSource = JSON.stringify(relationship.start);
        const linkTarget = JSON.stringify(relationship.end);
        if (visibleNodeIds.includes(linkSource)) {
          links.push({
            source: linkSource,
            target: linkTarget,
          });

          // Add one layer of nodes connected to filtered nodes
          if (!visibleNodeIds.includes(linkTarget)) {
            const targetNode = neo4jData.nodes.find(
              (node) => linkTarget == JSON.stringify(node.identity)
            );
            nodes.push({
              id: JSON.stringify(targetNode.identity),
              label: targetNode.labels[0],
              ...targetNode.properties,
            });
          }
        }
      });

      // Calculate node degrees
      const degrees = {};
      links.forEach((link) => {
        degrees[link.source] = (degrees[link.source] || 0) + 1;
      });

      // Set node color based on degree
      nodes.forEach((node) => {
        const degree = degrees[node.id] || 0;
        if (degree > 5) {
          node.color = "red";
        } else if (degree < 2) {
          if (coachPositions.includes(node.Position_Name)) {
            node.color = "blue";
          } else {
            node.color = "grey";
          }
        } else {
          node.color = "green";
        }
      });

      setGraphData({ nodes, links });
    }
  }, [neo4jData, filter]);

  if (graphData.nodes.length != 0 && graphData.links.length != 0) {
    return (
      <ForceGraph2D
        nodeColor={(node) => node.color}
        graphData={graphData}
        nodeLabel="Preferred_Full_Name"
        nodeAutoColorBy="labels"
        nodeRelSize={10}
        linkDirectionalArrowLength={10}
        linkDirectionalArrowRelPos={1}
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
        }}
      />
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default Neo4jGraph;
