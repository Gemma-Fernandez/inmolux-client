import React from 'react'
import video from "../images/video.mp4"
import Ratio from "react-bootstrap/Ratio";

function Video() {
  return (
   
    <div className="video-container" style={{ width: "100%", height: "auto" }}>
      <Ratio aspectRatio="16x9">
        <video autoPlay loop muted playsInline className="w-100 h-100">
          <source src={video} type="video/mp4" />
          
        </video>
      </Ratio>
    </div>
  )
}

export default Video