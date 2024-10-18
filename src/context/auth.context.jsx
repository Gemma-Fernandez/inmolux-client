import React, { useState, useEffect, createContext } from "react";
import service from "../services/config.js";
const AuthContext = createContext();

function AuthWrapper({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [isValidatingToken, setIsValidatingToken] = useState(true);


  useEffect(() => {
      authenticateUser();
  }, []);

  const authenticateUser = async () => {
    
    try {
      const response = await service.get("/auth/verify")
      
      setIsLoggedIn(true);
      setUser(response.data._id);
      setIsValidatingToken(false);

      if (response.data.role === "admin") {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setUser(null);
      setIsValidatingToken(false);
      setAdmin(false);
    }
  };

  /*//logOut
  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };*/

  const passedContext = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    authenticateUser,
    admin,
    setAdmin
  };
  if (isValidatingToken) {
    return <h3>...validating user</h3>;
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
