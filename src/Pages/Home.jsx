import React from "react";
import Video from "../components/Video"
import { GiWorld } from "react-icons/gi";
import { Link} from "react-router-dom";






function Home() {



  return (
    <>
    <div className="home-video" >
    <h1 className="title-home">Welcome to InmoLux</h1>
      <Video/>
      <br/>
      <Link to={"/map"}>
      <h2><GiWorld /></h2>
      </Link>
      </div>
      
    </>
  );
}

export default Home;


