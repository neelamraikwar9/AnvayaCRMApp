// import {createContext, useContext, useState, useEffect} from 'react';
// import axios from 'axios';

// const apiContext = createContext();

// const useApiContext = () => useContext(apiContext);

// export function apiProvider({ children }) {

// const [salesAgents, setSalesAgents] = useState([]);
// console.log(salesAgents, "checkign issales agents l")

// async function fetchSalesAgents() {
//       try {
//         console.log("Fetching sales agents...");
//         const response = await axios.get(
//           "https://anvaya-model-references-apis-backen.vercel.app/salesAgent"
//         );
//         console.log("Sales agents fetched:", response.data);
//         setSalesAgents(response.data);
//       } catch (error) {
//         console.error("Error in fetching sales agents:", error);
//         setSalesAgents([]);
//       }
//     }

//     useEffect(() => {
    
//     fetchSalesAgents();
//   }, []);


//   return <useApiContext.provider value={ salesAgents }>
//     {children}
//   </useApiContext.provider>
// }


// export default useApiContext; 