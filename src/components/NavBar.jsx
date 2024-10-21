import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo1 from "../images/logo2.png";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { IoMdLogOut } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Wishlist from "./Wishlist/Wishlist.jsx";
import { GrSearchAdvanced } from "react-icons/gr";


import React from "react";

function NavBar() {
  const navigate = useNavigate();

  const { setIsLoggedIn, isLoggedIn, admin, user, setUser } = useContext(AuthContext);

  const logOutUser = async () => {
    try {
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);
  return (
    <div className="navbar-container">

      <Link to="/">
        <img src={logo1} className="logo1" alt="logo" />
      </Link>
      <div className="navbar-container-icons">
        <Link to="/vivienda">
          <TiHome className="icon-vivienda" title="Listado de casas" />
        </Link>

        {isLoggedIn ? (
          <>
            {admin ? (
              <Link to="/admin/profile">
                <FaUserEdit className="icon-vivienda" />
              </Link>
            ) : (
              <Link to="/user/profile">
                <FaUserEdit className="icon-vivienda" />
              </Link>
            )}
            <Link to="/">
              <IoMdLogOut
                className="icon-vivienda"
                onClick={logOutUser}
                title="Logout"
              />
            </Link>

            <Link to="/vivienda/search" className="search-mobile">
            <GrSearchAdvanced className="icons-navbar" title="Search"/>
            </Link>
            
            <Link to="/user/wishlist">
            <Wishlist title='wishlist'/>
            </Link>

           
          </>
        ) : (
          <>
            <Link to="/login">
              <FaUser className="icons-navbar" />
            </Link>
            <Link to="/signup">
              <FaUserPlus className="icons-navbar" title="Signup" />
            </Link>
            <Link to="/vivienda/search" className="search-mobile">
            <GrSearchAdvanced className="icons-navbar" title="Search"/>
            </Link>
          </>
        )}
        
      </div>
    </div>
  );
}

export default NavBar;

 
