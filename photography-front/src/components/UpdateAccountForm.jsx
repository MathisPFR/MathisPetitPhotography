import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateAccountForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [Id, SetId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fonction pour récupérer les informations actuelles de l'utilisateur
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      setName(user.name);
      setEmail(user.email);
      SetId(user.id);
    } catch (err) {
      setError("Erreur lors de la récupération des informations.");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${Id}`,
        {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Les informations ont été mises à jour avec succès.");
      setError(null); // Enlever les erreurs en cas de succès
    } catch (err) {
      setError("Erreur lors de la mise à jour des informations.");
      setSuccess(null); // Enlever le message de succès en cas d'erreur
    }
  };

  return (
    <div className="max-w-sm mx-auto p-10">
      <h2 className="text-center text-2xl font-bold mb-5 text-white">
        Mettre à jour les informations
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}{" "}
      {/* Affichage du message de succès */}
      <form onSubmit={handleUpdate}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Votre nom
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Votre email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Votre mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password_confirmation"
            className="block mb-2 text-sm font-medium text-white"
          >
            Confirmez votre mot de passe
          </label>
          <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateAccountForm;
