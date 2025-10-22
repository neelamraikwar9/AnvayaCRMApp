import "./App.css";
import { Routes, Route } from "react-router-dom";
import LeadForm from "./components/LeadForm";
import AgentForm from "./components/AgentForm";
import Dashboard from "./pages/Dashboard";
import LeadManagement from "./components/LeadManagement";
import LeadList from "./components/LeadList";
import LeadDetails from "./pages/LeadDetails";
import SalesAgentManagement from "./components/SalAgentManagement";
import Report from "./pages/Reports";
import LeadStatusView from "./components/LeadStatusView";
import SalesAgentView from "./components/SalesAgentView";
import Setting from "./pages/Setting";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/leadForm" element={<LeadForm />}></Route>
        <Route path="/agentForm" element={<AgentForm />}></Route>
        <Route path="/leadManagement" element={<LeadManagement />}></Route>
        <Route path="/leadList" element={<LeadList />}></Route>
        <Route path="/lead/:leadId" element={<LeadDetails />}></Route>

        <Route
          path="/salesAgentManagement"
          element={<SalesAgentManagement />}
        ></Route>
        <Route path="/reports" element={<Report />}></Route>

        <Route path="/leadStatusView" element={<LeadStatusView />}></Route>
        <Route path="/salesAgentView" element={<SalesAgentView />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
      </Routes>
      <ToastContainer autoClose={3000} />
      
    </>
  );
}

export default App;
