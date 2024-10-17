import React, { useState, useEffect, createContext } from "react";
import service from "../services/config.js";
const AuthContext = createContext();


function AuthWrapper({ children }) {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  

  useEffect(() => {
    //verificar si el usuario esta logeado
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const response = await service.get("/auth/verify");
      

      setIsLoggedIn(true);
      setUser(response.data);
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
  const passedContext = {
    isLoggedIn,
    user,
    authenticateUser,
    admin,
    setAdmin,
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
