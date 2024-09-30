import React from "react";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const MentionsLegales = () => {
  return (
    <div className="">
      <div>
        <HeroSection
          title="Mentions"
          subtitle="légales"
          backgroundImage="./images/IMG_8418.jpg"
        />
      </div>
      <div className="container mx-auto px-4 py-8 bg-gray-100 mt-20">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Éditeur du site
          </h2>
          <p className="text-gray-700 mb-4">
            Nom : <span className="font-semibold">Mathis Petit</span>
            <br />
            Adresse : 43 rue de la challe, Saint Bonnet lès Allier
            <br />
            Email :{" "}
            <a
              href="mailto:mathispetitfrpro@gmail.com"
              className="text-blue-500 hover:underline"
            >
              mathispetitfrpro@gmail.com
            </a>
            <br />
            Numéro SIRET : Non applicable
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Hébergement du site
          </h2>
          <p className="text-gray-700 mb-4">
            Hébergeur : o2switch
            <br />
            Adresse : 222 Boulevard Gustave Flaubert, 63000 Clermont-Ferrand,
            France
            <br />
            Téléphone :{" "}
            <a
              href="tel:+33444446040"
              className="text-blue-500 hover:underline"
            >
              +33 4 44 44 60 40
            </a>
            <br />
            Site web :{" "}
            <a
              href="https://www.o2switch.fr"
              className="text-blue-500 hover:underline"
            >
              www.o2switch.fr
            </a>
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Données personnelles
          </h2>
          <p className="text-gray-700 mb-4">
            Les informations recueillies via les formulaires de contact sont
            destinées à un usage interne uniquement. Nous nous engageons à ne
            pas divulguer ces informations à des tiers sans votre consentement
            préalable.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Propriété intellectuelle
          </h2>
          <p className="text-gray-700 mb-4">
            Le contenu de ce site (textes, images, vidéos) est protégé par les
            lois en vigueur sur la propriété intellectuelle et le droit
            d'auteur. Toute reproduction ou distribution du contenu sans
            autorisation préalable est interdite.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Responsabilité
          </h2>
          <p className="text-gray-700 mb-4">
            L'éditeur du site ne saurait être tenu responsable des dommages
            directs ou indirects résultant de l'accès ou de l'utilisation du
            site, y compris l'inaccessibilité, les pertes de données ou les
            virus pouvant affecter l'utilisateur.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact</h2>
          <p className="text-gray-700 mb-4">
            Pour toute question ou réclamation, vous pouvez nous contacter à
            l'adresse suivante :{" "}
            <a
              href="mailto:mathispetitfrpro@gmail.com"
              className="text-blue-500 hover:underline"
            >
              mathispetitfrpro@gmail.com
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
