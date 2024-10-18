import React from 'react'
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../services/config";


function AdminProfile() {
  const {admin} = useContext(AuthContext)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("");

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


  
  return (
    <div>
      <h1>Admin profile:</h1>
      <div>
      <p>Email: {userData.email}</p>
      <p>Name: {userData.username}</p>
      <p>Role: {userData.role}</p>
      <img src={userData.profile_image} style={{width: '200px', borderRadius: '50%'}} alt="Profile" />
    </div>
    </div>
  )
}

export default AdminProfile