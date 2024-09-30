import React from "react";
import "../assets/partners.css";

const Partners = () => {
  return (
    <div className="partners-container">
      <div className="partner">
        <a href="https://charlie-uniquecontent.fr">
          <img src="/images/circle.png" alt="Les Missions Locales" />
        </a>
      </div>
      <div className="partner">
        <a href="https://www.unicef.org/">
          <img src="/images/fossa.png" alt="UNICEF" />
        </a>
      </div>
      <div className="partner">
        <a href="https://www.mission-locale-cournon.com/">
          <img src="/images/muzica-2.png" alt="Charlie Unique Content" />
        </a>
      </div>
    </div>
  );
};

export default Partners;
