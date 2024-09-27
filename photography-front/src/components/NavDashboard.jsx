import React from "react";

const NavDashboard = () => {
  return (
    <div>
      <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-black border-r border-gray-700">
        <a href="/">
          <img className="w-auto h-6 sm:h-12" src="./images/logo.png" alt="" />
        </a>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <a
              className="flex items-center px-4 py-2 text-white bg-gray-900 rounded-md"
              href="/dashboard"
            >
              <span className="mx-4 font-medium">Listing des photos</span>
            </a>

            <a
              className="flex items-center px-4 py-2 mt-5 text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-800 hover:text-white"
              href="/add-photo"
            >
              <span className="mx-4 font-medium">Ajouter des photos</span>
            </a>

            <a
              className="flex items-center px-4 py-2 mt-5 text-gray-300 transition-colors duration-300 transform rounded-md hover:bg-gray-800 hover:text-white"
              href="#"
            >
              <span className="mx-4 font-medium">Listing des utilisateurs</span>
            </a>
          </nav>

          <a href="#" className="flex items-center px-4 -mx-2">
            <span className="mx-2 font-medium text-gray-300">Déconnexion</span>
          </a>
        </div>
      </aside>
    </div>
  );
};

export default NavDashboard;
