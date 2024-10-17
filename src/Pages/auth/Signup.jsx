import React from 'react'
import service from "../../services/config.js"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Signup() {
  const navigate= useNavigate()

  const[email, setEmail]=useState("");
  const [username, setUsername]=useState("");
  const[password, setPassword]=useState("");
 
  const[errorMessage, setErrorMessage]=useState("")
  
  const [imageUrl, setImageUrl] = useState(null);     //cloudinary
  const [isUploading, setIsUploading] = useState(false);

  const handleEmailChange= (e)=>setEmail(e.target.value);
  const handleUsernameChange= (e)=> setUsername(e.target.value);
  const handlePasswordChange=(e)=> setPassword(e.target.value);
  

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);
  
    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/upload`, uploadData)
  
      setImageUrl(response.data.imageUrl);
      
      setIsUploading(false);
    } catch (error) {
      navigate("/500")
    }
  }


  const handleSignup= async (e)=>{
    e.preventDefault();
    try {
      const newUser={
        email,
        username,
        password,
        profile_image: imageUrl
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
        <input type="file"
        name="image"
        onChange={handleFileUpload}
        disabled={isUploading}
        />
        {imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}
        {isUploading ? <h3>... uploading image</h3> : null}
        
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