import React from "react";
import NavDashboard from "../../components/NavDashboard";
import "../../assets/dashboard.css";
import UserListingDashboard from "../../components/UserListingDashboard";

const UserListing = () => {
  return (
    <div className="grid grid-cols-12 min-h-screen container-dashboard">
      {/* Colonne 1: Nav */}
      <div className="col-span-3 bg-black p-4">
        <NavDashboard />
      </div>

      {/* Colonne 2: Contenu principal */}
      <div className="col-span-9 p-10 test">
        <UserListingDashboard />
      </div>
    </div>
  );
};

export default UserListing;
