import "./Map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

function Map() {
  const [viviendas, setViviendas] = useState([]);
  const [center, setCenter] = useState([40.4637, -3.7492]);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/vivienda/`
        );
        console.log(response.data);
        setViviendas(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleTransition = () => {
    setShowMap(true);
  };

  return (
    <div>
      <div className="container-desc-map">
        <h2>Who are we?</h2>
        <p>
          Welcome to InmoLux, your reference portal for renting luxury homes. We
          specialize in offering exclusive properties, located in the most
          prestigious and desired areas of Spain. At InmoLux, our goal is to
          provide you with a unique experience, connecting you with residences
          that reflect sophistication, comfort and elegance. Each property on
          our website has been carefully selected to guarantee the highest
          quality standards. Whether you are looking for a villa by the sea, an
          apartment in the heart of the city, or a private residence in a quiet
          environment, at InmoLux you will find the ideal place that fits your
          expectations and lifestyle. 
        </p>
      </div>

      <div className="map-container">
        <h2>Find our homes:</h2>
        <MapContainer
          center={center}
          zoom={4}
          scrollWheelZoom={true}
          className="image-map"
          >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

          {viviendas.map((vivienda) => (
            <Marker key={vivienda._id} position={vivienda.coordinates}>
              <Popup>
                <b>{vivienda.name}</b>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
            <p className="eslogan">
              At InmoLux, we not only rent properties, but we offer unparalleled
              living experiences.
            </p>
    </div>
  );
}

export default Map;
