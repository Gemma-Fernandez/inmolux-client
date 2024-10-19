import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { DataContext } from "../../context/Data.context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import service from "../../services/config.js";
import "./Formularios.css"




function AddViviendaForm() {
    const navigate = useNavigate();
    const{setAllData}=useContext(DataContext)
  const{authenticateUser}=useContext(AuthContext)

    const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [property_type, setProperty_type] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

 const handleSubmit= async (event)=>{
    event.preventDefault();

    const newVivienda={
        name,
        city,
        description,
        property_type,
        bathrooms,
        bedrooms,
        image,
        price
    }
    try {
        const response= await service.post("/vivienda/addVivienda", newVivienda)

        localStorage.setItem("authToken", response.data.authToken);
        await authenticateUser();

        setAllData((element)=>[...element, response.data])
        navigate("/vivienda")
    } catch (error) {
        console.log(error)
        
    }
 }

  return (
    <div>
       <div className="title-contain"> <h2 className="form-title-add">Add new apartment</h2></div>
      <form onSubmit={handleSubmit} className='form-addvivienda'>
       
        <input
          type="text"
          name="text"
          value={name}
          onChange={(event)=> setName(event.target.value)}
          placeholder="name"
        />
        <br />
        <input
          type="text"
          name="image"
          value={image}
          onChange={(event)=> setImage(event.target.value)}
          placeholder="image"
        />
        <br />
        <input
          type="text"
          name="city"
          value={city}
          onChange={(event)=> setCity(event.target.value)}
          placeholder="city"
        />
        <br />
        <input
            as="textarea"
          type="text"
          name="description"
          value={description}
          onChange={(event)=> setDescription(event.target.value)}
          placeholder="description"
        />
        <br />
        <input
          type="text"
          name="property_type"
          value={property_type}
          onChange={(event)=> setProperty_type(event.target.value)}
          placeholder="Porperty type"
        />
        <br />
        <input
          type="text"
          name="Bathrooms"
          value={bathrooms}
          onChange={(event)=> setBathrooms(event.target.value)}
          placeholder="Bathrooms"
        />
        <br />
        <input
          type="text"
          name="bedrooms"
          value={bedrooms}
          onChange={(event)=> setBedrooms(event.target.value)}
          placeholder="bedrooms"
        />
        <br />
        <input
          type="number"
          name="price"
          value={price}
          onChange={(event)=> setPrice(event.target.value)}
          placeholder="Price"
        />
        <br />
        <button className="buttonAdd" onClick={handleSubmit} type="submit">Save change</button>
      </form>
    </div>
  )
}

export default AddViviendaForm