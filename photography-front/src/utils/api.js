import axios from 'axios';

// Création d'une instance Axios avec une URL de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // On utilise la variable d'environnement ici
});

// Exporter l'instance pour l'utiliser dans les composants
export default api;
