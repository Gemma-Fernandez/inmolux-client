import React from 'react'
import { useParams, Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import service from "../services/config";
import { DataContext } from "../context/Data.context";


function UserProfile() {
  const {solicitudes, setSolicitudes, showSoli, setShowSoli, showSolicitudes} = useContext(DataContext)
  const {user } = useContext(AuthContext)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newUserName, setNewUserName] = useState("") 
 
  //const {userId}= useParams()

 
  


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await service.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
          },
        });
        
        setUserData(response.data.user); 
        setNewEmail(response.data.user.email || "")
        setNewUserName(response.data.user.username || "")
      } catch (err) {
        console.error(err);
        setError("Error al buscar los datos del usuario");
      }
    };
console.log(user)
fetchUserData()
if(user){
  
  showSolicitudes()

}
}, [user]);


  
  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }


  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleEmailEdit = async () => {
    try {
      const response = await service.patch(
        "/user/profile/email",
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setUserData((prevUserData) => ({
        ...prevUserData,
        email: response.data.user.email,
      }));

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al actualizar el email");
    }
  };

  //--------Username---------
  const handleUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleUserNameEdit = async () => {
    try {
      const response = await service.patch(
        "/user/profile/username",
        { username: newUserName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setUserData((prevUserData) => ({
        ...prevUserData,
        username: response.data.user.username,
      }));

      setIsEditingUsername(false)
      setErrorMessage("")
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al actualizar el email");
    }
  };

  

  

  return (
    <div className='profile-container'>
      <div className='profile-image'>
      <h1 className='profile-title'>{userData.username} profile</h1>
        <img
        className='image'
          src={userData.profile_image}
          alt="Profile"
        />
        </div>


      <div className='profile-name-email-edit'>
        <div className='profile-name'>
        <p className='profile-name'>{userData.username}</p>
        <>
        {isEditingUsername ? (
          <div className='profile-drop'>
            <input type="text" value={newUserName} onChange={handleUserNameChange} />
            <button className='button-profile' onClick={handleUserNameEdit}>Enviar</button>
            <button className='button-cancelar' onClick={() => setIsEditingUsername(false)}>Cancelar</button>
          </div>
        ) : (
          <button className='button-profile' onClick={() => {
            setNewUserName(userData.username);
            setIsEditingUsername(true);
          }}>Editar Username</button>
        )}
        {errorMessage && <p>{errorMessage}</p>}
      </>
      </div>
      <div className='profile-email'>
      <p className='profile-email'>{userData.email}</p>
        {isEditing ? (
          <div className='profile-drop'>
            <input type="email" value={newEmail} onChange={handleEmailChange} />
            <button className='button-profile' onClick={handleEmailEdit}>Enviar</button>
            <button className='button-cancelar'onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        ) : (
          <button className='button-profile' onClick={() => setIsEditing(true)}>Editar e-mail</button>
        )}
        {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
      
      <h2>My Request</h2>
      {showSoli.map((eachElement, i)=>(
        <li key={i}>
          <h3>Apartment: {eachElement.vivienda.name} - {eachElement.vivienda.city} </h3> {/* falta name y city*/}
          <p>Message: {eachElement.message}</p>
          
        </li>
      )
      )}
      </div>
  )
}

export default UserProfile

//<button onClick={() => removeSolicitud(eachElement._id)}>Delete</button>