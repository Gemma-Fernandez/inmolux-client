import React from "react";
import Video from "../components/Video"
import {DataContext} from "../context/Data.context.jsx"
import { useContext } from "react";
import { useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"



function Home() {
 const {allData} = useContext(DataContext)
 console.log(allData)
  const [center, setCenter] = useState([40.4637, -3.7492])

  return (
    <>
    <div className="home-video">
      <Video/>
      </div>
      <br/>
      <div className="map-container">
        <h2 className="home-title">Find our homes</h2>
        <MapContainer center={center} zoom={5} scrollWheelZoom={true} className="image-map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {allData.map((vivienda) => (
            <Marker key={vivienda._id} position={vivienda.coordinates}>
              <Popup>
                <b>{vivienda.name}</b>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default Home;


