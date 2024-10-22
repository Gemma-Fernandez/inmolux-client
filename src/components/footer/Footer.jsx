import React from "react";
import "./footer.css";
import { MdOutlineEmail } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaHouseFlag } from "react-icons/fa6";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-elements">
        <div>
          <h4 className="footer-title">About</h4>
          <a href=""><MdMiscellaneousServices /> Our Services</a> <br/>
          <a href=""><FaHouseFlag /> Our Story</a>
        </div>
        <div>
          <h4 className="footer-title">Develop by:</h4>
          <a href="https://github.com/Malu888"> <FaGithub /> Malú Dietrich</a>
          <br />
          <a href="https://github.com/Gemma-Fernandez"> <FaGithub /> Gemma Fernandez</a>
        </div>
        <div>
          <h4 className="footer-title">Contact us</h4>
          <a href=""><MdOutlineEmail/> support@inmolux.com</a> <br/>
          <a href=""><BiPhoneCall /> +34 688 999 898</a>
        </div>
      </div>
      <p>© 2024 Copyright Inmo.Lux Inc.</p>
    </div>
  );
}

export default Footer;
