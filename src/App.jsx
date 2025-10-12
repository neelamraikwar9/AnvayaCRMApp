import './App.css';
import {Routes, Route} from 'react-router-dom';


import LeadForm from './assets/components/LeadForm';
import AgentForm from './assets/components/AgentForm';
import Dashboard from './assets/pages/Dashboard';



function App() {
  
  return (
    <>
      <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/leadForm" element={<LeadForm/>}></Route>
      <Route path="/agentForm" element={<AgentForm/>}></Route>
      </Routes>
    </>
  )
}

export default App;
