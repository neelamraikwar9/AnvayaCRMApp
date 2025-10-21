import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import axios from "axios";

const Report = () => {
  const [leads, setLeads] = useState([]);
  const [closedLead, setClosedLead] = useState([]);
  const [leadsInPipeLine, setLeadsInPipeLine] = useState(0);
  const [closedLeadsInPipeline, setClosedLeadsInPipeline] = useState(0);

  //leads by statuses;
  const [newLead, setNewLead] = useState([]);
  const [qualify, setQualify] = useState([]);
  const [proposal, setProposal] = useState([]);

  console.log(closedLead, "chekcing");
  console.log(leads, "checking leads");

  const AllLeadApi =
    "https://anvaya-model-references-apis-backen.vercel.app/leads";

  useEffect(() => {
    async function getAllLeadApi() {
      try {
        const res = await axios.get(AllLeadApi);
        console.log(res.data, "Fetching leads. ");
        setLeads(res.data);
      } catch (error) {
        console.log("Error message: ", error.message);
      }
    }
    getAllLeadApi();
  }, []);

  useEffect(() => {
    const fetchClosedLeads = async () => {
      const res = await axios.get(
        "https://anvaya-model-references-apis-backen.vercel.app/leads/status/Closed"
      );
      console.log(res.data, "checkig res");
      setClosedLead(res.data);
    };
    fetchClosedLeads();
  }, []);

  useEffect(() => {
    async function fetchingTotalInPipeLine() {
      try {
        const totalLeads = await axios.get(
          "https://anvaya-model-references-apis-backen.vercel.app/leads/report/pipeline"
        );
        console.log(totalLeads.data.totalLeadsInPipeline, "totalLeads");
        setLeadsInPipeLine(totalLeads.data.totalLeadsInPipeline);

        const totalClosedLeads = await axios.get(
          "https://anvaya-model-references-apis-backen.vercel.app/leads/report/closedLeads/pipeline"
        );
        console.log(
          totalClosedLeads.data.totalClosedLeadsInPipeline,
          "totalClosedLeads"
        );
        setClosedLeadsInPipeline(
          totalClosedLeads.data.totalClosedLeadsInPipeline
        );
      } catch (error) {
        console.log(error, "Error in the pipeline.");
      }
    }
    fetchingTotalInPipeLine();
  }, []);

  useEffect(() => {
    async function leadsByStatuses() {
      try {
        const newStatus = await axios.get(
          "https://anvaya-model-references-apis-backen.vercel.app/leads/status/New"
        );
        console.log(newStatus, "newStatus");
        setNewLead(newStatus.data);
        const proposalStatus = await axios.get(
          "https://anvaya-model-references-apis-backen.vercel.app/leads/status/Proposal_Sent"
        );
        console.log(proposalStatus, "proposalStatus");
        setQualify(proposalStatus.data);
        const qualfydStatus = await axios.get(
          "https://anvaya-model-references-apis-backen.vercel.app/leads/status/Qualified"
        );
        console.log(qualfydStatus.data, "qualfydStatus");
        setProposal(qualfydStatus.data);
      } catch (error) {
        throw error;
      }
    }

    leadsByStatuses();
  }, []);

  return (
    <main className="leadContainer">
      <h1 className="text">Anvaya CRM Reports </h1>
      <div className="container">
        <div className="backBtnCont">
          <div className="backButn">
            <Link to="/">
              <button>Back to Dashboard</button>
            </Link>
          </div>
        </div>

        <div className="midContainer" style={{ width: "54rem" }}>
          <h2>Report Overview</h2>
          <br />

          <section>
            <p style={{ fontSize: "20px" }}>
              <strong>Total closed Leads and Leads in Pipeline: </strong>
            </p>

            <div
              style={{
                // border: "1px solid red",
                width: "50rem",
                height: "30rem",
                // display: "flex",
                // justifyContent: "center"
              }}
            >
              <Doughnut
                data={{
                  labels: ["Leads in Pipeline", "Closed Leads in Pipeline"],
                  datasets: [
                    {
                      label: "Leads",
                      data: [leadsInPipeLine, closedLeadsInPipeline],
                      // backgroundColor: "rgba(75,192,192,0.6)",

                      backgroundColor: [
                        "rgba(54, 162, 235, 0.6)", // Blue for pipeline
                        "rgba(75, 192, 192, 0.6)", // Teal for closed
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: "white", // Legend text color
                        font: {
                          size: 14, // Legend font size
                          weight: "bold", // Legend font weight
                          family: "Arial", // Legend font family
                        },
                        padding: 20, // Padding around legend items
                      },
                    },
                  },
                }}
              />
            </div>
          </section>
          <br />
          <br />
          <br />

          <section>
            <p style={{ fontSize: "20px" }}>
              <strong>Leads Closed by Sales Agent:</strong>
            </p>
            {/* <p>[Bar Chart]</p> */}
            <div
              style={{
                // border: "1px solid red",
                width: "50rem",
                height: "30rem",
                // display: "flex",
                // justifyContent: "center"
              }}
            >
              <Bar
                data={{
                  labels: closedLead?.map((lead) => lead?.name) || [],
                  datasets: [
                    {
                      label: "Closed Leads",
                      data: closedLead?.map((lead) => lead?.timeToClose) || [],
                      backgroundColor: "rgba(75,192,192,0.6)",
                      borderRadius: "5",
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: "white", // Legend text color
                        font: {
                          size: 14, // Legend font size
                          weight: "bold", // Legend font weight
                          family: "Arial", // Legend font family
                        },
                        padding: 20, // Padding around legend items
                      },
                    },
                  },
                }}
              />
            </div>
          </section>
          <br />
          <br />
          <br />

          <section>
            <p style={{ fontSize: "20px" }}>
              <strong>Lead Status Distribution:</strong>
            </p>
            <div
              style={{
                // border: "1px solid red",
                width: "50rem",
                height: "30rem",
                // display: "flex",
                // justifyContent: "center"
              }}
            >
              <Doughnut
                data={{
                  labels: ["Proposal Sent", "Qualified", "New"],
                  datasets: [
                    {
                      label: "Leads Status Distribution",
                      data: [newLead.length, qualify.length, proposal.length],
                      backgroundColor: [
                        "rgba(75, 192, 192, 0.6)", // Closed color
                        "rgba(54, 162, 235, 0.6)", // Pipeline color
                        "rgba(255, 206, 86, 0.6)", // In Progress color
                      ],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: "white", // Legend text color
                        font: {
                          size: 14, // Legend font size
                          weight: "bold", // Legend font weight
                          family: "Arial", // Legend font family
                        },
                        padding: 20, // Padding around legend items
                      },
                    },
                  },
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Report;
