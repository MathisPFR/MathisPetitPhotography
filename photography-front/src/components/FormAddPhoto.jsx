import React, { useState, useEffect } from "react";
import axios from "axios";

const FormAddPhoto = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // Pour stocker l'image
  const [categories, setCategories] = useState([]); // Pour stocker la liste des catégories
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Récupérer la liste des catégories lors du montage du composant
  useEffect(() => {
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
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que tous les champs sont remplis
    if (!title || !description || !category || !image) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_ids[]", category); // Envoyer l'ID de la catégorie
    formData.append("image", image); // Envoyer l'image

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/photos`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Photo ajoutée avec succès.");
      setError(null); // Réinitialiser l'erreur
    } catch (error) {
      setError("Erreur lors de l'ajout de la photo.");
      setSuccess(null); // Réinitialiser le succès
    }
  };

  return (
    <div className="max-w-sm mx-auto p-10">
      <h2 className="text-center text-2xl font-bold mb-5 text-white">
        Ajouter une Photo
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-white"
          >
            Titre de la photo
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Titre"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-700 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Description"
            required
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-white"
          >
            Catégorie
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

        <div className="mb-5">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-white"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])} // Stocker l'image sélectionnée
            className="bg-gray-700 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Ajouter la photo
        </button>
      </form>
    </div>
  );
};

export default FormAddPhoto;
