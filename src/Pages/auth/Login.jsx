import React from "react";
import service from "../../services/config.js";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import ReactCardFlip from 'react-card-flip'
import { LiaUserCheckSolid } from "react-icons/lia";
import { AiOutlineMail } from "react-icons/ai";
import { SiLastpass } from "react-icons/si";
import './Login.css'

function Login() {
  const navigate = useNavigate();
  const { authenticateUser} = useContext(AuthContext);
 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFlipped, SetIsFlipped] = useState(false)

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

      await authenticateUser();
     SetIsFlipped(true)

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
    <div className="login-container">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <div className="card">
          <div className="flip-card-front">
            <h1 className="login-title">Login</h1>
            <form onSubmit={handleLogin}>
              <label className="login-label">Enter your email  <AiOutlineMail /></label>
              <input
               className="login-input"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required 
              />
              <br />
              <label className="login-label">Enter your password <SiLastpass /></label>
              <input
              className="login-input"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required 
              />
              <br />
              <button type="submit" className="login-button">Sign in</button>
              {errorMessage && <p>{errorMessage}</p>}
            </form>
          </div>
        </div>

        <div className="card">
          <div className="flip-card-back">
            <h1 className="login-title">Welcome <LiaUserCheckSolid /></h1>
            <p className="login-label">You are now logged in successfully!</p>
            <button className="login-button" onClick={() => navigate(`/vivienda`)}>Go to Dashboard</button>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Login;