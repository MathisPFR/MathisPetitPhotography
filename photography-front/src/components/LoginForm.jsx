import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Utilisé pour la redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Requête pour se connecter
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email,
          password,
        }
      );

      // Stocker le token reçu dans le localStorage
      localStorage.setItem("token", response.data.access_token);

      // Rediriger vers la page d'accueil après la connexion réussie
      navigate("/");
    } catch (err) {
      setError(
        "Erreur lors de la connexion, veuillez vérifier vos informations."
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
