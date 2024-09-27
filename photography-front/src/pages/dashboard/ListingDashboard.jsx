import React from "react";
import NavDashboard from "../../components/NavDashboard";
import "../../assets/dashboard.css";
import PhotoListingDashboard from "../../components/PhotoListingDashboard";

const ListingDashboard = () => {
  return (
    <div className="grid grid-cols-12 min-h-screen container-dashboard">
      {/* Colonne 1: Nav */}
      <div className="col-span-3 bg-black p-4">
        <NavDashboard />
      </div>

      {/* Colonne 2: Contenu principal */}
      <div className="col-span-9 p-10">
        <PhotoListingDashboard />
      </div>
    </div>
  );
};

export default ListingDashboard;
