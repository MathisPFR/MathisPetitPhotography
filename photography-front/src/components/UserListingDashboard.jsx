import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const UserListingDashboard = () => {
  const [users, setUsers] = useState([]);

  // Fonction pour récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Récupérer les utilisateurs au montage du composant
  }, []);

  // Fonction pour supprimer un utilisateur
  const handleDelete = async (userId) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(users.filter((user) => user.id !== userId)); // Mise à jour de la liste après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
      }
    }
  };

  // Fonction pour rediriger vers la page d'édition d'un utilisateur
  const handleEdit = (userId) => {
    window.location.href = `/edit-user/${userId}`; // Redirection vers la page d'édition
  };

  return (
    <div className="p-4 sm:p-10 min-h-screen bg-black text-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Listing des utilisateurs
      </h2>

      {/* Table responsive */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-purple-600">
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm font-semibold">
                ID
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm font-semibold">
                Rôle
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm">{user.id}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm">
                  {user.name}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm">
                  {user.email}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-sm">
                  {user.role === "partner"
                    ? "Partenaire"
                    : user.role === "admin"
                    ? "Admin"
                    : "Normal"}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 flex space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-gray-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center space-x-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-purple-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center space-x-2"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListingDashboard;
