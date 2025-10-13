import "./dashboard.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [lead, setLead] = useState([]);
  const [newLead, setNewLead] = useState([]);
  const [proposalLead, setProposalLead] = useState([]);
  const [qualifiedLead, setQualifiedLead] = useState([]);
  // const [contactedLeads, setContactedLeads] = useState([]);

  //useState for filtering;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  // console.log(lead, "checking load.")
  const AllLeadApi =
    "https://anvaya-model-references-apis-backen.vercel.app/leads";

  async function getAllLeadApi() {
    try {
      const res = await axios.get(AllLeadApi);
      console.log(res.data);
      setLead(res.data);
    } catch (error) {
      console.log("Error message: ", error.message);
    }
  }

  useEffect(() => {
    getAllLeadApi();
  }, []);

  //Api's  status vise;

  const newStatus =
    "https://anvaya-model-references-apis-backen.vercel.app/leads/status/New";
  const proposalStatus =
    "https://anvaya-model-references-apis-backen.vercel.app/leads/status/Proposal_Sent";
  const qualfydStatus =
    "https://anvaya-model-references-apis-backen.vercel.app/leads/status/Qualified";

  // const contStatus =
  //   "https://anvaya-model-references-apis-backen.vercel.app/leads/status/Contacted";

  async function getNewLeads() {
    try {
      const newLeads = await axios.get(newStatus);
      // console.log(newLeads.data);
      setNewLead(newLeads.data);

      const propLeads = await axios.get(proposalStatus);
      // console.log(propLeads.data);
      setProposalLead(propLeads.data);

      const qualLeads = await axios.get(qualfydStatus);
      console.log(qualLeads);
      setQualifiedLead(qualLeads.data);

      // const contLeads = await axios.get(contStatus);
      // console.log(contLeads.data, "checking contacted");
      // setContactedLeads(contactedLeads.data);
    } 
    
    catch (error) {
      console.log("Error message: ", error.message);
    }
  }

  useEffect(() => {
    getNewLeads();
  }, []);

  const fetchDataByStatus = async (status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://anvaya-model-references-apis-backen.vercel.app/leads/status/${status}`
      );
      console.log(response, "checking respone");
      const result = await response.data;
      console.log(result, "cehekingreust");
      setData(result);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };
  // fetchDataByStatus('New');

  useEffect(() => {
    fetchDataByStatus("New"); // Fetch once on mount safely here
  }, []);

  return (
    <>
      <div className="outerContainer">
        <div className="text">
          <h1>Anvaya CRM Dashboard</h1>
        </div>
        <div className="bigContainer">
          <div className="navBarContainer">
            <h2>Sidebar</h2>
            <Navbar />
          </div>

          <div className="mainContentContainer">
            <h2>Leads</h2>

            <div className="leads">
              {lead.slice(0, 4)?.map((led, index) => (
                <div key={led._id}>
                  <div className="leadBoxes">
                    {/* {console.log(led.name, "checking lead naem ;")} */}
                    <h2 className="text">Lead {index + 1}</h2>

                    <p className="text">Name: {led.name}</p>
                    <p className="text">Source: {led.source}</p>
                    <p className="text">Agent: {led.salesAgent.name}</p>
                    <p className="text">Status: {led.status}</p>
                    <p className="text">Tags: {led.tags.join(", ")}</p>
                    <p className="text">Priority: {led.priority}</p>
                  </div>
                </div>
              ))}
            </div>
            <br />

            <h2>Lead Status: </h2>
            <p>New: {newLead.length}</p>
            <p>Qualified: {qualifiedLead.length}</p>
            <p>Proposal Sent: {proposalLead.length}</p>
            {/* <p>Contacted: {contactedLeads?.length}</p> */}

           
            <h2>Filtered by Status</h2>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            <ul className="filteredStatusBox">
              {data.map((item) => (
                <li key={item._id} className="statusFilteredList">
                  <strong>{item.name}</strong> ({item.status})
                </li>
              ))}
            </ul>
            <br />

            <h2>Quick Filters</h2>
            {/* <div style={{display: 'flex', flexWrap: 'wrap', }}> */}
            <div>
              <button
                onClick={() => fetchDataByStatus("New")}
                className="filBtnStyl"
    
              >
                New
              </button>
              <button
                onClick={() => fetchDataByStatus("Proposal_Sent")}
                className="filBtnStyl"
               
              >
                Proposal Sent
              </button>
              <button
                onClick={() => fetchDataByStatus("Qualified")}
                className="filBtnStyl"
               
              >
                Qualified
              </button>
              <button
                onClick={() => fetchDataByStatus("Contacted")}
                className="filBtnStyl"
                
              >
                Contacted
              </button>
            </div>
            <br />

            <Link to="/leadForm">
              <button className="button">Add New Leads</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
