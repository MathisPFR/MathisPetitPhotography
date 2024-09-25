import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

// Initialiser react-modal pour rendre l'accessibilité
Modal.setAppElement("#root");

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Fonction pour récupérer les photos depuis l'API
  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/photos`
      );
      setPhotos(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors de la récupération des photos");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

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

  // Gestion des états d'erreur et de chargement
  if (loading) {
    return <p>Chargement des photos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 m-10">
        {photos.map((photo, index) => (
          <div key={index} className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg cursor-pointer"
                src={`http://127.0.0.1:8000/storage/${photo.image_path}`}
                alt={photo.title || "Photo"}
                onClick={() => openModal(photo)} // Ouvrir la modal au clic sur l'image
              />
            </div>
          </div>
        ))}
      </div>

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
              src={`http://127.0.0.1:8000/storage/${selectedPhoto.image_path}`}
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
