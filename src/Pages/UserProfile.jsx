import React from 'react'
import { useParams, Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";



function UserProfile() {

  const {isLoggedIn, authenticateUser, user, logOutUser} = useContext(AuthContext)


  return (
    <div>
      <h1>Perfil do User</h1>
      <p>ID user: {user}</p>
      { isLoggedIn && <Link onClick={logOutUser}>LogOut</Link>}
      {isLoggedIn && user && <span>user</span> }
    </div>
  )
}

export default UserProfile