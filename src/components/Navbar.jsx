import { NavLink } from "react-router-dom";



function Navbar(){

//    const navStyle = {
//        display: 'flex',
//        width: '100%',
//        height: '3rem', 
//     //    backgroundColor: 'green'
// }

    return (
        <>
            <nav>
                <ul>
                    <li><NavLink to="/">Dashboard</NavLink></li>

                    <li><NavLink to="/leadForm">Lead Form</NavLink></li>
                    <li><NavLink to="/agentForm">Agent Form</NavLink></li>

                    <li><NavLink to="/leadManagement">Leads</NavLink></li>   
                    
                    <li><NavLink to="/leadList">Lead List</NavLink></li>

                    <li><NavLink to="/salesAgentManagement">Sales</NavLink></li>
                
                    <li><NavLink to="/reports">Reports</NavLink></li>

            
                    <li><NavLink to="/leadStatusView">Lead Status View</NavLink></li>
                    <li><NavLink to="/salesAgentView">sales Agent View</NavLink></li>




                
                    
                </ul>
            </nav>
        </>
    )
}

export default Navbar; 