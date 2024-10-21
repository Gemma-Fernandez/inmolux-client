import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../services/config";

function AdminProfile() {
  const { admin } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newUserName, setNewUserName] = useState("")
  const [solicitudes, setSolicitudes]=useState([])

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
    const fetchSolicitudes= async()=>{
      try {
        const response=await service.get("/solicitud", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          }
        })
        console.log(response.data)
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
    <div>
      <h1>Admin profile:</h1>
      <div>
        <h2>Welcome, {userData.username}</h2>
        <>
        {isEditingUsername ? (
          <div>
            <input type="text" value={newUserName} onChange={handleUserNameChange} />
            <button onClick={handleUserNameEdit}>Send</button>
            <button onClick={() => setIsEditingUsername(false)}>Cancelar</button>
          </div>
        ) : (
          <button onClick={() => {
            setNewUserName(userData.newUserName);
            setIsEditingUsername(true);
          }}>Editar Username</button>
        )}
        {errorMessage && <p>{errorMessage}</p>}
      </>
        <br/>
        <img
          src={userData.profile_image}
          style={{ width: "200px", borderRadius: "50%" }}
          alt="Profile"
        />
        <p>Email: {userData.email}</p>
        {isEditing ? (
          <div>
            <input type="email" value={newEmail} onChange={handleEmailChange} />
            <button onClick={handleEmailEdit}>Send</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)}>Editar e-mail</button>
        )}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <p>Role: {userData.role}</p>
      <div>
        <Link to={"/vivienda/addVivienda"}>
        <button>Add new apartment</button>
        </Link>
      </div>
      <div>
      <h2>User Request</h2>
      {solicitudes.map((eachElement, i)=>(
        <li key={i}>
          <h3>Apartment: {eachElement.vivienda.name} - {eachElement.vivienda.city} </h3> {/* falta name y city*/}
          <p>User: {eachElement.user.username} - {eachElement.user.email}</p>    {/* falta username y email*/}
          <p>Message: {eachElement.message}</p>
        </li>
      )
      )}
      </div>
    </div>
  );
}

export default AdminProfile;
