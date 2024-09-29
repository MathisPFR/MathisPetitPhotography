import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
      {likedPhotos.map((photo, index) => (
        <div
          key={index}
          className="relative aspect-w-1 aspect-h-1 overflow-hidden rounded-lg"
        >
          <img
            className="w-full h-full object-cover cursor-pointer"
            src={`http://127.0.0.1:8000/storage/${photo.image_path}`} // Lien dynamique pour les images
            alt={photo.title || "Photo likée"}
          />
          <FaHeart
            className="absolute top-2 right-2 text-3xl text-red-600"
            title="Photo likée"
          />
        </div>
      ))}
    </div>
  );
};

export default LikedPhotos;
