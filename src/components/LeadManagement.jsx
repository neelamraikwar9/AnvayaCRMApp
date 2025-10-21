import "./leadManagement.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function LeadManagement() {
  const [commentData, setCommentData] = useState({
    lead: "",
    author: "",
    commentText: "",
  });

  const [comment, setComment] = useState([]);
  // console.log(comment, 'checking comemntes')

  const [salesAgents, setSalesAgents] = useState([]);

  const [lead, setLead] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showFormModel, setShowFormModel] = useState(false);
  const [edit, setEdit] = useState(lead);
  console.log(JSON.stringify(edit), "checking edit");

  // const [editForm, setEditForm] = useState();

  useEffect(() => {
    setEdit(lead);
    console.log(edit, "chekdignedit...");
  }, [lead]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await axios.get(
          "https://anvaya-model-references-apis-backen.vercel.app/comments"
        );
        console.log(res.data, "responseData");
        setComment(res.data);
        console.log(comment, "comments");

        // setCommentData(res.data);
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
        const res = await axios.get(
          "https://anvaya-model-references-apis-backen.vercel.app/leads"
        );
        console.log("Lead is fetched:", res.data);
        setLead(res.data);
      } catch (error) {
        console.error("Error in fetching lead: ", error);
        setLead([]);
      }
    }
    fetchLeads();
  }, []);

  async function handleOnChange(e) {
    const { name, value } = e.target;
    console.log(name, value, "checkign valu");
    setCommentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmitComment(e) {
    e.preventDefault();

    console.log("Form submitted with comment:", commentData);

    setIsSubmitting(true);

    const submitComment = { ...commentData, commentData };

    console.log("submitting to API: ", submitComment);

    try {
      const res = await axios.post(
        "https://anvaya-model-references-apis-backen.vercel.app/comments",
        JSON.stringify(submitComment),
        { headers: { "Content-Type": "application/json" } }
      );

      // setCommentData([]);

      console.log("Comment added successfully", res.data);
      alert("✅ Comment added successfully!");
    } catch (error) {
      console.log("Error", error);
    }
  }

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

  function onInputChange(e, index) {
    const { name, value } = e.target;
    console.log(name, value, "nameValue");
    const updatedEdit = [...edit];
    updatedEdit[index] = { ...updatedEdit[index], [name]: value };
    setEdit(updatedEdit);
  }

  async function handleEdit(leadID, edit, index) {
    try {
      const res = await axios.post(
        `https://anvaya-model-references-apis-backen.vercel.app/leads/${leadID}`,
        edit[index] //sending specific object
      );
      setShowFormModel(false);
      console.log(res, "checking res.");
      console.log("Lead details edited successfully", res.data);
      // setEditForm(res.data);
      // setLead(editForm);
      window.location.reload();

      alert("✅ Lead details edited successfully!");
    } catch (error) {
      console.log(error, "error");
    }
  }

  return (
    <main className="leadContainer">
      <h1 className="text">
        {/* Lead Management: {lead.slice(0, 1)?.map((led) => led.name)} */}
        Lead Management: {lead.slice(0, 1)?.map((led) => led.name)}
      </h1>
      <div className="container">
        <div className="backBtnCont">
          <div className="backButn">
            <Link to="/">
              <button>Back to Dashboard</button>
            </Link>
          </div>
        </div>

        <div className="midContainer" style={{width: '54rem'}} >
          <div>
            <h2>Lead Details</h2>
            {lead?.slice(0, 1)?.map((led) => (
              <div key={led._id}>
                <p>
                  <strong>Lead Name:</strong>&nbsp; {led.name}
                </p>
                <p>
                  <strong>Sales Agent:</strong> &nbsp;{led.salesAgent.name}
                </p>
                <p>
                  <strong>Lead Source:</strong> &nbsp;{led.source}
                </p>
                <p>
                  <strong>Lead Status:</strong> &nbsp;{led.status}
                </p>
                <p>
                  <strong>Priority:</strong> &nbsp;{led.priority}
                </p>
                <p>
                  <strong>Time to Close:</strong> &nbsp;{led.timeToClose} Days
                </p>
              </div>
            ))}

            <br />

            <button onClick={() => setShowFormModel(true)} className="editBtn">
              Edit Lead Details
            </button>
            {/* model for editing. */}

            <br />

            {showFormModel &&
              edit.slice(0, 1).map((item, index) => (
                <div key={item._id}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      handleEdit(item._id, edit, index);
                    }}
                    className="editForm"
                  >
                    <label>Lead Name: </label>
                    <input
                      type="text"
                      name="name"
                      value={item.name || ""}
                      onChange={(e) => onInputChange(e, index)}
                      className="inpStyl"
                    />
                    <br />

                    <label>Sales Agent:</label>
                    <select
                      name="salesAgent"
                      value={item.salesAgent || ""}
                      onChange={(e) => onInputChange(e, index)}
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
                      value={item.source || ""}
                      onChange={(e) => onInputChange(e, index)}
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
                      value={item.status || ""}
                      onChange={(e) => onInputChange(e, index)}
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
                      value={item.priority || ""}
                      onChange={(e) => onInputChange(e, index)}
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
                      value={item.timeToClose || ""}
                      onChange={(e) => onInputChange(e, index)}
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
                        onClick={() => setShowFormModel(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ))}
          </div>
          <br />
          <br />

          <h2>Comment Section</h2>
          <div className="commContainer">
            {comment?.map((comm) => (
              <div key={comm._id} className="commBox">
                <p>
                  <strong>{comm.author?.name}</strong> - {comm.createdAt}
                </p>
                <p>Comment: {comm.commentText}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmitComment}>
            <h3>Add New Comment</h3>
            <label style={{ fontSize: "16px" }}>Lead Name:</label>
            <select
              name="lead"
              value={commentData.lead}
              style={{ fontSize: "16px" }}
              onChange={handleOnChange}
            >
              <option value="">Select Lead</option>
              {lead?.map((led) => (
                <option key={led._id} value={led._id}>
                  {led.name}
                </option>
              ))}
            </select>
            <br />
            <br />

            <label style={{ fontSize: "16px" }}>Author Name:</label>
            <select
              name="author"
              value={commentData.salesAgent?.author}
              style={{ fontSize: "16px" }}
              onChange={handleOnChange}
            >
              <option value="">Select Author</option>
              {lead?.map((led) => (
                <option key={led._id} value={led.salesAgent?._id}>
                  {led.salesAgent?.name}
                </option>
              ))}
            </select>
            <br />
            <br />

            <label className="addCommText" htmlFor="comm">
              Comment
            </label>
            <br />
            <textarea
              rows={3}
              cols={85}
              id="comm"
              name="commentText"
              value={commentData.commentText}
              placeholder="write your comment..."
              className="typeComment"
              onChange={handleOnChange}
            ></textarea>
            <br />
            <br />

            <button type="submit" className="button">
              {isSubmitting ? "Submit Comment" : "Submit Comment"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LeadManagement;
