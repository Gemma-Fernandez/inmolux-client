import React from 'react'
import "./NotFound.css"
import kevin from "../../images/soloencasa.gif"
import { Link } from "react-router-dom";



function NotFound() {
  return (
    <div className="container-notfound">
      <h1>Don't be alone like Kevin</h1> 
      <img src={kevin} alt="gif kevin" />
     <Link to={"/"}>
      <h2>Go back to home page</h2>
      </Link>
    </div>
  )
}

export default NotFound