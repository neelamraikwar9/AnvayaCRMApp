import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AgentForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://anvaya-model-references-apis-backen.vercel.app/salesAgent",
        JSON.stringify(form),
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Sales Agent added successfully", res.data);

      toast.success("Sales Agent added successfully!", {
        autoClose: 3000,
      });

      setForm({
        name: "",
        email: "",
      });
    } catch (error) {
      console.log("Error submitting lead:", error);
    }
  }

  return (
    <main>
      <div className="formContainer">
        <form onSubmit={handleSubmit} className="formStyle">
          <h1 className="text">Add New Sales Agent</h1>
          <div className="formBox">
            <label htmlFor="nam">Agent Name: </label>
            <input
              type="text"
              id="nam"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="formBox">
            <label htmlFor="em">Email Address:</label>
            <input
              type="email"
              id="em"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="formButton">
            <button type="submit" className="button">
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AgentForm;
