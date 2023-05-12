import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import reportFilter from "../utils/reportFilter";
import { CSVLink } from "react-csv";

const tableHeaders = {
  "No Coach": [
    {
      header: "Name",
      key: "Preferred_Full_Name",
    },
    {
      header: "Talent group",
      key: "Talent_Group",
    },
    {
      header: "Position",
      key: "Position_Name",
    },
    {
      header: "Location",
      key: "Location_Name",
    },
    {
      header: "Email",
      key: "Business_Email_Information_Email_Address",
    },
    {
      header: "Status",
      key: "Employee_Status",
    },
  ],
  "Coach not in CBO": [
    {
      header: "Name",
      key: "Preferred_Full_Name",
    },
    {
      header: "Talent group",
      key: "Talent_Group",
    },
    {
      header: "Position",
      key: "Position_Name",
    },
    {
      header: "Location",
      key: "Location_Name",
    },
    {
      header: "Email",
      key: "Business_Email_Information_Email_Address",
    },
    {
      header: "Status",
      key: "Employee_Status",
    },
    {
      header: "Coach name",
      key: "Coach",
    },
  ],
  "Under Coaching": [
    {
      header: "Name",
      key: "Preferred_Full_Name",
    },
    {
      header: "Talent group",
      key: "Talent_Group",
    },
    {
      header: "Position",
      key: "Position_Name",
    },
    {
      header: "Location",
      key: "Location_Name",
    },
    {
      header: "Email",
      key: "Business_Email_Information_Email_Address",
    },
    {
      header: "Status",
      key: "Employee_Status",
    },
    {
      header: "Number of coachees",
      key: "Coachees_Count",
    },
  ],
  "Over Coaching": [
    {
      header: "Name",
      key: "Preferred_Full_Name",
    },
    {
      header: "Talent group",
      key: "Talent_Group",
    },
    {
      header: "Position",
      key: "Position_Name",
    },
    {
      header: "Location",
      key: "Location_Name",
    },
    {
      header: "Email",
      key: "Business_Email_Information_Email_Address",
    },
    {
      header: "Status",
      key: "Employee_Status",
    },
    {
      header: "Number of coachees",
      key: "Coachees_Count",
    },
  ],
  "Geography Mismatch": [
    {
      header: "Name",
      key: "Preferred_Full_Name",
    },
    {
      header: "Talent group",
      key: "Talent_Group",
    },
    {
      header: "Position",
      key: "Position_Name",
    },
    {
      header: "Location",
      key: "Location_Name",
    },
    {
      header: "Email",
      key: "Business_Email_Information_Email_Address",
    },
    {
      header: "Status",
      key: "Employee_Status",
    },
    {
      header: "Coach name",
      key: "Coach_Name",
    },
    {
      header: "Coach email",
      key: "Coach_Email",
    },
    {
      header: "Coach talent group",
      key: "Coach_Talent_Group",
    },
    {
      header: "Coach location",
      key: "Coach_Location",
    },
    {
      header: "Coach position",
      key: "Coach_Position",
    },
    {
      header: "Coach status",
      key: "Coach_Status",
    },
  ],
  "Talent Group Mismatch": [
    {
      header: "Name",
      key: "Preferred_Full_Name",
    },
    {
      header: "Talent group",
      key: "Talent_Group",
    },
    {
      header: "Position",
      key: "Position_Name",
    },
    {
      header: "Location",
      key: "Location_Name",
    },
    {
      header: "Email",
      key: "Business_Email_Information_Email_Address",
    },
    {
      header: "Status",
      key: "Employee_Status",
    },
    {
      header: "Coach name",
      key: "Coach_Name",
    },
    {
      header: "Coach email",
      key: "Coach_Email",
    },
    {
      header: "Coach talent group",
      key: "Coach_Talent_Group",
    },
    {
      header: "Coach location",
      key: "Coach_Location",
    },
    {
      header: "Coach position",
      key: "Coach_Position",
    },
    {
      header: "Coach status",
      key: "Coach_Status",
    },
  ],
};

const tabValues = [
  "No Coach",
  "Coach not in CBO",
  "Under Coaching",
  "Over Coaching",
  "Geography Mismatch",
  "Talent Group Mismatch",
];

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

const locationFilterValues = [
  "All",
  "Melbourne",
  "Sydney",
  "Perth",
  "Brisbane",
  "Canberra",
  "Adelaide",
];

const Home = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");
  const [talentGroupFilter, setTalentGroupFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [titleText, setTitleText] = useState("");
  const [allData, setAllData] = useState({
    "geo-mismatch": [],
    "no-coach": [],
    "coach-not-in-CBO": [],
    "not-coaching": [],
    "over-coaching": [],
    "talent-group-mismatch": [],
    "under-coaching": [],
  });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/generate-report`);
      const data = await res.json();
      setAllData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab && allData) {
      if (activeTab == "No Coach") {
        setTableData(
          reportFilter(allData["no-coach"], talentGroupFilter, locationFilter)
        );
      } else if (activeTab == "Coach not in CBO") {
        setTableData(
          reportFilter(
            allData["coach-not-in-CBO"],
            talentGroupFilter,
            locationFilter
          )
        );
      } else if (activeTab == "Under Coaching") {
        setTableData(
          reportFilter(
            allData["under-coaching"],
            talentGroupFilter,
            locationFilter
          )
        );
      } else if (activeTab == "Over Coaching") {
        setTableData(
          reportFilter(
            allData["over-coaching"],
            talentGroupFilter,
            locationFilter
          )
        );
      } else if (activeTab == "Geography Mismatch") {
        setTableData(
          reportFilter(
            allData["geo-mismatch"],
            talentGroupFilter,
            locationFilter
          )
        );
      } else if (activeTab == "Talent Group Mismatch") {
        setTableData(
          reportFilter(
            allData["talent-group-mismatch"],
            talentGroupFilter,
            locationFilter
          )
        );
      }
    }
  }, [allData, activeTab, talentGroupFilter, locationFilter]);

  useEffect(() => {
    if (activeTab) {
      setTitleText(`Showing ${tableData.length} results`);
    }
  }, [tableData, activeTab]);

  const setTab = (tabIndex: number) => {
    // If new tab pressed, remove highlight from old tab
    var activeTabElement = document.getElementById(activeTab);
    if (activeTabElement && tabValues[tabIndex] != activeTab) {
      activeTabElement.className = activeTabElement.className.replace(
        " active",
        ""
      );
    }

    var newTabElement = document.getElementById(tabValues[tabIndex]);
    if (newTabElement) {
      newTabElement.className += " active";
    }

    setActiveTab(tabValues[tabIndex]);
  };

  return (
    <>
      <Head>
        <title>Generate Report</title>
        <meta name="description" content="generate report" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button onClick={() => router.back()}>Go back</button>
        <div className="flex-container">
          <h1>Coaching Report</h1>

          {activeTab && tableData ? (
            <CSVLink
              data={tableData.map((item) => {
                var dataObj = {};
                tableHeaders[activeTab].forEach((headerObj) => {
                  // Escape double quotes and wrap full string in double quotes to escape commas
                  if (item.properties[headerObj.key] instanceof String) {
                    dataObj[headerObj.header] = `${item.properties[
                      headerObj.key
                    ].replaceAll(`"`, `\\"`).replaceAll(`,`, "\\,")}`;
                  } else {
                    dataObj[headerObj.header] = item.properties[headerObj.key];
                  }
                });
                return dataObj;
              })}
              headers={tableHeaders[activeTab].map(
                (headerObj) => headerObj.header
              )}
              filename={"report.csv"}
            >
              <button>Download CSV</button>
            </CSVLink>
          ) : (
            <></>
          )}
        </div>

        <div className="flex-container">
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
          <div>
            <label htmlFor="locationFilter">Location:</label>
            <select
              id="locationFilter"
              value={locationFilter}
              onChange={(event) => setLocationFilter(event.target.value)}
            >
              {locationFilterValues.map((filterValue) => (
                <option value={filterValue}>{filterValue}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-container" id="tabs">
          {tabValues.map((tabValue, index) => (
            <button
              key={index}
              className="tab-button"
              id={tabValue}
              onClick={() => setTab(index)}
            >
              {tabValue}
            </button>
          ))}
        </div>
        {activeTab ? (
          <>
            <h3>{titleText}</h3>
            <table>
              <thead>
                <tr>
                  {tableHeaders[activeTab].map((headerObj) => (
                    <th>{headerObj.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr>
                    {tableHeaders[activeTab].map((headerObj) => (
                      <td>{item.properties[headerObj.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default Home;
