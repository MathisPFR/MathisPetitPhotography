import React, { useState, useContext, useEffect, useRef } from "react";
import { FaRegHeart } from "react-icons/fa"; // Icône du cœur vide
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Importer le contexte
import axios from "axios";

export const Nav = () => {
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false); // Pour gérer le menu burger
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null); // Référence pour détecter les clics en dehors

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur",
        error
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserDetails();
    }
  }, [isAuthenticated]);

  // Gestion des clics en dehors du menu avatar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAvatarMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsAvatarMenuOpen(false); // Fermer le menu après la déconnexion
  };

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-full md:px-24 lg:px-8 nav-bar">
      <div className="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
        {/* Menu principal */}
        <ul className="flex items-center hidden space-x-8 lg:flex">
          <li>
            <NavLink
              to="/portfolio"
              aria-label="Portfolio"
              title="Portfolio"
              className={({ isActive }) =>
                isActive
                  ? "font-medium tracking-wide text-[#D0B8AC] transition-colors duration-200"
                  : "font-medium tracking-wide text-white transition-colors duration-200 hover:text-[#D0B8AC]"
              }
            >
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              aria-label="Contact"
              title="Contact"
              className={({ isActive }) =>
                isActive
                  ? "font-medium tracking-wide text-[#D0B8AC] transition-colors duration-200"
                  : "font-medium tracking-wide text-white transition-colors duration-200 hover:text-[#D0B8AC]"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Logo */}
        <NavLink
          to="/"
          aria-label="logo"
          title="logo"
          className="inline-flex items-center lg:mx-auto"
        >
          <img src="/images/logo.png" alt="Logo" className="logo" />
        </NavLink>

        <ul className="flex items-center hidden ml-auto space-x-8 lg:flex">
          {!isAuthenticated ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  aria-label="Se connecter"
                  title="Se Connecter"
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium tracking-wide text-[#D0B8AC] transition-colors duration-200"
                      : "font-medium tracking-wide text-white transition-colors duration-200 hover:text-[#D0B8AC]"
                  }
                >
                  Se connecter
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  aria-label="S'enregistrer"
                  title="S'enregistrer"
                >
                  S'enregistrer
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/favorite"
                  aria-label="Favoris"
                  title="Favoris"
                  className="text-white hover:text-[#D0B8AC] transition-colors duration-200"
                >
                  <FaRegHeart className="text-xl" />
                </NavLink>
              </li>
              <li className="relative" ref={dropdownRef}>
                <img
                  id="avatarButton"
                  type="button"
                  data-dropdown-toggle="userDropdown"
                  data-dropdown-placement="bottom-start"
                  className="w-10 h-10 rounded-full cursor-pointer bg-white"
                  src="/images/avataricone.png"
                  alt="User dropdown"
                  onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                />
                {isAvatarMenuOpen && (
                  <div
                    id="userDropdown"
                    className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {user ? (
                        <>
                          <div>{user.name}</div>
                          <div className="font-medium truncate">
                            {user.email}
                          </div>
                        </>
                      ) : (
                        <div>Chargement...</div>
                      )}
                    </div>
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="avatarButton"
                      onClick={() => setIsAvatarMenuOpen(false)} // Fermer le menu après un clic
                    >
                      {/* Afficher le dashboard uniquement pour les rôles qui ne sont pas "user" */}
                      {user && user.role !== "user" && (
                        <li>
                          <NavLink
                            to="/dashboard"
                            aria-label="dashboard"
                            title="dashboard"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                      )}

                      <li>
                        <NavLink
                          to="/account"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Mon compte
                        </NavLink>
                      </li>
                    </ul>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>

        {/* Menu burger pour mobile */}
        <div className="ml-auto lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
          >
            <svg className="w-5 text-white" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>

          {isBurgerMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <NavLink
                      to="/"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center"
                    >
                      <img
                        src="/images/logo-noir.png"
                        alt="Logo"
                        className="logo-noir"
                      />
                    </NavLink>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsBurgerMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    <li>
                      <NavLink
                        to="/portfolio"
                        aria-label="Portfolio"
                        title="Portfolio"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Portfolio
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contact"
                        aria-label="Contact"
                        title="Contact"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Contact
                      </NavLink>
                    </li>
                    {!isAuthenticated ? (
                      <>
                        <li>
                          <NavLink
                            to="/login"
                            aria-label="Se connecter"
                            title="Se Connecter"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Se connecter
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/register"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-gray-700 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                            aria-label="S'enregistrer"
                            title="S'enregistrer"
                          >
                            S'enregistrer
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        {/* Vous pouvez ajouter du contenu ici avant le bouton de déconnexion */}

                        <li>
                          <NavLink
                            to="/account"
                            aria-label="Mon compte"
                            title="Mon compte"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Mon compte
                          </NavLink>
                        </li>
                        {/* Afficher le dashboard uniquement pour les rôles qui ne sont pas "user" */}
                        {user && user.role !== "user" && (
                          <li>
                            <NavLink
                              to="/dashboard"
                              aria-label="dashboard"
                              title="dashboard"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              Dashboard
                            </NavLink>
                          </li>
                        )}

                        <li>
                          <NavLink
                            to="/favorite"
                            aria-label="Favoris"
                            title="Favoris"
                            className=""
                          >
                            <FaRegHeart className="text-xl" />
                          </NavLink>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Déconnexion
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
