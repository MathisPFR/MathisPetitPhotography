import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Vérification de la longueur du mot de passe
    if (password.length < 8) {
      setError("Le mot de passe doit comporter au moins 8 caractères.");
      return;
    }

    // Vérification de la confirmation du mot de passe
    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Validation de l'email (regex simple pour un format d'email basique)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    try {
      // Envoi de la requête d'inscription
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/register`,
        {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          role,
        }
      );

      // Stocker le token dans le localStorage
      localStorage.setItem("token", response.data.access_token);

      // Rediriger vers la page d'accueil après l'inscription réussie
      navigate("/login");
    } catch (err) {
      // Vérification si des erreurs spécifiques proviennent du backend
      if (err.response && err.response.data && err.response.data.errors) {
        const backendErrors = err.response.data.errors;
        if (backendErrors.email) {
          setError("Cette adresse email est déjà utilisée.");
        } else if (backendErrors.password) {
          setError("Le mot de passe doit comporter au moins 8 caractères.");
        } else {
          setError(
            "Erreur lors de l'inscription, veuillez vérifier vos informations."
          );
        }
      } else {
        setError(
          "Erreur lors de l'inscription, veuillez vérifier vos informations."
        );
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto p-10 max-w-md mx-auto p-6 bg-[#111827] text-white rounded-lg shadow-md mt-20">
      <h2 className="text-center text-2xl font-bold mb-5 text-white">
        Inscription
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister}>
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
            placeholder="name@flowbite.com"
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
            required
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
        <div className="mb-5">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-white"
          >
            Choisissez votre rôle
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)} // Gère la sélection
            className="bg-gray-50 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="user">Utilisateur</option>
            <option value="partner">Photographe</option>
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          S'enregistrer
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
