import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { spread } from "axios";
import logo from "../images/logo inmolux.jpg"
import logo1 from "../images/logo2.png"
import userImage from "../images/profile.png"
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";

import React from 'react'

function NavBar() {
  return (
    <div className="navbar-container">
      <Link to="/">
        <img src={logo1} alt="logo" style={{width:"150px"}} />
        </Link>
        <div className="navbar-container-icons" title="Login">
        <Link to="/login">
        <FaUser className="icons-navbar"/>
        </Link>
        <Link to="/signup">
        <FaUserPlus className="icons-navbar" title="Signup"/>
        </Link>
        </div>
    </div>
  )
}

export default NavBar

// <img src={userImage} alt="logo-user" style={{width:"50px"}} />