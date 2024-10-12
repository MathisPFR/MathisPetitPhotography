import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import "../assets/contact.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};

    // Vérification des champs vides
    if (!formData.firstName.trim()) {
      formErrors.firstName = "Le prénom est requis.";
    }
    if (!formData.lastName.trim()) {
      formErrors.lastName = "Le nom est requis.";
    }
    if (!formData.email.trim()) {
      formErrors.email = "L'email est requis.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      formErrors.email = "L'email est invalide.";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = "Le numéro de téléphone doit contenir 10 chiffres.";
    }
    if (!formData.message.trim()) {
      formErrors.message = "Le message est requis.";
    }

    setErrors(formErrors);

    // Si aucune erreur n'est détectée, on retourne `true`
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/contact`,
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          }
        );
        if (response.status === 200) {
          setSuccess("Votre message a été envoyé avec succès.");
          setErrors({});
          setFormData({
            lastName: "",
            firstName: "",
            email: "",
            phone: "",
            message: "",
          });
        }
      } catch (error) {
        setErrors({
          form: "Erreur lors de l'envoi du message. Veuillez réessayer.",
        });
      }
    }
  };

  return (
    <div className="bg-black">
      <div>
        <HeroSection
          title="Page"
          subtitle="Contact"
          backgroundImage="./images/29062022-IMG_7254.jpg"
        />
      </div>
      <div className="mb-40 bg-black">
        <div className="min-h-screen flex flex-col bg-black text-white">
          <div className="mb-10 mx-6 lg:ml-20 mt-20">
            <h1 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#763AF5]">
              Entrons en Contact
            </h1>
            <p className="text-gray-400 mt-2 max-w-xl text-lg lg:text-xl">
              Que vous ayez une question, une idée de projet, ou simplement
              envie de discuter de photographie, je suis à votre écoute.
              Remplissez le formulaire ci-dessous, et je vous répondrai dès que
              possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 lg:p-8 bg-gray-900 rounded-lg shadow-lg mx-6 lg:mx-20">
            {/* Formulaire */}
            <div>
              <h2 className="text-xl lg:text-2xl font-bold mb-4">
                Parlez-moi de votre projet
              </h2>
              <p className="text-gray-400 mb-6">
                Remplissez ces quelques informations pour que je puisse mieux
                comprendre vos besoins et vous répondre rapidement.
              </p>

              {errors.form && <p className="text-red-500">{errors.form}</p>}
              {success && <p className="text-green-500">{success}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Nom"
                      className="w-full p-2.5 rounded-lg bg-gray-800 border-none text-white"
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Prénom"
                      className="w-full p-2.5 rounded-lg bg-gray-800 border-none text-white"
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2.5 rounded-lg bg-gray-800 border-none text-white"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Numéro de téléphone"
                    className="w-full p-2.5 rounded-lg bg-gray-800 border-none text-white"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="w-full p-2.5 rounded-lg bg-gray-800 border-none text-white h-32"
                    required
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-indigo-700"
                >
                  Envoyer
                </button>
              </form>
              {/* Icônes réseaux sociaux */}
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://www.instagram.com/mathisp_photo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white hover:text-gray-400 transition-colors duration-200"
                >
                  <FaInstagram size={30} /> {/* Icône Instagram */}
                </a>
                <a
                  href="https://www.linkedin.com/in/mathis-petit-7a6133249/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-white hover:text-gray-400 transition-colors duration-200"
                >
                  <FaLinkedin size={30} /> {/* Icône LinkedIn */}
                </a>
              </div>
            </div>

            {/* Image + Citation */}
            <div className="relative image-cit bg-cover bg-center h-64 lg:h-full flex items-center justify-start rounded-lg">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75 z-0 rounded-lg	"></div>

              {/* Text Block */}
              <p className="absolute bottom-4 left-4 text-gray-300 text-sm italic z-10">
                “La mémoire est la quatrième dimension de tout paysage”
                <br /> - Janet Fitch
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
