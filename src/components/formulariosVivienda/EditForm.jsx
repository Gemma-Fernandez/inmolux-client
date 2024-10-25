import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { DataContext } from "../../context/Data.context";
import service from "../../services/config.js";
import "./Formularios.css"




function EditForm() {
  const { viviendasId } = useParams();
  const navigate = useNavigate();
  const{authenticateUser}=useContext(AuthContext)
  const {setAllData } = useContext(DataContext);


  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [property_type, setProperty_type] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  

  useEffect(() => {
    service
      .get(`/vivienda/${viviendasId}`)
      .then((response) => {
        setName(response.data.name);
        setCity(response.data.city);
        setDescription(response.data.description);
        setProperty_type(response.data.property_type);
        setBathrooms(response.data.bathrooms);
        setBedrooms(response.data.bedrooms);
        setImage(response.data.image);
        setPrice(response.data.price);
        
      })
      
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token= localStorage.getItem("token");

    const editVivienda = {
      name,
      city,
      description,
      property_type,
      bathrooms,
      bedrooms,
      image,
      price,
    };
    try {
      const response= await service.put(`/vivienda/${viviendasId}/edit`, editVivienda);
      
      setAllData((prevData) =>
        prevData.map((vivienda) =>
          vivienda._id === viviendasId ? response.data : vivienda
        )
      );
      navigate(`/vivienda/${viviendasId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="title-contain"><h2 className="form-title-add">Edit vivienda</h2></div>
      <form onSubmit={handleSubmit} className='form-editvivienda'>
      <label>Name:</label>
        <input
          type="text"
          name="text"
          value={name}
          onChange={(event)=> setName(event.target.value)}
          placeholder="name"
          className="placeholder-add"
        />
        <br />
        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={image}
          onChange={(event)=> setImage(event.target.value)}
          placeholder="image"
          className="placeholder-add"
        />
        <br />
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={(event)=> setCity(event.target.value)}
          placeholder="city"
          className="placeholder-add"
        />
        <br />
        <label>Description:</label>
        <input
          as="textarea"
          type="text"
          name="description"
          value={description}
          onChange={(event)=> setDescription(event.target.value)}
          placeholder="description"
          className="placeholder-add"
        />
        <br />
        <label>Property type:</label>
        <input
          type="text"
          name="property_type"
          value={property_type}
          onChange={(event)=> setProperty_type(event.target.value)}
          placeholder="Porperty type"
          className="placeholder-add"
        />
        <br />
        <label>Bathrooms:</label>
        <input
          type="text"
          name="Bathrooms"
          value={bathrooms}
          onChange={(event)=> setBathrooms(event.target.value)}
          placeholder="Bathrooms"
          className="placeholder-add"
        />
        <br />
        <label>Bedrooms:</label>
        <input
          type="text"
          name="bedrooms"
          value={bedrooms}
          onChange={(event)=> setBedrooms(event.target.value)}
          placeholder="bedrooms"
          className="placeholder-add"
        />
        <br />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(event)=> setPrice(event.target.value)}
          placeholder="Price"
          className="placeholder-add"
        />
        <br />
        <button onClick={handleSubmit} type="submit" className="buttonAdd">Save change</button>
      </form>
    </div>
  );
}

export default EditForm;
