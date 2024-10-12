import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext"; // Importer le contexte
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext); // Récupère la fonction login du contexte
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Envoi de la requête de connexion
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          email,
          password,
        }
      );

      // Utilise la fonction login du contexte pour mettre à jour l'état global
      login(response.data.access_token);

      // Redirige vers la page d'accueil après connexion réussie
      navigate("/");
    } catch (err) {
      setError(
        "Erreur lors de la connexion, veuillez vérifier vos informations."
      );
    }
  };

  return (
    <div className="mt-20 max-w-sm mx-auto max-w-md mx-auto p-6 bg-[#111827] text-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-5 text-white">
        Connexion
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin}>
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
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Connexion
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
