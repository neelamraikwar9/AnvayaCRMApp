import './App.css';
import {Routes, Route} from 'react-router-dom';


import LeadForm from './assets/components/LeadForm';



function App() {
  
  return (
    <>
      <Routes>
      <Route path="/" element={<LeadForm/>}></Route>
       
      </Routes>
    </>
  )
}

export default App;
