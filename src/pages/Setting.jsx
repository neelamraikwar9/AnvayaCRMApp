import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Setting = () => {
  const [leads, setLeads] = useState([]);
  const [salesAgent, setSalesAgent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(leads, "leads");

  useEffect(() => {
    async function getAllLeadApi() {
      try {
        const res = await axios.get(
          "https://anvaya-model-references-apis-backen.vercel.app/leads"
        );
        console.log(res.data);
        setLeads(res.data);
        setIsLoading(false);

        const resAllSalesAgent = await axios.get(
          "https://anvaya-model-references-apis-backen.vercel.app/salesAgent"
        );
        console.log(resAllSalesAgent, "sales");
        setSalesAgent(resAllSalesAgent.data);
        setIsLoading(false);
      } catch (error) {
        setError(err.message);
        setError(err.message);
        console.log("Error message: ", error.message);
      }
    }

    getAllLeadApi();
  }, []);

  async function handleLeadDelete(e) {
    //  console.log(e.target.value, "checking button value.");
    const leadId = e.target.value;
    console.log(leadId, "leadId");

    try {
      await axios.delete(
        `https://anvaya-model-references-apis-backen.vercel.app/leads/${leadId}`
      );

      setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== leadId));

      alert("✅ Lead deleted successfully!");
    } catch (error) {
      console.error("Failed to delete lead:", error);
      alert("Failed to delete lead. Please try again.");
    }
  }

  async function handleSalesAgentDelete(e) {
    const agentId = e.target.value;
    console.log(agentId, "agentId");

    try {
      await axios.delete(
        `https://anvaya-model-references-apis-backen.vercel.app/salesAgent/${agentId}`
      );
      setSalesAgent((presale) =>
        presale.filter((agent) => agent._id !== agentId)
      );

      alert("✅ Sales Agent deleted successfully!");
    } catch (error) {
      console.error("Failed to delete Sales Agent:", error);
      alert("Failed to delete Sales Agent. Please try again.");
    }
  }

  return (
    <main className="leadContainer">
      <h1 className="text">Setting</h1>
      <div className="container">
        <div className="backButn">
          <Link to="/">
            <button className="btnback">Back to Dashboard</button>
          </Link>
        </div>

        <div className="midContainer">
          <h2>All Leads:</h2>
          {isLoading && <p> Leads are Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {leads?.map((lead) => (
            <div className="settingListCon">
              <ul
                key={lead._id}
                style={{
                  border: "1px green solid",
                  width: "40rem",
                  borderRadius: "0.9rem",
                }}
              >
                <li className="styleList" style={{ padding: "1rem" }}>
                  Lead Name: &nbsp;
                  <strong>
                    <i>{lead.name}</i>
                  </strong>{" "}
                  &nbsp; Lead Status: &nbsp;
                  <strong>
                    <i>{lead.status}</i>
                  </strong>
                  &nbsp; Lead Source: &nbsp;
                  <strong>
                    <i>{lead.source}</i>
                  </strong>
                  &nbsp; Priority: &nbsp;
                  <strong>
                    <i>{lead.priority}</i>
                  </strong>
                  &nbsp;{" "}
                  {/* &nbsp;
                    &nbsp; &nbsp; &nbsp; */}
                </li>
              </ul>

              <button
                className="delBtn"
                value={lead._id}
                onClick={handleLeadDelete}
              >
                Delete
              </button>
            </div>
          ))}

          <br/>
          <br/>


          <h2>All Sales Agent:</h2>
          {isLoading && <p>Sales Agent are Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {salesAgent?.map((agent) => (
            <div className="settingListCon">
              <ul
                key={agent._id}
                style={{
                  border: "1px green solid",
                  width: "35rem",
                  borderRadius: "0.9rem",
                  display: "flex",
                }}
              >
                <li className="styleList" style={{ padding: "1rem" }}>
                  Sales Agent Name: &nbsp;
                  <strong>
                    <i>{agent.name}</i>
                  </strong>{" "}
                  &nbsp; &nbsp; &nbsp; Sales Agent Email: &nbsp;
                  <strong>
                    <i>{agent.email}</i>
                  </strong>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </li>
              </ul>
              <button
                className="delBtn"
                value={agent._id}
                onClick={handleSalesAgentDelete}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Setting;
