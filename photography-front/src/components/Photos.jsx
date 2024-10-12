import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaHeart } from "react-icons/fa";

Modal.setAppElement("#root");

const Photos = ({ partnerId }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState([]); // Liste des photos likées

  // Fonction pour récupérer les photos
  const fetchPhotos = async () => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/api/photos`;

      if (partnerId) {
        url = `${process.env.REACT_APP_API_URL}/api/photos/partner/${partnerId}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPhotos(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors de la récupération des photos");
      setLoading(false);
    }
  };

  // Fonction pour récupérer les photos likées par l'utilisateur
  const fetchLikedPhotos = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/liked-photos`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const likedPhotoIds = response.data.map((photo) => photo.id);
      setLikedPhotos(likedPhotoIds);
    } catch (error) {
      console.error("Erreur lors de la récupération des photos likées:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
    fetchLikedPhotos(); // Récupère les photos likées lors du montage
  }, [partnerId]);

  // Ouvrir la modal
  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  // Fermer la modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  // Fonction pour liker ou unliker une photo
  const toggleLike = async (photo) => {
    const isLiked = likedPhotos.includes(photo.id);
    const token = localStorage.getItem("token");

    try {
      if (isLiked) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/photos/${photo.id}/unlike`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedPhotos(likedPhotos.filter((id) => id !== photo.id));
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/photos/${photo.id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedPhotos([...likedPhotos, photo.id]);
      }
    } catch (error) {
      console.error("Erreur lors de l'update du like:", error);
    }
  };

  if (loading) {
    return <p>Chargement des photos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {/* Affichage du message si le partenaire n'a pas de photos */}
      {partnerId && photos.length === 0 ? (
        <p className="text-center text-lg text-white">
          Ce partenaire n'a pas de photo.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-w-1 aspect-h-1 overflow-hidden rounded-lg"
            >
              <img
                className="w-full h-full object-cover cursor-pointer"
                src={`${process.env.REACT_APP_API_URL}/storage/${photo.image_path}`}
                alt={photo.title || "Photo"}
                onClick={() => openModal(photo)}
              />
              <FaHeart
                className={`absolute top-2 right-2 text-3xl cursor-pointer ${
                  likedPhotos.includes(photo.id)
                    ? "text-red-600"
                    : "text-gray-300"
                }`}
                onClick={() => toggleLike(photo)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedPhoto && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Photo Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="flex justify-center items-center h-full">
            <img
              className="max-w-full h-auto"
              src={`${process.env.REACT_APP_API_URL}/storage/${selectedPhoto.image_path}`}
              alt={selectedPhoto.title || "Photo"}
            />
          </div>
          <button
            onClick={closeModal}
            className="absolute top-0 right-2 text-2xl close-button"
          >
            &times;
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Photos;
