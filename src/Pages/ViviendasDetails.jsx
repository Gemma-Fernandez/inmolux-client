import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {DataContext} from "../context/Data.context";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import service from "../services/config.js";

function ViviendasDetails() {
  const {allData, setAllData}= useContext(DataContext)
  const{authenticateUser, admin}=useContext(AuthContext)
  const {viviendasId} = useParams();
  const navigate= useNavigate();



  const [viviendaToShow, setViviendaToShow] = useState(null);

  useEffect(() => {
    const vivienda= allData.find((vivienda)=>vivienda._id === viviendasId);
    setViviendaToShow(vivienda);
  }, [allData, viviendasId] );

  const handleDelete= async()=>{
    try {      
      const response= await service.delete(`/vivienda/${viviendasId}`)
      setAllData((newData)=> newData.filter((element)=> element._id !==viviendasId))
      
      localStorage.setItem("authToken", response.data.authToken);
      console.log(response.data.authToken)
      await authenticateUser();
      navigate("/vivienda");
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div>
      {viviendaToShow ? (
        <>
          <h1>{viviendaToShow.name}</h1>
          <img src={viviendaToShow.image} style={{ width: "200px" }} />
          <p>{viviendaToShow.city}</p>
          <p>{viviendaToShow.description}</p>
          <p>Type: {viviendaToShow.property_type}</p>
          <p>Bathrooms: {viviendaToShow.bathrooms}</p>
          <p>Bedrooms: {viviendaToShow.bedrooms}</p>
          <p>{viviendaToShow.price} €</p>
          {admin? (
          <Link to={`/vivienda/${viviendasId}/edit`}>
            <button>Edit Vivienda</button>
          </Link>  
          ): null}
          {admin ? (<button onClick={handleDelete} >Delete</button>) : null
          }
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViviendasDetails;
