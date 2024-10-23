import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo1 from "../images/logo2.png";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { IoMdLogOut } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Wishlist from "./Wishlist/Wishlist.jsx";
import { IoSearchSharp } from "react-icons/io5";

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
       

        {isLoggedIn ? (
          <>
           <Link to="/vivienda">
          < ImHome className="icon-vivienda" title="Listado de casas" />
        </Link>
            {admin ? (
              <Link to="/admin/profile" title="Administrator Profile">
                <FaUserEdit className="icon-vivienda" />
              </Link>
            ) : (
              <Link to="/user/profile" title="User Profile">
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

            <Link to="/vivienda/search" title="Search">
            <IoSearchSharp className="icon-vivienda"/>
            </Link>
            
            <Link to="/user/wishlist" title="wishlist">
            <Wishlist className='whish-button'/>
            </Link>

           
          </>
        ) : (
          <>
           <Link to="/vivienda"  title="Listado de casas">
          <ImHome className="icon-vivienda" />
        </Link>
            <Link to="/login">
              <FaUser className="icon-vivienda" />
            </Link>
            <Link to="/signup">
              <FaUserPlus  className="icon-vivienda" title="Signup" />
            </Link>
            <Link to="/vivienda/search" title="Search">
            <IoSearchSharp className="icon-vivienda"/>
            </Link>
          </>
        )}
        
      </div>
    </div>
  );
}

export default NavBar;

 
