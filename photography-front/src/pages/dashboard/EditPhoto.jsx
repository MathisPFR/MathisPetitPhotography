import React from "react";
import NavDashboard from "../../components/NavDashboard";
import "../../assets/dashboard.css";
import EditPhotoForm from "../../components/EditPhotoForm";

const EditPhoto = () => {
  return (
    <div className="min-h-screen container-dashboard">
      {/* Nav pour les petits écrans */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-10 bg-black">
        <NavDashboard />
      </div>

      {/* Layout pour les grands écrans */}
      <div className="hidden lg:grid lg:grid-cols-12 min-h-screen container-dashboard">
        {/* Colonne 1: Nav */}
        <div className="col-span-3 bg-black p-4">
          <NavDashboard />
        </div>

        {/* Colonne 2: Contenu principal */}
        <div className="col-span-9 p-10">
          <EditPhotoForm />
        </div>
      </div>

      {/* Contenu pour les petits écrans */}
      <div className="lg:hidden pt-16 p-4">
        <EditPhotoForm />
      </div>
    </div>
  );
};

export default EditPhoto;
