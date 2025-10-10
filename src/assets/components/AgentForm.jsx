import { useState } from "react";
import axios from "axios";

const AgentForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: ""
    });

    function handleChange(e){
       const { name, value } = e.target; 
       setForm((prev) => ({...prev, [name] : value})
    )}

    async function handleSubmit(e){
        e.preventDefault();

        try{
        const res = await axios.post("https://anvaya-model-references-apis-backen.vercel.app/salesAgent", form)
        console.log(res, "checking res.")
        } catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <h1>Add New Sales Agent</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="nam">Agent Name: </label>
        <input type="text" id="nam" name="name" onChange={handleChange}/>
        <br/>
        <label htmlFor="em">Email Address:</label>
        <input type="email" id="em" name="email" onChange={handleChange}/>

        <button type="submit">Create Agent</button>
        </form>
        </>
    )
}

export default AgentForm; 