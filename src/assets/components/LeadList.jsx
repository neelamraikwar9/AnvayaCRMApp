import axios from "axios";
import { useState, useEffect } from 'react';


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
        <main>
        <h1>Lead List</h1>
        <div className='container'>
            <div>
                <button>Back to Dashboard</button>
            </div>
            
            <div>
                <h2>Lead Overview</h2>
                <section>
                    {leads.slice(0, 7)?.map((lead) => (
                         <div key={lead._id}>
                         <p><strong>Lead 1 - </strong>{lead.status} - {lead.name}</p>
                         <p><strong>Lead 2 - </strong>{lead.status} - {lead.name}</p>
                         <p><strong>Lead 3 - </strong>{lead.status} - {lead.name}</p>
                         <p><strong>Lead 4 - </strong>{lead.status} - {lead.name}</p>
                         <p><strong>Lead 5 - </strong>{lead.status} - {lead.name}</p>
                         <p><strong>Lead 6 - </strong>{lead.status} - {lead.name}</p>
                         </div>
                    ))}
                </section>
            </div>
        </div>

        </main>
    )
}

export default LeadList; 