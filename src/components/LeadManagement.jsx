import "./leadManagement.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function LeadManagement() {
  const [comment, setComment] = useState([]);
  const [lead, setLead] = useState([]);

  
  useEffect(() => {
    async function fetchComments() {
    try {
      const res = await axios.get("https://anvaya-model-references-apis-backen.vercel.app/comments");
      console.log(res.data);
      setComment(res.data);
    } catch (error) {
      throw error;
    }
  }
    fetchComments();
  }, []);


  
  useEffect(() => {
    async function fetchLeads() {
    try {
      console.log("Fetching lead...");
      const res = await axios.get("https://anvaya-model-references-apis-backen.vercel.app/leads");
      console.log("Lead is fetched:", res.data);
      setLead(res.data);
    } catch (error) {
      console.error("Error in fetching lead: ", error);
      setLead([]);
    }
  }
    fetchLeads();
  }, []);




  return (
    <main className="leadContainer">
      <h1 className="text">Lead Management: {lead.slice(0, 1)?.map((led) => (led.name))}</h1>
      <div className="container">
        <div className="backButn">
          <Link to="/">
            <button>Back to Dashboard</button>
          </Link>
        </div>

        <div className="midContainer">
          <h2>Lead Details</h2>
          {lead.slice(0, 1)?.map((led) => (
          <div key={led._id}>
          <p><strong>Lead Name:</strong>&nbsp; {led.name}</p>
          <p><strong>Sales Agent:</strong> &nbsp;{led.salesAgent.name}</p>
          <p><strong>Lead Source:</strong> &nbsp;{led.source}</p>
          <p><strong>Lead Status:</strong> &nbsp;{led.status}</p>
          <p><strong>Priority:</strong> &nbsp;{led.priority}</p>
          <p><strong>Time to Close:</strong> &nbsp;{led.timeToClose} Days</p>
          </div>
          ))}
          <br />
        
          <button>Edit Lead Details</button>
          <br />
          <br />

          <h2>Comment Section</h2>
          <div className="commContainer">
            {comment?.map((comm) => (
              <div key={comm._id} className="commBox">
                <p>
                  <strong>{comm.author.name}</strong> - {comm.createdAt}
                </p>
                <p>Comment: {comm.commentText}</p>
              </div>
            ))}
          </div>
          <br />
          <label className="addCommText" htmlFor="comm">
            Add New Comment
          </label>
          <br />
          <textarea
            rows={3}
            cols={85}
            id="comm"
            placeholder="write your comment..."
            className="typeComment"
          ></textarea>
          {/* <input type="text" id="comm"/> */}
          <br />
          <br />

          <button className="button" onClick= {() => handleSubmitComment()}>Submit Comment</button>
        </div>
      </div>
    </main>
  );
}

export default LeadManagement;
