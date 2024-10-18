import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {DataContext} from "../context/Data.context"
import { useContext } from "react";


function ViviendasDetails() {
  const {allData}= useContext(DataContext)
  const {viviendasId} = useParams();

  const [viviendaToShow, setViviendaToShow] = useState(null);

  useEffect(() => {
    const vivienda= allData.find((vivienda)=>vivienda._id === viviendasId);
    setViviendaToShow(vivienda);
  }, [allData, viviendasId] );

  

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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViviendasDetails;
