import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/Data.context.jsx";
import { Link } from "react-router-dom";


function Viviendas() {
  const { allData, isLoggedIn, admin, user } = useContext(DataContext);

  return (
    <div>
      <h1>Viviendas</h1>
      {allData.map((eachElemnt) => {
        return (
          <div key={eachElemnt._id}>
            <Link  to={`/vivienda/${eachElemnt._id} `}>
              {eachElemnt.name}
              <img src={eachElemnt.image} style={{ width: "200px" }} />
              <p>{eachElemnt.price} €</p>
            </Link>
           
          </div>
        );
      })}
    </div>
  );
}

export default Viviendas;
