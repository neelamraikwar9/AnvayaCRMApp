import { useState, useEffect } from "react";
import axios from "axios";

const LeadForm = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "New",
    priority: "Medium",
    timeToClose: "",
    tags: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [salesAgents, setSalesAgents] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(true);

  useEffect(() => {
    const fetchSalesAgents = async () => {
      try {
        console.log("Fetching sales agents...");
        const response = await axios.get("https://anvaya-model-references-apis-backen.vercel.app/salesAgent");
        console.log("Sales agents fetched:", response.data);
        setSalesAgents(response.data);
      } catch (error) {
        console.error("Error fetching sales agents:", error);
        setSalesAgents([]); 
      } finally {
        setLoadingAgents(false);
      }
    };

    fetchSalesAgents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "timeToClose" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    
    setIsSubmitting(true);
    
    const submitData = {
      ...formData,
      tags: formData.tags ? [formData.tags] : [], // Convert string to array
      salesAgent: formData.salesAgent || null, 
    };
    
    console.log("Submitting to API:", submitData);
    
    try {
      const response = await axios.post(
        "https://anvaya-model-references-apis-backen.vercel.app/leads",
        JSON.stringify(submitData),
        { 
          headers: { 
            "Content-Type": "application/json"
          } 
        }
      );
      
      console.log("Lead added successfully:", response.data);
      alert("✅ Lead added successfully!");
      
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
        alert(` Error: ${error.response.data.message || 'Failed to add lead'}`);
      } else if (error.request) {
        
        console.error("Network error:", error.request);
        alert(" Network error: Please check your internet connection");
      } else {
         
        console.error("Error:", error.message);
        alert(` Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#e8f4fd', padding: '10px', marginBottom: '20px', border: '1px solid #0066cc', borderRadius: '4px' }}>
          <strong>✅ SUCCESS: LeadForm Component is rendering!</strong>
          <br />
          <small>Sales Agents Loaded: {salesAgents.length} agents</small>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Add New Lead</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold' }}>Lead Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              placeholder="Enter lead name"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold' }}>Lead Source:</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold' }}>Sales Agent:</label>
            <select
              name="salesAgent"
              value={formData.salesAgent}
              onChange={handleChange}
              disabled={loadingAgents}
              style={{ 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                opacity: loadingAgents ? 0.6 : 1
              }}
            >
              <option value="">
                {loadingAgents ? 'Loading agents...' : 'Select Sales Agent'}
              </option>
              {salesAgents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name} ({agent.email})
                </option>
              ))}
            </select>
            {loadingAgents && (
              <small style={{ color: '#666', fontSize: '12px' }}>
                Loading sales agents...
              </small>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold' }}>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal_Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold' }}>Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold' }}>Time to Close (days):</label>
            <input
              type="number"
              name="timeToClose"
              value={formData.timeToClose}
              onChange={handleChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              placeholder="Number of days"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold' }}>Tags:</label>
            <select
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="">Select Tags</option>
              <option value="hot-lead">Hot Lead</option>
              <option value="follow-up">Follow Up</option>
              <option value="qualified">Qualified</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              padding: '12px 24px', 
              backgroundColor: isSubmitting ? '#6c757d' : '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              fontSize: '16px', 
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginTop: '20px',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Creating Lead...' : 'Create Lead'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default LeadForm;
