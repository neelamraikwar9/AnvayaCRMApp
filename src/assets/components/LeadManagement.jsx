import "./leadManagement.css";
import axios from "axios";
import { Link } from "react";
import { useState, useEffect } from "react";

function LeadManagement() {
  const [comment, setComment] = useState([]);
  const commentApi =
    "https://anvaya-model-references-apis-backen.vercel.app/comments";

  async function getComments() {
    try {
      const res = await axios.get(commentApi);
      console.log(res.data);
      setComment(res.data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <main className="leadContainer">
      <h1 className="text">Lead Management: [Lead Name]</h1>
      <div className="container">
        <div className="backButn">
          <Link to="/">
            <button>Back to Dashboard</button>
          </Link>
        </div>

        <div className="detailContainer">
          <h2>Lead Details</h2>
          <p>Lead Name: </p>
          <p>Sales Agent: </p>
          <p>Lead Source: </p>
          <p>Lead Status: </p>
          <p>Priority: </p>
          <p>Time to Close: </p>
          <br />
          <button>Edit Lead Details</button>
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

          <button className="button">Submit Comment</button>
        </div>
      </div>
    </main>
  );
}

export default LeadManagement;
