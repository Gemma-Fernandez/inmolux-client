import React from 'react'
import niña from "../../images/niña.jpg"
import "./ErrorPage.css"

function ErrorPage() {
  return (
    <div className="container-error">
      <h1>Server error!</h1>
      <h1>Our developers made some mistake, we are working on it</h1>
      <img src={niña} alt="meme niña" />
    </div>
  )
}

export default ErrorPage