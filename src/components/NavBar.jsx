import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { spread } from "axios";
import logo from "../images/logo inmolux.jpg"
import userImage from "../images/profile.png"

import React from 'react'

function NavBar() {
  return (
    <div>
      <Link to="/">
        <img src={logo} alt="logo" style={{width:"100px"}} />
        </Link>
        <Link to="/login">
        <img src={userImage} alt="logo-user" style={{width:"50px"}} />
        </Link>
    </div>
  )
}

export default NavBar