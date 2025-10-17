import { NavLink } from "react-router-dom";

function Navbar() {
  //    const navStyle = {
  //        display: 'flex',
  //        width: '100%',
  //        height: '3rem',
  //     //    backgroundColor: 'green'
  // }

  return (
    <>
      <nav>
        <ul style={{border: '', padding: '0rem', display: 'flex', flexDirection:'column'}}>
        
    
          <div>
          <li className="styleList">
            <NavLink to="/leadManagement" className="navLinkStyl">Leads</NavLink>
          </li>
          </div>
          
          <div>
          <li className="styleList">
            <NavLink to="/leadList" className="navLinkStyl">Lead List</NavLink>
          </li>
          </div>
         
          <div>
          <li className="styleList">
            <NavLink to="/salesAgentManagement" className="navLinkStyl">Sales Agent</NavLink>
          </li>
          </div>
          
          <div>
          <li className="styleList">
            <NavLink to="/reports" className="navLinkStyl">Reports</NavLink>  
          </li>
          </div>
          
          <div>
          <li className="styleList">
            <NavLink to="/leadStatusView" className="navLinkStyl">Lead Status View</NavLink>
          </li>
          </div>

          <div>
          <li className="styleList">
            <NavLink to="/salesAgentView" className="navLinkStyl">sales Agent View</NavLink>
          </li>
          </div>

          <div>
          <li className="styleList">
            <NavLink to="/setting" className="navLinkStyl">Setting</NavLink>
          </li>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
