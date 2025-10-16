import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import  useApiContext  from "../UseApiContext";

const LeadList = () => {
  //  const { salesAgents }  =  useApiContext();
  const [salesAgents, setSalesAgents] = useState([]);
  console.log(salesAgents, "checking api salsesagent");

  useEffect(() => {
    async function fetchSalesAgents() {
      try {
        console.log("Fetching sales agents...");
        const response = await axios.get(
          "https://anvaya-model-references-apis-backen.vercel.app/salesAgent"
        );
        console.log("Sales agents fetched:", response.data);
        setSalesAgents(response.data);
      } catch (error) {
        console.error("Error in fetching sales agents:", error);
        setSalesAgents([]);
      }
    }
    fetchSalesAgents();
  }, []);

  const [leads, setLeads] = useState([]);
  const [leadsByAgents, setLeadsByAgents] = useState([]);
  const [sortByPriority, setSortByPriority] = useState(" ");

  const [sortedLeads, setSortedLeads] = useState();
  console.log(sortedLeads, "sortedLeads");

  const AllLeadApi =
    "https://anvaya-model-references-apis-backen.vercel.app/leads";

  async function getAllLeadApi() {
    try {
      const res = await axios.get(AllLeadApi);
      console.log(res.data);
      setLeads(res.data);
    } catch (error) {
      console.log("Error message: ", error.message);
    }
  }

  useEffect(() => {
    getAllLeadApi();
  }, []);

  async function handleFilterBySalesAgent(agentId) {
    const res = await axios.get(
      `https://anvaya-model-references-apis-backen.vercel.app/leads/agent/${agentId}`
    );
    console.log(res.data, "checkigres lead by agenId");
    setLeadsByAgents(res.data);
  }

  function handleSortByPriority(e) {
    setSortByPriority(e.target.value);
  }

  useEffect(() => {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    const sortLeads = [...leads];

    console.log(sortLeads, "all");

    // console.log(sortByPriority, "current sortByPriority value");

    if (sortByPriority === "Low to hight") {
      // console.log(sortLeads, "inside if sort")
      const lowToHigh = sortLeads.sort((a, b) => {
        // console.log(a.priority, b.priority, "priority comparison");

        return (
          priorityOrder[a.priority.toLowerCase()] -
          priorityOrder[b.priority.toLowerCase()]
        );
      });

      setSortedLeads(lowToHigh);

      console.log(lowToHigh, "lowToHigh");
    } else if (sortByPriority === "High to Low") {
      console.log("inside else if")
      const highToLow = sortLeads.sort((a, b) => {
        return (
          priorityOrder[b.priority.toLowerCase()] -
          priorityOrder[a.priority.toLowerCase()]
        );
      });
      // console.log(highToLow, "highToLow");

      setSortedLeads(highToLow);
      console.log(highToLow, "highToLow");
    } else {
      setSortedLeads(sortLeads);
    }
  }, [sortByPriority, leads]);

  return (
    <main className="leadContainer">
      <h1 className="text">Lead List</h1>
      <div className="container">
        <div className="backButn">
          <Link to="/">
            <button>Back to Dashboard</button>
          </Link>
        </div>

        <div className="midContainer">
          <h2>Lead Overview</h2>
          <section>
            {leads.slice(0, 5)?.map((lead, index) => (
              <div key={lead._id}>
                <p>
                  <strong>Lead {index + 1} - </strong>
                  {lead.status} - {lead.salesAgent?.name}
                </p>
              </div>
            ))}
          </section>
          <br />

          <section>
            <h2>Filtered Leads by Sales Agents:</h2>
            {leadsByAgents?.map((agent) => (
              <div key={agent._id}>
                <p>
                  {" "}
                  &nbsp;{agent.name} - {agent.status}
                </p>
              </div>
            ))}
          </section>
          <br />

          <section>
            <h2>Sorted By Priority-</h2>
            {sortedLeads?.slice(0, 6).map((lead) => (
              <div key={lead._id}>
                <p>{lead.name} -  {lead.priority} - {lead.status} - {lead.source}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>Filter Leads by Sales Agent</h2>
            <div style={{ display: "flex", gap: "1rem" }}>
              {salesAgents?.map((agent) => (
                <button
                  key={agent._id}
                  onClick={() => handleFilterBySalesAgent(agent._id)}
                >
                  {agent.name}
                </button>
              ))}
            </div>
          </section>

          <section>
            {/* <p>Sort by: [Priority] [Time to Close]</p> */}
            <h2>Sort by Priority</h2>
            <label htmlFor="hi">
              <input
                type="radio"
                id="hi"
                name="sortByPriority"
                value="Low to hight"
                checked={sortByPriority === "Low to hight"}
                onChange={handleSortByPriority}
              />
              Priority- Low to hight
            </label>

            <label htmlFor="Me">
              <input
                type="radio"
                id="Me"
                name="sortByPriority"
                value="High to Low"
                checked={sortByPriority === "High to Low"}
                onChange={handleSortByPriority}
              />
              Priority- High to Low
            </label>
          </section>
          <br />
          <br />

          <Link to="/leadForm">
            <button className="button">Add New Lead</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LeadList;
