// pages/index.js
import { useState, useEffect } from "react";
import Neo4jGraph from "../components/Neo4jGraph";
import Link from "next/link";

const talentGroupFilterValues = [
  "All",
  "Platform & Product Eng",
  "Operations Transformation",
  "Cloud Advisory",
  "Digital Banking",
  "Cross Industry",
  "Quality Eng",
  "Cloud Engineering",
  "Digital Workplace",
  "Operate",
  "Integration Eng",
  "Cloud Security & Network Engineering",
  "Insurance",
];

const App = () => {
  const [neo4jData, setNeo4jData] = useState({ nodes: [], relationships: [] });
  const [talentGroupFilter, setTalentGroupFilter] = useState("All");

  useEffect(() => {
    const fetchDataFromNeo4j = async () => {
      const nodesQuery = `
        MATCH (n)
        RETURN DISTINCT n;
      `;

      const relationshipsQuery = `
        MATCH (n)-[r]->(m)
        RETURN DISTINCT r;
      `;

      const nodesDataRes = await fetch(`/api/fetch-data?query=${nodesQuery}`);
      const relationshipsDataRes = await fetch(
        `/api/fetch-data?query=${relationshipsQuery}`
      );

      const nodesDataJSON = await nodesDataRes.json();
      const relationshipsDataJSON = await relationshipsDataRes.json();

      const nodes = nodesDataJSON.map((item) => item.n);
      const relationships = relationshipsDataJSON.map((item) => item.r);

      setNeo4jData({ nodes, relationships });
    };

    fetchDataFromNeo4j();
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Coaching Tree</h1>
        <div>
          <label htmlFor="talentGroupFilter">Talent Group:</label>
          <select
            id="talentGroupFilter"
            value={talentGroupFilter}
            onChange={(event) => setTalentGroupFilter(event.target.value)}
          >
            {talentGroupFilterValues.map((filterValue) => (
              <option value={filterValue}>{filterValue}</option>
            ))}
          </select>
        </div>
        <div className="button-container">
          <button disabled>Upload Data</button>
          <Link href="/generate-report">
            <button>Generate Report</button>
          </Link>
        </div>
      </div>
      <Neo4jGraph neo4jData={neo4jData} filter={talentGroupFilter} />
    </div>
  );
};

export default App;
