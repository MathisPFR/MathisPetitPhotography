import React from "react";
import "../assets/footer.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="contact-block">
      <div className="contact-text">
        <h5 className="contact-subtitle">CONTACT</h5>
        <h2 className="contact-title outlined-text">
          Besoin d'infos ?<br />
          <span className="contact-highlight">Écrivez-moi</span>
        </h2>
        <p className="contact-description">
          Vous avez des questions ou souhaitez en savoir plus ? N’hésitez pas à
          me contacter pour échanger davantage.
        </p>
      </div>
      <div className="contact-button-container">
        <a href="/contact" className="contact-button">
          Contactez-moi
        </a>
      </div>
      <div className="footer">
        <p>PETIT Mathis | Clermont-Ferrand - 63800</p>
        <p>Copyright © 2024, PETIT Mathis | Tous droits réservés</p>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/mathisp_photo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/mathis-petit-7a6133249/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
