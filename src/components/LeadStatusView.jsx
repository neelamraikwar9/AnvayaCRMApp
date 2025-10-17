import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const LeadStatusView = () => {
  const [proposal, setProposal] = useState();
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState();
  const [sort, setSort] = useState("");
  const [sorted, setSorted] = useState([]);

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
  }

  useEffect(() => {
   
    function getSortedByTimeToClose() {
      try {
         const AllLeads = [...leads];
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
  }, [sort, leads]);

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
            <div style={{}} className="listBox">
              {proposal?.map((prop, index) => (
                <div key={prop._id} style={{ border: "1px" }} >
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
            <div className="listBox" style={{width: '25rem', }}>
            {filteredLeads?.map((lead) => (
              <div key={lead._id} >
                <p>
                  Lead Name: <strong>{lead.name}</strong> - Priority :{" "}
                  <strong>{lead.priority}</strong>
                </p>
              </div>
            ))}
            </div>
          </section>
          
          <section>
          <h2>Sorted by Time to Close</h2>
          <div className="listBox" style={{width: '30rem', }}>
          {sorted?.map((lead) => (
            <div key={lead._id}>
                <p>Lead Name: <strong>{lead.name}</strong> - Time to Close: <strong>{lead.timeToClose}</strong>
</p>
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
  );
};

export default LeadStatusView;
