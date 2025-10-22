import "./leadForm.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    priority: "",
    timeToClose: "",
    tags: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [salesAgents, setSalesAgents] = useState([]);

  //
  const [loadingAgents, setLoadingAgents] = useState(true);

  //we are running this useEffect for one time only.
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
      } finally {
        setLoadingAgents(false);
      }
    }
    fetchSalesAgents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "timeToClose" ? parseInt(value) : value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted with data:", formData);

    setIsSubmitting(true);

    const submitData = {
      ...formData,
      tags: formData.tags ? [formData.tags] : [],
      salesAgemt: formData.salesAgent || null,
    };

    console.log("Submitting to API:", submitData);

    try {
      const response = await axios.post(
        "https://anvaya-model-references-apis-backen.vercel.app/leads",
        JSON.stringify(submitData),
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Lead added successfully", response.data);

      toast.success("Lead added successfully.", {
        autoClose: 3000
      })
      

      setFormData({
        name: "",
        source: "",
        salesAgent: "",
        status: "New",
        priority: "Medium",
        timeToClose: "",
        tags: "",
      });
    } catch (error) {
      console.error("Error submitting lead:", error);

      if (error.response) {
        console.error("Server error:", error.response.data);
        console.error("Status:", error.response.status);
        alert(` Error: ${error.response.data.message || "Failed to add lead"}`);
      } else if (error.request) {
        console.error("Network error:", error.request);
        alert("Network error: Please check your internet connection.");
      } else {
        console.error("Error:", error.message);
        alert(` Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <div className="formContainer">
        <form onSubmit={handleSubmit} className="formStyle">
          <h1 className="text"> Add New Lead </h1>

          <div className="formBox">
            <label htmlFor="nam">Lead Name: </label>
            <input
              type="text"
              id="nam"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter lead name"
            />
          </div>

          <div className="formBox">
            <label htmlFor="sour">Lead Source: </label>
            <select
              id="sour"
              name="source"
              value={formData.source}
              onChange={handleChange}
            >
              <option value="">Select Source</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="formBox">
            <label htmlFor="sale">Sales Agent: </label>
            <select
              id="sale"
              name="salesAgent"
              value={formData.salesAgent}
              onChange={handleChange}
              disabled={loadingAgents}
            >
              <option value="">
                {loadingAgents ? "Loading Agents..." : "Select Sales Agent"}
              </option>
              {salesAgents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name} ({agent.email})
                </option>
              ))}
            </select>
            {loadingAgents && (
              <small style={{ color: "#666", fontSize: "12px" }}>
                Loading sales agents...
              </small>
            )}
          </div>

          <div className="formBox">
            <label htmlFor="stat">Lead Status: </label>
            <select
              id="stat"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal_Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="formBox">
            <label htmlFor="pri">Priority: </label>
            <select
              id="pri"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              style={{ AccentColor: "green" }}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="formBox">
            <label htmlFor="time">Time to Close: </label>
            <input
              type="number"
              name="timeToClose"
              value={isNaN(formData.timeToClose) ? "" : formData.timeToClose}
              id="time"
              placeholder="Number of Days"
              onChange={handleChange}
            />
          </div>

          <div className="formBox">
            <label htmlFor="tag">Tags: </label>
            <select
              id="tag"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            >
              <option value="">Select Tags</option>
              <option value="hot-lead">Hot Lead</option>
              <option value="follow-up">Follow Up</option>
              <option value="qualified">Qualified</option>
            </select>
          </div>
          <br />

          <div className="formButton">
            <button type="submit" disabled={isSubmitting} className="button">
              {isSubmitting ? "Create Lead" : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LeadForm;
