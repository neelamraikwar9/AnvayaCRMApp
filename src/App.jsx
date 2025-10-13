import './App.css';
import {Routes, Route} from 'react-router-dom';


import LeadForm from './assets/components/LeadForm';
import AgentForm from './assets/components/AgentForm';
import Dashboard from './assets/pages/Dashboard';
import LeadManagement from './assets/components/LeadManagement';
import LeadList from './assets/components/LeadList';



function App() {
  
  return (
    <>
      <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/leadForm" element={<LeadForm/>}></Route>
      <Route path="/agentForm" element={<AgentForm/>}></Route>
      <Route path="/leadManagement" element={<LeadManagement/>}></Route>
      <Route path="/leadList" element={<LeadList/>}></Route>
      </Routes>
    </>
  )
}

export default App;
