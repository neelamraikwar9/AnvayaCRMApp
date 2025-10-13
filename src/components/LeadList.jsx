import axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const LeadList = () => {
    const [leads, setLeads] = useState([]);

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

    return(
        <main className="leadContainer">
        <h1  className="text">Lead List</h1>
        <div className="container">
            <div className="backButn">
             <Link to="/">
                <button>Back to Dashboard</button>
            </Link>
            </div>
            
            <div className="midContainer">
                <h2>Lead Overview</h2>
                <section>
                    {leads.slice(0, 4)?.map((lead, index) => (
                         <div key={lead._id}>
                         <p><strong>Lead {index + 1} - </strong>{lead.status} - {lead.name}</p>
                         </div>
                    ))}
                </section>
                <br/>
                <section>
                    <p>FiltersL: [Status] [Sales Agent]</p>
                    <p>Sort by: [Priority] [Time to Close]</p>
                    <Link to="/leadForm">
                    <button className="button">Add New Lead</button>
                    </Link>
                </section>
            </div>
        </div>

        </main>
    )
}

export default LeadList; 