import React from 'react'
import service from "../../services/config.js"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate= useNavigate()

  const[email, setEmail]=useState("");
  const [username, setUsername]=useState("");
  const[password, setPassword]=useState("");
  const[imageProfile, setImageProfile]=useState("")
  const[errorMessage, setErrorMessage]=useState("")

  const handleEmailChange= (e)=>setEmail(e.target.value);
  const handleUsernameChange= (e)=> setUsername(e.target.value);
  const handlePasswordChange=(e)=> setPassword(e.target.value);
  const handleImageProfileChange=(e)=> setImageProfile(e.target.value);

  const handleSignup= async (e)=>{
    e.preventDefault();
    try {
      const newUser={
        email,
        username,
        password,
        imageProfile
      }
      await service.post("/auth/signup", newUser)
      navigate("/login")

    } catch (error) {
      console.log(error)

      if(error.response.status === 400){
        setErrorMessage(error.response.data.message)
      }else{
        navigate("/500")
      }
    }
  };

  return (
    <div>
      <h2> Form Signup</h2>
      <form onSubmit={handleSignup}>
        <label>Image Profile:</label>
        <br/>
        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
        <br/>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmailChange}/>
        <br/>
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
        <br/>
        <button type="submit"> Signup</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>

    </div>
  )
}

export default Signup