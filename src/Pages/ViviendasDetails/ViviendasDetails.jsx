import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {DataContext} from "../../context/Data.context";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import service from "../../services/config.js";
import Carousel from 'react-bootstrap/Carousel';
import "./ViviendasDetails.css"
import ClockLoader from "react-spinners/ClockLoader";



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
  const [isDelete, setIsDelete] =useState(false)

  useEffect(() => {
    const vivienda= allData.find((vivienda)=>vivienda._id === viviendasId);
    setViviendaToShow(vivienda);
  }, [allData, viviendasId] );

  const handleDelete= async()=>{
    try {      
      const response= await service.delete(`/vivienda/${viviendasId}`)
      setAllData((newData)=> newData.filter((element)=> element._id !==viviendasId))
      
      
      setIsDelete()
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
  if(viviendaToShow=== null){
    return <div className="spinner-container"><p className="spinner"><ClockLoader/></p></div>;
  }

  return (
    <div>
      {viviendaToShow ? (
        <>
          <h1 className="title-det">{viviendaToShow.name}</h1>
          <Carousel  fade >
          <Carousel.Item> <img src={viviendaToShow.image1} className="img-det" />  </Carousel.Item>
          <Carousel.Item><img src={viviendaToShow.image2} className="img-det" /></Carousel.Item>
          <Carousel.Item> <img src={viviendaToShow.image3} className="img-det"/></Carousel.Item>
          </Carousel>
          <h5 className="city-det">{viviendaToShow.city}</h5>
          <div className="container-det">
            <div className="info-det">
          <p>{viviendaToShow.description}</p>

            </div>
          <div className="types-det">
          <p><strong>Type:</strong> {viviendaToShow.property_type}</p>
          <p><strong>Bathrooms:</strong> {viviendaToShow.bathrooms}</p>
          <p><strong>Bedrooms:</strong> {viviendaToShow.bedrooms}</p>
          <p><strong>Price:</strong> {viviendaToShow.price} €</p>
          </div>
          </div>
          {admin? (
          <Link to={`/vivienda/${viviendasId}/edit`}>
            <button className="button-det">Edit information</button>
          </Link>  
          ): null}
          {admin ? (<button onClick={handleDelete} className="button-det">Delete</button>) : null
          }
        </>
      ) : (
        <p>Loading...</p>
      )}
      {!admin? (
        <form onSubmit={handleSubmit}> 
        <h3 className="solicitud-det">Are you interested in?</h3> <h6 >Send a request for this property</h6>
            <textarea
            className="textarea-det"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a message to the property owner..."
              required
            />
            <br/>
            <button type="submit" className="button-send">Send Request</button>
          </form> 
      ): null}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Request sent successfully!</p>}
      
    </div>
  );
}

export default ViviendasDetails;
