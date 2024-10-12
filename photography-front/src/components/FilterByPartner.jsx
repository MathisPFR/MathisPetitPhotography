import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterByPartner = ({ onPartnerSelect }) => {
  const [partners, setPartners] = useState([]);

  // Fonction pour récupérer la liste des partenaires
  const fetchPartners = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/partners`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPartners(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des partenaires:", error);
    }
  };

  useEffect(() => {
    fetchPartners(); // Récupérer la liste des partenaires lors du montage du composant
  }, []);

  return (
    <div className="filter-section mb-4">
      <h2 className="text-lg mt-10">
        <label htmlFor="partner-select" className="block mb-2 text-white">
          Filtrer par partenaire :
        </label>
      </h2>
      <select
        id="partner-select"
        onChange={(e) => onPartnerSelect(e.target.value)}
        className="bg-gray-700 border border-gray-500 text-white rounded-lg p-2 w-full"
      >
        <option value="">Tous les partenaires</option>
        {partners.map((partner) => (
          <option key={partner.id} value={partner.id}>
            {partner.user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByPartner;
