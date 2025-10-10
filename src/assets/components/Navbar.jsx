import { NavLink } from "react-router-dom";
// import LeadForm from "./LeadForm";
// import AgentForm from "./AgentForm";


function Navbar(){

<style>
    .nav{{
       display: 'flex',
       width: '100%',
       height: '3rem', 
       backgroundColor: 'green'
    }}
</style>
    return (
        <>
            <nav className="nav">
                <ul>
                    <li><NavLink to="/">Lead Form</NavLink></li>
                    <li><NavLink to="/agentForm">Agent Form</NavLink></li>
                    {/* <li><NavLink></NavLink></li>
                    <li><NavLink></NavLink></li>
                    <li><NavLink></NavLink></li> */}
                </ul>
            </nav>
        </>
    )
}

export default Navbar; 