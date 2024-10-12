import React, { useState, useEffect } from "react";
import axios from "axios";

const PhotoListingDashboard = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Page courante
  const [photosPerPage] = useState(6); // Nombre d'images par page
  const [user, setUser] = useState(null); // Stocke les informations de l'utilisateur connecté

  // Fonction pour récupérer l'utilisateur connecté
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); // Stocke l'utilisateur connecté
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur:",
        error
      );
    }
  };

  // Fonction pour récupérer les photos depuis l'API
  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/photos`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPhotos(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des photos:", error);
    }
  };

  // Pagination - Obtenir les photos actuelles de la page
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const totalPages = Math.ceil(photos.length / photosPerPage);

  useEffect(() => {
    fetchUserDetails(); // Récupérer les informations de l'utilisateur lors du montage du composant
    fetchPhotos(); // Récupérer les photos lors du montage du composant
  }, []);

  // Filtrer les photos en fonction du rôle de l'utilisateur
  const filteredPhotos = photos.filter((photo) => {
    // Si l'utilisateur est un administrateur, il peut voir toutes les photos
    if (user?.role === "admin") {
      return true;
    }
    // Sinon, il ne peut voir que ses propres photos
    return photo.user_id === user?.id;
  });

  // Fonction pour supprimer une photo
  const handleDelete = async (photoId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/photos/${photoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Mise à jour de la liste des photos après suppression
      setPhotos(photos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la photo:", error);
    }
  };

  // Fonction pour rediriger vers la page d'édition
  const handleEdit = (photoId) => {
    window.location.href = `/edit-photo/${photoId}`;
  };

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <h2 className="text-3xl text-center font-bold mb-10 w-full">
        Listing des photos disponible sur le site
      </h2>

      {/* Affichage des photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-4 w-full">
        {filteredPhotos
          .slice(indexOfFirstPhoto, indexOfLastPhoto)
          .map((photo) => (
            <div
              key={photo.id}
              className="relative overflow-hidden bg-gray-800 rounded-lg shadow-lg w-full h-60"
            >
              <img
                src={`${process.env.REACT_APP_API_URL}/storage/${photo.image_path}`}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4 flex items-end">
                <div className="text-left">
                  {/* <p className="text-sm italic">{photo.title}</p> */}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(photo.id)}
                  className="bg-gray-700 text-white px-4 py-1 rounded-lg"
                >
                  edit
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="bg-purple-500 text-white px-4 py-1 rounded-lg"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="inline-flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-purple-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PhotoListingDashboard;
