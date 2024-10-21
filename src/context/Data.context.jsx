import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

function DataWrapper({ children }) {
  const [allData, setAllData] = useState([])
  const [filteredData, setFilteredData] = useState([])
 
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/vivienda/`
      );
      console.log(response.data);
      setAllData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <DataContext.Provider value={{ allData, setAllData, getData, filteredData, setFilteredData}}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataWrapper };
