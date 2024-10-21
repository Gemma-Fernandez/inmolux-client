import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import {AuthContext} from "../context/auth.context"
import service from "../services/config.js"

const DataContext = createContext();

function DataWrapper({ children }) {
  const {user} = useContext(AuthContext)
  const [allData, setAllData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [solicitudes, setSolicitudes]=useState([])
  const [showSoli, setShowSoli] = useState([])
  useEffect(() => {
    getData();
    if(user) {
      showSolicitudes()
    }
    
  }, [user]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/vivienda/`
      );
      
      setAllData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE solicitud "api/solicitud/:solicitudId"

  const removeSolicitud = async(solicitudId) =>{
    try {
      
    const response = await service.delete(`/solicitud/${solicitudId}`,
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
    )
    
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.filter((solicitud) => solicitud._id !== solicitudId))
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  
    const showSolicitudes= async()=>{
      try {
        const userId= user? user._id:null;
        console.log("user", userId)
    
        const response=await service.get(`/solicitud/${userId}`)
        
        setShowSoli(response.data)
       
      } catch (error) {
        console.log(error)
      }
    }
  
 
  

  return (
    <DataContext.Provider value={{ allData, setAllData, getData, filteredData, setFilteredData, removeSolicitud, solicitudes, setSolicitudes , showSoli, setShowSoli, showSolicitudes}}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataWrapper };
