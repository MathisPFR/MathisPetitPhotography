import React, { useEffect, useState } from "react";
import axios from "axios";

const LikedPhotos = () => {
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les photos likées de l'utilisateur
  const fetchLikedPhotos = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/liked-photos`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Envoie du token pour l'authentification
          },
        }
      );
      setLikedPhotos(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors de la récupération des photos likées.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedPhotos();
  }, []);

  // Gestion des états d'erreur et de chargement
  if (loading) {
    return <p>Chargement des photos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-2 m-10">
      {likedPhotos.map((photo, index) => (
        <div key={index}>
          <img
            className="h-auto max-w-full rounded-lg"
            src={`http://127.0.0.1:8000/storage/${photo.image_path}`} // Lien dynamique pour les images
            alt={photo.title || "Photo likée"}
          />
        </div>
      ))}
    </div>
  );
};

export default LikedPhotos;
