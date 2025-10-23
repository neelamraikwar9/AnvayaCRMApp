import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeadDetails = () => {
  const { leadId } = useParams();
  console.log(leadId, "checking leadId");

  const [lead, setLead] = useState();
  const [salesAgents, setSalesAgents] = useState([]);
  console.log(lead, "lead");
  const [isLoading, setIsLoading] = useState(true);

  const [formModel, setFormModel] = useState(false);
  const [edit, setEdit] = useState();
  console.log(edit, "settt");

  useEffect(() => {
    setEdit(lead);
  }, [lead]);

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

  const AllLeadApi = `https://anvaya-model-references-apis-backen.vercel.app/leads/${leadId}`;

  async function fetchLead() {
    try {
      const res = await axios.get(AllLeadApi);
      console.log(res.data);
      setLead(res.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      console.log("Error message: ", error.message);
    }
  }

  useEffect(() => {
    fetchLead();
  }, []);

  async function handleEdit(edit) {
    try {
      const res = await axios.post(
        `https://anvaya-model-references-apis-backen.vercel.app/leads/${leadId}`,
        edit
      );
      console.log(res, "checkingeess.");
      fetchLead();

      setFormModel(false);
      toast.success("Lead edited successfully.", {
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error, "error");
    }
  }

  //    function onInputChange(e) {
  //     const { name, value } = e.target;
  //     console.log(name, value, "nameValue");
  //     setEdit((prev) => ({
  //         ...prev, [name] : value
  //     }));

  //   }

  function onInputChange(e) {
    const { name, value } = e.target;

    if (name === "salesAgent") {
      // Find full salesAgent object by _id
      const selectedAgent =
        salesAgents.find((agent) => agent._id === value) || null;
      setEdit((prev) => ({
        ...prev,
        salesAgent: selectedAgent,
      }));
    } else {
      setEdit((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  return (
    <main className="leadContainer">
      <h1 className="text">Lead Details of {lead?.name}</h1>
      <div className="container">
        <div className="backBtnCont">
          <div className="backButn">
            <Link to="/">
              <button className="btnback">Back to Dashboard</button>
            </Link>
          </div>
        </div>

        <div
          className="midContainer"
          style={{ border: "1px ", width: "55rem" }}
        >
          <div
            style={{
              border: "1px solid white",
              width: "20rem",
              height: "22rem",
              padding: "2rem",
              borderRadius: "1rem",
            }}
          >
            <p>Lead Name: {lead?.name}</p>
            <p>Lead Source: {lead?.source}</p>
            <p>
              Sales Agent: {lead?.salesAgent?.name} ({lead?.salesAgent?.email})
            </p>
            <p>Lead Status: {lead?.status}</p>
            <p>Lead Tags: {lead?.tags}</p>
            <p>Time To Close: {lead?.timeToClose}</p>
            <p>Priority: {lead?.priority}</p>
            <p>Created At: {lead?.createdAt}</p>
            <p>Updated At: {lead?.updatedAt}</p>

            <button onClick={() => setFormModel(true)} className="editBtn">
              Edit
            </button>
          </div>

          <br />
          <div>
            {formModel && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit(edit);
                }}
                className="editForm"
              >
                <label>Lead Name: </label>
                <input
                  type="text"
                  name="name"
                  value={edit.name || ""}
                  onChange={(e) => onInputChange(e)}
                  className="inpStyl"
                />
                <br />

                <label>Sales Agent:</label>
                <select
                  name="salesAgent"
                  value={edit?.salesAgent?._id || ""}
                  onChange={(e) => onInputChange(e)}
                  className="inpStyl"
                >
                  {salesAgents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name} ({agent.email})
                    </option>
                  ))}
                </select>

                <br />

                <label>Lead Source: </label>
                <select
                  name="source"
                  value={edit.source || ""}
                  onChange={(e) => onInputChange(e)}
                  className="inpStyl"
                >
                  <option value="">Select Source</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Email">Email</option>
                  <option value="Other">Other</option>
                </select>
                <br />

                <label>Lead Status: </label>
                <select
                  name="status"
                  value={edit.status || ""}
                  onChange={(e) => onInputChange(e)}
                  className="inpStyl"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
                <br />

                <label>Priority: </label>
                <select
                  name="priority"
                  value={edit.priority || ""}
                  onChange={(e) => onInputChange(e)}
                  className="inpStyl"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <br />

                <label>Time to close: </label>
                <input
                  type="number"
                  name="timeToClose"
                  value={edit.timeToClose || ""}
                  onChange={(e) => onInputChange(e)}
                  className="inpStyl"
                />
                <br />

                <div style={{ display: "flex", gap: "1rem" }}>
                  <button type="submit" className="editBtn">
                    Save
                  </button>

                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => setFormModel(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LeadDetails;
