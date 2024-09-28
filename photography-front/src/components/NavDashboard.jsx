import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

const NavDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu burger
  const [role, setRole] = useState(null);

  // Récupérer le rôle via /me
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRole(response.data.role); // Stocke le rôle de l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la récupération du rôle:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
      {/* Nav pour les écrans larges */}
      <aside className="hidden lg:flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-black border-r border-gray-700">
        <NavLink to="/">
          <img
            className="w-auto h-6 sm:h-12"
            src="/images/logo.png"
            alt="logo"
          />
        </NavLink>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 py-2 text-white bg-gray-900 rounded-md"
                  : "flex items-center px-4 py-2 text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-800 hover:text-white"
              }
            >
              <span className="mx-4 font-medium">Listing des photos</span>
            </NavLink>

            <NavLink
              to="/add-photo"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 py-2 text-white bg-gray-900 rounded-md"
                  : "flex items-center px-4 py-2 text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-800 hover:text-white"
              }
            >
              <span className="mx-4 font-medium">Ajouter des photos</span>
            </NavLink>

            {/* Condition pour afficher le listing des utilisateurs uniquement pour les admins */}
            {role === "admin" && (
              <NavLink
                to="/users-listing"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-2 text-white bg-gray-900 rounded-md"
                    : "flex items-center px-4 py-2 text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-800 hover:text-white"
                }
              >
                <span className="mx-4 font-medium">
                  Listing des utilisateurs
                </span>
              </NavLink>
            )}
          </nav>
        </div>
      </aside>

      {/* Menu burger pour les petits écrans */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-4 text-white focus:outline-none"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {isMenuOpen && (
          <nav className="flex flex-col items-start bg-black p-4 space-y-4">
            <NavLink
              to="/"
              className="text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Retour sur le site
            </NavLink>

            <NavLink
              to="/dashboard"
              className="text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Listing des photos
            </NavLink>

            <NavLink
              to="/add-photo"
              className="text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Ajouter des photos
            </NavLink>

            {role === "admin" && (
              <NavLink
                to="/users-listing"
                className="text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Listing des utilisateurs
              </NavLink>
            )}
          </nav>
        )}
      </div>
    </div>
  );
};

export default NavDashboard;
