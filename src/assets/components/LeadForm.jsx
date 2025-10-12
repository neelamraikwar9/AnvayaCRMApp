import './leadForm.css';
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const LeadForm = () => {
  const [agent, setAgent] = useState([]);
  const [tags, setTags] = useState([]);

  const agentsApi =
    "https://anvaya-model-references-apis-backen.vercel.app/salesAgent";

  async function getAgentApi() {
    try {
      const res = await axios.get(agentsApi);
      console.log(res.data);
      setAgent(res.data);
    } catch (error) {
      console.error("Error message: ", error.message);
    }
  }
  //we are running this useEffect for one time only.
  useEffect(() => {
    getAgentApi();
  }, []);

  const tagsApi = "https://anvaya-model-references-apis-backen.vercel.app/tags";

  async function getTagsApi() {
    try {
      const res = await axios.get(tagsApi);
      console.log(res.data);
      setTags(res.data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getTagsApi();
  }, []);

  const [formData, setFormData] = useState({
    leadName: "",
    leadSource: "",
    salesAgent: "",
    leadStatus: "",
    priority: "",
    timeToClose: "",
    tags: "",
  });
  //   console.log(leadName, leadSource, priority, timeToClose, tags, "checking forms")

  console.log(JSON.stringify(formData), "checking form Data");
  console.log(formData, "checking form Data");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "timeToClose" ? parseInt(value) : value,
    }));
  };

    async function handleSubmit(event) {
      event.preventDefault();

      try {
        const response = await axiosInstance.post(
          "https://anvaya-model-references-apis-backen.vercel.app/leads",
          formData
        );
        // console.log(response, "checking response")
        console.log('Lead added successfully', response);
        // console.log(formData, "form Data");
        console.log("Lead added successfully.", response);
      } catch (error) {
    if (error.response) {
      // Now catch the global intercepted error here
      console.error('Backend error:', error.response.data);
    } else {
      console.error('Network or Axios error:', error.message);
    }
  }
}

  return (
    <main>
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="formStyle">
        <h1> Add New Lead </h1>
        <div className="formBox">
        <label htmlFor="nam">Lead Name: </label>
        <input
          type="text"
          id="nam"
          name="leadName"
          value={formData.leadName}
          onChange={handleChange}
        />
        </div>
        
        <div className="formBox">
        <label htmlFor="sour">Lead Source: </label>
        <select
          id="sour"
          name="leadSource"
          value={formData.leadSource}
          onChange={handleChange}
        >
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Cold Call">Cold Call</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Email">Email</option>
          <option value="Other">Other</option>
        </select>
        </div>

        <div className="formBox">
        <label htmlFor="sales">Sales Agent: </label>
        <select
          id="sales"
          name="salesAgent"
          value={formData.salesAgent}
          onChange={handleChange}
        >
          <option value="">Sales Agent</option>
          {agent.map((agen) => (
            <option key={agen._id} value={agen.name}>
              {agen.name}
            </option>
          ))}
        </select>
        </div>

        <div className="formBox">
        <label htmlFor="stat">Lead Status: </label>
        <select
          id="stat"
          name="leadStatus"
          value={formData.leadStatus}
          onChange={handleChange}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
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
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        </div>

        <div className='formBox'>
        <label htmlFor="time">Time to Close: </label>
        <input
          type="number"
          name="timeToClose"
          value={formData.timeToClose}
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
          <option value="">Tags</option>
          {tags.map((tag) => (
            <option key={tag._id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
        </div>
        <br/>

        <div className="formBox">
        <button type="submit" className="button">Create Lead</button>
        </div>
      </form>
      </div>
    </main>
  );
};

export default LeadForm;
