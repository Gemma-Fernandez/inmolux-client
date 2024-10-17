import React from 'react'
import video from "../images/video.mp4"

function Home() {


  return (
    <div className="background-video-container">
      <video autoPlay loop muted playsIncline className="background-video">
        <source src={video} type="video/mp4" />
       </video> 
       <div className="content">
        <h2>Welcome InmoLux</h2>
       </div>
    </div>
  )
}

export default Home