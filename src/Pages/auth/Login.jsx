import React from "react";
import service from "../../services/config.js";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const navigate = useNavigate();
  const { authenticateUser, setAdmin, user, setUser, setIsLoggedIn} = useContext(AuthContext);
 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = {
        email,
        password
      };

      const response = await service.post("/auth/login", userCredentials);

      

      localStorage.setItem("authToken", response.data.authToken);
//console.log(response.data.authToken)
      await authenticateUser();

    /*console.log(response.data.user)
      if (user.role === "admin") {
        const adminId = user._id; 
        setAdmin(true);
        navigate(`/admin/${adminId}`);
      } else {*/
        navigate(`/vivienda`);
      /*}*/
     
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        navigate("/500");
      }
    }
  };
  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Acceder</button>

        {errorMessage && <p>{errorMessage}</p>}

        <p>Haven't you sign up yet?</p>
        <a href="/signup">Sign up here!</a>
      </form>
    </div>
  );
}

export default Login;
