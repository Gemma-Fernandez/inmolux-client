import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import service from "../services/config";
import { DataContext } from "../context/Data.context";
import { IoIosCloudDone } from "react-icons/io";



function UserProfile() {
  const {showSoli, setShowSoli, showSolicitudes} = useContext(DataContext)
  const {user } = useContext(AuthContext)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [newUserName, setNewUserName] = useState("") 
  
 

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
}, [user, setShowSoli]);


  
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
      <h1 className='profile-title'>{userData.username} Profile</h1>
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
            <input type="text" value={newUserName} onChange={handleUserNameChange} className='input-profile-email-username'/>
            <button className='button-profile' onClick={handleUserNameEdit}>Enviar</button>
            <button className='button-cancelar' onClick={() => setIsEditingUsername(false)}>Cancelar</button>
          </div>
        ) : (
          <button className='button-profile' onClick={() => {
            setNewUserName(userData.username);
            setIsEditingUsername(true);
          }}>Edit your username</button>
        )}
        {errorMessage && <p>{errorMessage}</p>}
      </>
      </div>
      <div className='profile-email'>
      <p className='profile-email'>{userData.email}</p>
        {isEditing ? (
          <div className='profile-drop'>
            <input type="email" value={newEmail} onChange={handleEmailChange} className='input-profile-email-username'/>
            <button className='button-profile' onClick={handleEmailEdit}>Enviar</button>
            <button className='button-cancelar'onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <button className='button-profile' onClick={() => setIsEditing(true)}>Edit your email</button>
        )}
        {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
      <div className='user-requests-container'>
      <h4 className='title-profile'>My Requests <IoIosCloudDone className='icon-requests'/></h4>
      <div className='scrollable-menu'>
        {showSoli.map((eachElement) => (
          <div key={eachElement._id} className='section-request'>
            <div className='section-box'>
              <p className='section-name'>Apartment: {eachElement.vivienda.name} - {eachElement.vivienda.city}</p>
              <p className='section-name'>Message: {eachElement.message}</p>
              </div>
            </div>
        ))}
        </div>
    </div>
    </div>
  )
}

export default UserProfile

//<button onClick={() => removeSolicitud(eachElement._id)}>Delete</button>