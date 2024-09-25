import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-full md:px-24 lg:px-8 nav-bar">
      <div className="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
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
        <NavLink
          to="/"
          aria-label="Company"
          title="Company"
          className="inline-flex items-center lg:mx-auto"
        >
          <img src="/images/logo.png" alt="Logo" className="logo" />
        </NavLink>
        <ul className="flex items-center hidden ml-auto space-x-8 lg:flex">
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
        </ul>
        <div className="ml-auto lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
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
          {isMenuOpen && (
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
                        src="/images/logo.png"
                        alt="Logo"
                        className="logo-phone"
                      />
                    </NavLink>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
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
                    <li>
                      <NavLink
                        to="/signin"
                        aria-label="Sign in"
                        title="Sign in"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Sign in
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
