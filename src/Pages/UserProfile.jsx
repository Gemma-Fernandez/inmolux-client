import React from 'react'
import { useParams, Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import service from "../services/config";



function UserProfile() {

  const {user} = useContext(AuthContext)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await service.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
          },
        });
        console.log(response.data.user)
        setUserData(response.data.user); 
      } catch (err) {
        console.error(err);
        setError("Error al buscar los datos del usuario");
      }
    };

    fetchUserData();
  }, []);

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
        "/user/profile",
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

  return (
    <div>
      <h1>User Profile:</h1>
      <div>
      <p>Name: {userData.username}</p>
      <img src={userData.profile_image} style={{width: '200px',  heigth:'auto', borderRadius: '50%'}} alt="Profile" />
      <p>Email: {userData.email}</p>
      {isEditing ? (
          <div>
            <input type="email" value={newEmail} onChange={handleEmailChange} />
            <button onClick={handleEmailEdit}>Send</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)}>Editar e-mail</button>
        )} {errorMessage && <p>{errorMessage}</p>}
      <p>Role: {userData.role}</p>
    </div>
    
    </div>
  )
}

export default UserProfile