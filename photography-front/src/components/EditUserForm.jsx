import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUserForm = () => {
  const { id } = useParams(); // Récupère l'ID de l'utilisateur à partir de l'URL
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // Gérer le rôle de l'utilisateur
  const [error, setError] = useState(null); // Pour gérer les erreurs éventuelles
  const navigate = useNavigate();

  // Fonction pour récupérer les détails de l'utilisateur
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const user = response.data;
      setName(user.name);
      setEmail(user.email);
      setRole(user.role); // Définit le rôle de l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la récupération des informations:", error);
      setError("Impossible de récupérer les détails de l'utilisateur.");
    }
  };

  useEffect(() => {
    fetchUserDetails(); // Appel de la fonction pour récupérer les infos lors du montage
  }, [id]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        name,
        email,
        role,
      };

      // Requête PUT pour mettre à jour l'utilisateur
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/users-listing"); // Redirection après la mise à jour réussie
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      setError("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Modifier l'utilisateur</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Nom
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium">
            Rôle
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="user">Normal</option>
            <option value="partner">Partenaire</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
