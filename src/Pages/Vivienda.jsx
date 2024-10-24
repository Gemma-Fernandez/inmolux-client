import React from "react";
import { useEffect, useState } from 'react';
import service from "../services/config.js";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { WishlistContext } from "../context/Wishlist.context.jsx";
import Search from "./Search.jsx";
import { DataContext } from "../context/Data.context.jsx"
import ClockLoader from "react-spinners/ClockLoader";


function Vivienda() {
  const { addWish, removeWish, wishlist } = useContext(WishlistContext);
  const { allData, filteredData, setFilteredData } = useContext(DataContext)
  const [viviendas, setViviendas] = useState([])
  



  useEffect(() => {
    const getViviendas = async () => {
      try {
        const response = await service.get('/vivienda')
        setViviendas(response.data || [])
        
      } catch (error) {
        console.log(error)
      }
    }
    getViviendas()
  }, [])

  const inList = (viviendasId) => {
    return wishlist.some((item) => item._id === viviendasId)
  }

  const resetFilters = () => {
    setFilteredData([])
  }

  const dataToDisplay = filteredData.length > 0 ? filteredData : viviendas;
  

  return (
    <>
      <h1 className="title-viviendas">Viviendas</h1>
      {filteredData.length > 0 && (
             <button onClick={resetFilters} className="button-back-viviendas">
             Back
           </button>
          )}
      <div className="viviendas-container">
        <div className="sidebar search-desktop">
          <Search/>
        </div>
        {dataToDisplay.length > 0 ? (
          dataToDisplay.map((eachElemnt) => (
            <div key={eachElemnt._id} className='vivienda-card'>
              <Link to={`/vivienda/${eachElemnt._id} `} className="vivienda-link">
                <img src={eachElemnt.image1} className="vivienda-image" />
                <h3 className="description-vivienda">{eachElemnt.name}</h3>
              </Link>
              <p className="description-vivienda">{eachElemnt.city}</p>
              <p className="description-price">{eachElemnt.price} €</p>
              <button type='button'
                className='whish-button-green '
                onClick={() =>
                  inList(eachElemnt._id) ? removeWish(eachElemnt._id) : addWish(eachElemnt._id)}>
                <FaHeart style={{ color: inList(eachElemnt._id) ? '#074d57' : 'gray' }} />
              </button>
            </div>
          ))
        ) : (
          <div className="spinner-container">
          <p className="spinner"><ClockLoader/></p>
          </div>
        )}
      </div>
    </>
  )
}

export default Vivienda;
