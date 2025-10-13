import { NavLink } from "react-router-dom";
// import LeadForm from "./LeadForm";
// import AgentForm from "./AgentForm";


function Navbar(){

   const navStyle = {
       display: 'flex',
       width: '100%',
       height: '3rem', 
    //    backgroundColor: 'green'
}

    return (
        <>
            <nav style={navStyle}>
                <ul>
                    <li><NavLink to="/">Dashboard</NavLink></li>
                    <li><NavLink to="/leadForm">Lead Form</NavLink></li>
                    <li><NavLink to="/agentForm">Agent Form</NavLink></li>
                    <li><NavLink to="/leadManagement">Lead Management</NavLink></li>
                    <li><NavLink to="/leadList">Lead List</NavLink></li>

                
                    
                </ul>
            </nav>
        </>
    )
}

export default Navbar; 