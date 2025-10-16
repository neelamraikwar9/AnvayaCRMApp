import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const LeadStatusView = () => {
  const [proposal, setProposal] = useState();
  const [leads, setLeads] = useState();
  const [filteredLeads, setFilteredLeads] = useState();

  useEffect(() => {
    async function fetchQualifiedLeads() {
      const qualfydStatus = await axios.get(
        "https://anvaya-model-references-apis-backen.vercel.app/leads/status/Qualified"
      );
      console.log(qualfydStatus.data, "qualfydStatus");
      setProposal(qualfydStatus.data);
    }
    fetchQualifiedLeads();
  }, []);

  useEffect(() => {
    async function fetchLeads() {
      const fetchLeads = await axios.get(
        "https://anvaya-model-references-apis-backen.vercel.app/leads"
      );
      console.log("leads", fetchLeads.data);
      setLeads(fetchLeads.data);
    }
    fetchLeads();
  }, []);

  //   console.log(filteredLeads, "filterLeads");

  function handleInputChange(value) {
    const filtered = leads?.filter((lead) => lead.priority === value);
    setFilteredLeads(filtered, "filtered");
    console.log(filtered, "checking leads");
  }

  return (
    <main className="leadContainer">
      <h1 className="text">Lead by Status</h1>
      <div className="container">
        <div className="backButn">
          <Link to="/">
            <button>Back to Dashboard</button>
          </Link>
        </div>

        <div className="midContainer">
          <h2>Lead List by Status</h2>
          <section>
            <h3>Status: Qualified</h3>
            <div style={{ border: "1px solid red" }}>
              {proposal?.map((prop, index) => (
                <div key={prop._id} style={{ border: "1px" }}>
                  <p>
                    <strong>Lead {index + 1}</strong> &nbsp; - &nbsp;
                    <strong>Lead Name: </strong>&nbsp;{prop.name}&nbsp; &nbsp;
                    <strong>Status: </strong>&nbsp;{prop.status} &nbsp; &nbsp;{" "}
                    <strong>Sales Agent Name:</strong> &nbsp;{" "}
                    {prop.salesAgent?.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <br />
          <section>
            <h2>Leads Filtered by Priority</h2>
            {filteredLeads?.map((lead) => (
              <div key={lead._id}>
                <p>
                  Lead Name: <strong>{lead.name}</strong> - Priority :{" "}
                  {lead.priority}
                </p>
              </div>
            ))}
          </section>

          <section>
            <h2>Filter by Priority</h2>
            <div style={{ display: "flex", gap: "6rem" }}>
              <label htmlFor="h">
                <input
                  type="checkbox"
                  id="h"
                  name="priority"
                  value="High"
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                High
              </label>
              <label htmlFor="m">
                <input
                  type="checkbox"
                  id="m"
                  name="priority"
                  value="Medium"
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                Medium
              </label>
              <label htmlFor="l">
                <input
                  type="checkbox"
                  id="l"
                  name="priority"
                  value="Low"
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                Low
              </label>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LeadStatusView;
