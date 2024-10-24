import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { DataContext } from "../../context/Data.context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import service from "../../services/config.js";
import "./Formularios.css";
import axios from "axios";
import { IoImageOutline } from "react-icons/io5";
import { BiMap } from "react-icons/bi";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { TbFileDescription } from "react-icons/tb";


function AddViviendaForm() {
  const navigate = useNavigate();
  const { setAllData } = useContext(DataContext);
  const { authenticateUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [property_type, setProperty_type] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [price, setPrice] = useState("");

  const [imageUrls, setImageUrls] = useState([]); //cloudinary
  

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // Adiciona várias imagens ao FormData
    const uploadData = new FormData();
    for (let i = 0; i < files.length; i++) {
      uploadData.append("images", files[i]);
    }
    

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/upload/multiple`,
        uploadData
      );

      const imageUrls=response.data.imageUrls;
      setImageUrls(imageUrls);
  

     setIsUploading(false);
    } catch (error) {
      navigate("/500");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newVivienda = {
      name,
      city,
      description,
      property_type,
      bathrooms,
      bedrooms,
      image1: imageUrls[0],
      image2: imageUrls[1], 
      image3: imageUrls[2], 
      price,
    };
    try {
      const response = await service.post("/vivienda/addVivienda", newVivienda);

      setAllData((element) => [...element, response.data]);
      
      alert('Gracias <3')
      navigate("/vivienda");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="title-contain">
        {" "}
        <h2 className="form-title-add">Add new apartment</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-addvivienda">
        <label>Name:</label>
        <input
          type="text"
          name="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="name"
        />
        <br />
        <label><BiMap />City:</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="city"
        />
        <br />
        <label><TbFileDescription />Description:</label>
        <input
          as="textarea"
          type="text"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="description"
        />
        <br />
        <label>Property type:</label>
        <input
          type="text"
          name="property_type"
          value={property_type}
          onChange={(event) => setProperty_type(event.target.value)}
          placeholder="Porperty type"
        />
        <br />
        <label>Bathrooms:</label>
        <input
          type="text"
          name="bathrooms"
          value={bathrooms}
          onChange={(event) => setBathrooms(event.target.value)}
          placeholder="Bathrooms"
        />
        <br />
        <label>Bedrooms:</label>
        <input
          type="text"
          name="bedrooms"
          value={bedrooms}
          onChange={(event) => setBedrooms(event.target.value)}
          placeholder="bedrooms"
        />
        <br />
        <label><RiMoneyEuroCircleLine />Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Price"
        />
        <br />
        <label><IoImageOutline />Images:</label>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}         
          disabled={isUploading}
        />
        <div>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded ${index + 1}`} width={200} />
          ))}
        </div>     
       
        {isUploading ? <h3>... uploading images</h3> : null}
        <br />
        <button className="buttonAdd" onClick={handleSubmit} type="submit">
          Save changes
        </button>
      </form>
    </div>
  );
}

export default AddViviendaForm;
