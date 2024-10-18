import React from 'react'
import { useParams, Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";



function AdminProfile() {
  const { adminId } = useParams();
  const {isLoggedIn, authenticateUser, admin} = useContext(AuthContext)
  const navigate = useNavigate()

  const logOutUser = async () => {
    try {
      localStorage.removeItem("authToken")
      await authenticateUser()
      isLoggedIn(false)
      navigate("/vivienda")
    } catch (error) {
        console.log(error)
    }
  }
  
  return (
    <div>
      <h1>Perfil do Admin</h1>
      <p>ID do Admin: {adminId}</p>
      { isLoggedIn && <Link onClick={logOutUser} to="/vivienda">LogOut</Link>}
      {isLoggedIn && admin && <span>usuario admin</span> }
    </div>
  )
}

export default AdminProfile