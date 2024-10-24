import React from "react";
import Video from "../components/Video";
import { Link } from "react-router-dom";
import imgMapa from "../images/mapas.png";
import casita from "../images/casita.png";

function Home() {
  return (
    <>
      <div className="home-video">
        <h1 className="title-home">Welcome to InmoLux</h1>
        <Video />
      </div>
      <br />
      <div className="container-mapa-home">
        <div>
          <p className="title-mapa">Know where we are</p>
          <Link to={"/map"}>
            <img src={imgMapa} alt="logo-mapa" className="icon-map" />
          </Link>
        </div>
        <div>
          <p className="choose-house">Start by choosing your new home</p>
          <Link to={"/vivienda"}>
            <img src={casita} alt="casita" className="icon-map" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
