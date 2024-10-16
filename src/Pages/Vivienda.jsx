import React from 'react'
import { useContext } from "react";
import { DataContext } from "../context/Data.context.jsx";

function Viviendas() {
const{allData, setAllData}= useContext(DataContext)

  return (
    <div>
      <h1>Viviendas</h1>
      {allData.map((eachElemnt, i) => {
        return(<div key={i}>{eachElemnt.name}
        <img src={eachElemnt.image} style={{width: "200px"}}/>
        <p>{eachElemnt.price} €</p>
        </div>
      )}
      
      )}
    </div>
  )
}

export default Viviendas