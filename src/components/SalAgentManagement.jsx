import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const SalesAgentManagement = () => {
  const [salesAgent, setSalesAgent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const agentsApi =
    "https://anvaya-model-references-apis-backen.vercel.app/salesAgent";

  async function getAgentApi() {
    try {
      const res = await axios.get(agentsApi);
      console.log(res.data);
      setSalesAgent(res.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      console.error("Error message: ", error.message);
    }
  }

  //running this useEffect for one time only.
  useEffect(() => {
    getAgentApi();
  }, []);

  return (
    <main className="leadContainer">
      <h1 className="text">Sales Agent Management</h1>
      <div className="container">
        <div className="backBtnCont">
          <div className="backButn">
            <Link to="/">
              <button>Back to Dashboard</button>
            </Link>
          </div>
        </div>

        <div className="midContainer" style={{ width: "56rem" }}>
          <h2>Sales Agent List</h2>
          <div
            style={{
              borderRadius: "0.3rem",
              padding: "0rem 0.5rem",
            }}
            className="salesAgentList listBox"
          >
            {isLoading && <p> Leads are Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {salesAgent?.map((agent, index) => (
              <p key={agent._id}>
                <strong>Agent {index + 1}</strong> : &nbsp;&nbsp;{" "}
                <i>{agent.name}</i>&nbsp; -&nbsp;
                {agent.email}
              </p>
            ))}
          </div>

          <br />
          <Link to="/agentForm">
            <button className="button">Add New Agent</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SalesAgentManagement;
