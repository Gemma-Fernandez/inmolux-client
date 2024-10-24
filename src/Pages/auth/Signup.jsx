import React from 'react'
import service from "../../services/config.js"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { AiTwotoneMail } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import './Signup.css'
import ClipLoader from "react-spinners/ClipLoader";


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
  
    const uploadData = new FormData(); 
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
      alert(`Bienvenido a InmoLux ${newUser.username}!`)
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
    <>
     <div className='title-container'><h2 className='title-signup'>Be part of InmoLux</h2></div>
     <div className='signup-container'>
      <form onSubmit={handleSignup} className='form-signup'>
        <label className="signup-label"><IoImageOutline /> Image Profile:</label>
        <br/>
        <input 
        className='img-input'
        type="file"
        name="image"
        onChange={handleFileUpload}
        disabled={isUploading}
        />
        {imageUrl ? (<div><img className='img-preview-signup' src={imageUrl} alt="img" width={200} /></div>) : null}
        {isUploading ? <h3><ClipLoader /></h3> : null}
        
        <br/>
        <label className="signup-label"><FaRegUserCircle /> Username:</label>
        <input className='signup-inputs' type="text" name="username" value={username} onChange={handleUsernameChange}/>
        <br/>
        <label className="signup-label"><AiTwotoneMail /> Email:</label>
        <input className='signup-inputs' type="email" name="email" value={email} onChange={handleEmailChange}/>
        <br/>
        <label className="signup-label"> <RiLockPasswordLine /> Password:</label>
        <input className='signup-inputs' type="password" name="password" value={password} onChange={handlePasswordChange}  title="Su contraseña debe contener al menos una letra mayúscula y una minúscula y un número no debe exceder los 16 caracteres." />
        <br/>
        <button className="signup-button" type="submit" title='Haga clic para enviar'> Signup</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>

    </div>
    </>
  )
}

export default Signup