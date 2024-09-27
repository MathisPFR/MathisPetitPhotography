import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPhotoForm = () => {
  const { id } = useParams(); // Récupère l'id de la photo depuis les paramètres de l'URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Récupérer les catégories pour le select
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  // Récupérer les données de la photo à éditer
  const fetchPhotoDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/photos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const photo = response.data;
      setTitle(photo.title);
      setDescription(photo.description);
      setCategory(photo.categories.map((cat) => cat.id)); // Gérer les catégories sous forme d'ID
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de la photo:",
        error
      );
    }
  };

  useEffect(() => {
    fetchCategories(); // Récupérer les catégories dès le montage du composant
    fetchPhotoDetails(); // Récupérer les détails de la photo dès le montage du composant
  }, []);

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_ids[]", category); // Envoi sous forme de tableau
    if (image) {
      formData.append("image", image); // Ajouter une nouvelle image si elle est modifiée
    }

    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/photos/${id}?_method=PUT`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard"); // Rediriger vers le tableau de bord après succès
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la photo:", error);
    }
  };

  // Gérer la mise à jour des catégories
  const handleCategoryChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setCategory(value);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Modifier la photo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Titre
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium">
            Catégories
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory([e.target.value])} // Envoi sous forme de tableau
            className="bg-gray-700 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">Choisir une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium">
            Image (facultatif)
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="bg-gray-700 border border-gray-500 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditPhotoForm;
