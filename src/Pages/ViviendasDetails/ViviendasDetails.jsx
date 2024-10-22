import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {DataContext} from "../../context/Data.context";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import service from "../../services/config.js";
import Carousel from 'react-bootstrap/Carousel';
import "./ViviendasDetails.css"


function ViviendasDetails() {
  const {allData, setAllData}= useContext(DataContext)
  const{authenticateUser, admin, user, isLoggedIn}=useContext(AuthContext)
  const {viviendasId} = useParams();
  const navigate= useNavigate();



  const [viviendaToShow, setViviendaToShow] = useState(null);
  const [showForm, setShowForm]=useState(false)
  const[message, setMessage]=useState("")
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const vivienda= allData.find((vivienda)=>vivienda._id === viviendasId);
    setViviendaToShow(vivienda);
  }, [allData, viviendasId] );

  const handleDelete= async()=>{
    try {      
      const response= await service.delete(`/vivienda/${viviendasId}`)
      setAllData((newData)=> newData.filter((element)=> element._id !==viviendasId))
      
      localStorage.setItem("authToken", response.data.authToken);
      await authenticateUser();
      navigate("/vivienda");
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleSubmit= async (event)=>{
    event.preventDefault()

    const newSolicitud={
      vivienda: viviendasId,
      message,
    };
    try {
     
      const response= await service.post("/solicitud", newSolicitud)

      if (response.status === 201) {
        setShowForm(true);
        setMessage("");
        setSuccess(true);
        setError(null);

        navigate(`/vivienda/${viviendasId}`);
    } else {
      setError("There was an error sending your request");
      setSuccess(false);
    }
    } catch (error) {
      console.log(error)
      setError("There was an error sending your request")
      setSuccess(false)
    }
  }

  return (
    <div>
      {viviendaToShow ? (
        <>
          <h1>{viviendaToShow.name}</h1>
          <Carousel  fade>
          <Carousel.Item> <img src={viviendaToShow.image1} style={{ width: "300px" }} />  </Carousel.Item>
          <Carousel.Item><img src={viviendaToShow.image2} style={{ width: "300px" }} /></Carousel.Item>
          <Carousel.Item> <img src={viviendaToShow.image3} style={{ width: "300px" }} /></Carousel.Item>
          </Carousel>
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
      {!admin? (
        <form onSubmit={handleSubmit}> 
        <h3>Are you interested in? Send a request for this property</h3>
            <textarea
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a message to the property owner..."
              required
            />
            <br/>
            <button type="submit">Send Request</button>
          </form> 
      ): null}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Request sent successfully!</p>}
      
    </div>
  );
}

export default ViviendasDetails;
