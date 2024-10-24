import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { IoIosCloudDone } from "react-icons/io";
import { useState, useEffect } from "react";
import service from "../../services/config.js";
import { DataContext } from "../../context/Data.context";
import { TbHomePlus } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import './AdminProfile.css'


function AdminProfile() {
  const { removeSolicitud, solicitudes, setSolicitudes } = useContext(DataContext)


  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    const fetchSolicitudes = async () => {
      try {
        const response = await service.get("/solicitud", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          }
        })

        setSolicitudes(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserData();
    fetchSolicitudes();
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
    <div className="admin-profile-container">
      <div className="admin-image-container">
        <h1 className="admin-profile-title">Welcome {userData.username}</h1>
        <img
          src={userData.profile_image}
          className="admin-img"
          alt="Profile" />
      </div>


      <div className="admin-username-email-edit">
        <div className="admin-username">
          <p className='admin-profile-name'>{userData.username}</p>
          <>
            {isEditingUsername ? (
              <div className='admin-drop-menu'>
                <input type="text" value={newUserName} onChange={handleUserNameChange} className='input-admin-email-username' />
                <button className="button-admin-send" onClick={handleUserNameEdit}>Send</button>
                <button className="button-admin-cancel" onClick={() => setIsEditingUsername(false)}>Cancel</button>
              </div>
            ) : (
              <button className="button-admin-send" onClick={() => {
                setNewUserName(userData.username);
                setIsEditingUsername(true);
              }}>Edit your username</button>
            )}
            {errorMessage && <p>{errorMessage}</p>}
          </>
        </div>
        <div className='admin-email'>
          <p className='admin-profile-email'>{userData.email}</p>
          {isEditing ? (
            <div className='admin-drop-menu'>
              <input type="email" value={newEmail} onChange={handleEmailChange} className='input-admin-email-username' />
              <button className="button-admin-send" onClick={handleEmailEdit}>Send</button>
              <button className="button-admin-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <button className="button-admin-send" onClick={() => setIsEditing(true)}>Edit your email</button>
          )}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>

      <div className="add-vivienda-container">
        <Link to={"/vivienda/addVivienda"}>
          <button className="button-add-vivienda">Add new apartment <TbHomePlus className="admin-icon-add" /></button>
        </Link>
      </div>

      <div className='admin-requests-container'>
        <h2 className="title-resquests">User Request <IoIosCloudDone className='icon-requests-users' /></h2>
        <div className="scrollable-menu-resquest">
          {solicitudes.map((eachElement, i) => (
            <div key={i} className="section-requests">
              <div className='section-boxs'>
                <p className='section-name'> Apartment: {eachElement.vivienda.name} - {eachElement.vivienda.city}</p> {/* falta name y city*/}
                <p className='section-name'>User: {eachElement.user.username} - {eachElement.user.email}</p>    {/* falta username y email*/}
                <p className='section-name'>Message: {eachElement.message}</p>
                <button onClick={() => removeSolicitud(eachElement._id)} className="delete-icon-request "><TiDelete /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminProfile;
