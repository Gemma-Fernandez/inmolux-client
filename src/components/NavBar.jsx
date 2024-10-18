import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { spread } from "axios";
import logo1 from "../images/logo2.png";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { IoMdLogOut } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


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
        <img src={logo1} alt="logo" style={{ width: "150px" }} />
      </Link>
      <div className="navbar-container-icons" title="Login">
        <Link to="/vivienda">
          <TiHome className="icon-vivienda" title="Listado de casas" />
        </Link>

        {isLoggedIn ? (
          <>
            {admin ? (
              <Link to="/admin/adminId">
                <FaUserEdit className="icon-vivienda" />
              </Link>
            ) : (
              <Link to="/user/userId">
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
          </>
        ) : (
          <>
            <Link to="/login">
              <FaUser className="icons-navbar" />
            </Link>
            <Link to="/signup">
              <FaUserPlus className="icons-navbar" title="Signup" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
