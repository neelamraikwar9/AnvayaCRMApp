import './App.css';
import {Routes, Route} from 'react-router-dom';


import LeadForm from './assets/components/LeadForm';
import AgentForm from './assets/components/AgentForm';



function App() {
  
  return (
    <>
      <Routes>
      <Route path="/" element={<LeadForm/>}></Route>
      <Route path="/agentForm" element={<AgentForm/>}></Route>

      </Routes>
    </>
  )
}

export default App;
