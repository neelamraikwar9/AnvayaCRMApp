import "./dashboard.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Dashboard() {
  const [lead, setLead] = useState([]);
  const [newLead, setNewLead] = useState([]);
  const [proposalLead, setProposalLead] = useState([]);
  const [qualifiedLead, setQualifiedLead] = useState([]);

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

  const newStatus = "https://anvaya-model-references-apis-backen.vercel.app/leads/status/New";
  const proposalStatus = "https://anvaya-model-references-apis-backen.vercel.app/leads/status/Proposal_Sent";
  const qualfydStatus = "https://anvaya-model-references-apis-backen.vercel.app/leads/status/Qualified"; 

  async function getNewLeads(){
    try{
        const newLeads = await axios.get(newStatus);
        // console.log(newLeads.data);
        setNewLead(newLeads.data);

        const propLeads = await axios.get(proposalStatus)
        // console.log(propLeads.data);
        setProposalLead(propLeads.data);

        const qualLeads = await axios.get(qualfydStatus);
        console.log(qualLeads)
        setQualifiedLead(qualLeads.data)
    } catch(error){
        console.log("Error message: ", error.message);
    }
  }

  useEffect(() => {
    getNewLeads();
  }, [])

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
              {lead.slice(0, 4)?.map((led) => (
                <div key={led._id}>
                  <div className="leadBoxes">
                    {/* {console.log(led.name, "checking lead naem ;")} */}
                    <p>Name: {led.name}</p>
                    <p>Source: {led.source}</p>
                    <p>Agent: {led.salesAgent.name}</p>
                    <p>Status: {led.status}</p>
                    <p>Tags: {led.tags.join(", ")}</p>
                    <p>Priority: {led.priority}</p>
                  </div>
                </div>
              ))}
             
            </div>
            <br/>

            <h2>Lead Status: </h2>
            <p>New: {newLead.length}</p>
            <p>Qualified: {qualifiedLead.length}</p>
            <p>Proposal Sent: {proposalLead.length}</p>
            <br/>
            <br/>

            <Link to="/leadForm"><button className="button">Add New Leads</button></Link>

            
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
