import "./App.css";
import { Routes, Route } from "react-router-dom";
import LeadForm from "./components/LeadForm";
import AgentForm from "./components/AgentForm";
import Dashboard from "./pages/Dashboard";
import LeadManagement from "./components/LeadManagement";
import LeadList from "./components/LeadList";
import SalesAgentManagement from "./components/SalAgentManagement";
import Report from "./pages/Reports";
import Form from "./components/Form";
import LeadStatusView from "./components/LeadStatusView";
import SalesAgentView from "./components/SalesAgentView";
import Setting from "./pages/Setting";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/leadForm" element={<LeadForm />}></Route>
        <Route path="/agentForm" element={<AgentForm />}></Route>
        <Route path="/leadManagement" element={<LeadManagement />}></Route>
        <Route path="/leadList" element={<LeadList />}></Route>
        <Route
          path="/salesAgentManagement"
          element={<SalesAgentManagement />}
        ></Route>
        <Route path="/reports" element={<Report />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/leadStatusView" element={<LeadStatusView />}></Route>
        <Route path="/salesAgentView" element={<SalesAgentView />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
      </Routes>
    </>
  );
}

export default App;
