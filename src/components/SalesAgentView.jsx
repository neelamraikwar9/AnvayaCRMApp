import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';


const SalesAgentView = () => {
//  const [leads, setLeads] = useState([]);
 const [leadsByAgents, setLeadsByAgents] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

 const [filteredLeads, setFilteredLeads] = useState();
 const [filMessage, setFilMessage] = useState(true);


 const [sort, setSort] = useState("");
 const [sorted, setSorted] = useState([]);
 
 

    useEffect(() => {
    async function handleFilterBySalesAgent() {
      try{
    const res = await axios.get(
      "https://anvaya-model-references-apis-backen.vercel.app/leads/agent/68e49fdf24fcc90c8e77b5bd"
    );
    console.log(res.data, "checkigres lead by agenId");
    setLeadsByAgents(res.data);
    setIsLoading(false);
  } catch(error){
    setError(error.message);
    throw error;
  }
  }
  handleFilterBySalesAgent();
  }, []);


   function handleInputChange(value) {
    const filtered = leadsByAgents?.filter((lead) => lead.priority === value);
    setFilMessage(false);
    setFilteredLeads(filtered, "filtered");
    // setFilMessage(false);
    console.log(filtered, "checking leads");
  }

  // for uncecking input boxes when clicking to another. using name id mainly.
  const checkboxes = document.querySelectorAll('input[name="priority"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        checkboxes.forEach((box) => {
          if (box !== checkbox) box.checked = false;
        });
      }
    });
  });


  function handleSortChange(e) {
    setSort(e.target.value);
    setIsLoading(trjd)
  }

  useEffect(() => {
   
    function getSortedByTimeToClose() {
      try {
         const AllLeads = [...leadsByAgents];
    console.log(AllLeads, "AllLeads");

        if (sort === "Low to high") {
          console.log("in if");
          const lowToHigh = AllLeads?.sort(
            (a, b) => a.timeToClose - b.timeToClose
          );
          setSorted(lowToHigh);
          console.log(lowToHigh, "lowToHigh ");
        } else if (sort === "High to low") {
          const highToLow = AllLeads?.sort(
            (a, b) => b.timeToClose - a.timeToClose
          );
          setSorted(highToLow);
          console.log(highToLow, "highToLow");
        } else {
          setSorted(AllLeads);
        }
      } catch (error) {
        throw error;
      }
    }
    getSortedByTimeToClose();
  }, [sort, leadsByAgents]);


    return (
        <main className="leadContainer">
        <h1 className="text">Leads by Sales Agent</h1>
         <div className="container">
        <div className="backButn">
          <Link to="/">
            <button>Back to Dashboard</button>
          </Link>
        </div>

        <div className="midContainer">
        <h2>Lead List by Agent</h2>
        <section>
         <p>Sales Agent: <strong>Alex Zem</strong></p>
         <div className='listBox' style={{width: '60rem'}}>
         {isLoading && <p> Leads are Loading...</p>}
          {error && <p style={{ color: "red" }}></p>}
        {leadsByAgents?.map((leads) => (
            <div key={leads._id}>
                <p>Lead Name: <strong>&nbsp;{leads.name}</strong>&nbsp; &nbsp;&nbsp; Agent Name: <strong>&nbsp;{leads.salesAgent.name} ({leads.salesAgent.email})</strong>&nbsp;&nbsp; Lead Status: &nbsp;<strong>{leads.status} &nbsp;</strong></p>
            </div>
        ))}
        </div>
        </section>
        <br/>

        <section>
            <h3>Leads Filtered by Priority</h3>
            <div className="listBox" style={{width: '25rem'}}>
             {filMessage && <p>Select an option from Filter by Priority to see filter. </p>}
            {filteredLeads?.map((lead) => (
              
              <div key={lead._id}>
             
                <p>
                  Lead Name: <strong>{lead.name}</strong> - Priority :{" "}
                  <strong>{lead.priority}</strong>
                </p>
              </div>
            ))}
            </div>
          </section>

          <section>
          <h3>Sorted by Time to Close</h3>
          {isLoading && <p> Leads are Loading...</p>}
          {error && <p style={{ color: "red" }}></p>}
           <div className="listBox" style={{width: '25rem'}}>
          {sorted?.map((lead) => (
            <div key={lead._id}>
                <p>Lead Name: <strong>{lead.name}</strong> - Time to Close: <strong>{lead.timeToClose}</strong></p>
            </div>
          ))}
          </div>
          </section>
          

         <section>
            <h2>Filter by Priority</h2>
            <div style={{ display: "flex", gap: "6rem" }}>
              <label htmlFor="h">
                <input
                  type="checkbox"
                  id="hig"
                  name="priority"
                  value="High"
                  onChange={(e) => handleInputChange(e.target.value)}
                  style={{accentColor: 'green'}}
                />
                High
              </label>
              <label htmlFor="m">
                <input
                  type="checkbox"
                  id="med"
                  name="priority"
                  value="Medium"
                  onChange={(e) => handleInputChange(e.target.value)}
                  style={{accentColor: 'green'}}
                />
                Medium
              </label>
              <label htmlFor="lo">
                <input
                  type="checkbox"
                  id="lo"
                  name="priority"
                  value="Low"
                  onChange={(e) => handleInputChange(e.target.value)}
                  style={{accentColor: 'green'}}
                />
                Low
              </label>
            </div>
          </section>


          <section>
            <h2>Sort by Time to Close</h2>
            <label htmlFor="lowToHigh">
              <input
                type="radio"
                id="lowToHigh"
                name="sortByTimeToClose"
                value="Low to high"
                checked={sort === "Low to high"}
                onChange={handleSortChange}
                style={{accentColor: 'green'}}
              />
              Time to Close- Low to high
            </label>

            <label htmlFor="highToLow">
              <input
                type="radio"
                id="highToLow"
                name="sortByTimeToClose"
                value="High to low"
                checked={sort === "High to low"}
                onChange={handleSortChange}
                style={{accentColor: 'green'}}
              />
              Time to Close- High to low
            </label>
          </section>


        </div>
        </div>


        </main>
    )
}

export default SalesAgentView;