import React from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

const PrivacyPolicy = () => {
  return (
    <div className="">
      <div>
        <HeroSection
          title="Politique"
          subtitle="de Confidentialité"
          backgroundImage="./images/IMG_8418.jpg"
        />
      </div>
      <div className="max-w-4xl mx-auto p-8 bg-gray-100 text-gray-800">
        <p className="mb-6">
          Cette politique de confidentialité décrit comment Mathis Petit
          collecte, utilise et protège les informations que vous nous fournissez
          lorsque vous utilisez notre site web.
        </p>

        {/* Section 1 - Informations collectées */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            1. Informations collectées
          </h2>
          <p>
            Nous collectons les informations suivantes lorsque vous interagissez
            avec notre site :
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone (si fourni)</li>
            <li>Données de navigation (cookies)</li>
          </ul>
        </section>

        {/* Section 2 - Utilisation des données */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            2. Utilisation des données
          </h2>
          <p>Les informations que nous collectons sont utilisées pour :</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Répondre à vos questions et demandes</li>
            <li>Améliorer nos services et personnaliser votre expérience</li>
            <li>
              Envoyer des mises à jour ou des informations sur nos services
            </li>
            <li>
              Analyser les données de navigation pour améliorer la performance
              du site
            </li>
          </ul>
        </section>

        {/* Section 3 - Partage des données */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            3. Partage des données
          </h2>
          <p>
            Vos données ne seront pas vendues ou partagées avec des tiers, sauf
            dans les cas suivants :
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Si la loi l'exige</li>
            <li>
              Si cela est nécessaire pour répondre à vos demandes ou améliorer
              nos services
            </li>
            <li>
              Avec des prestataires de services de confiance, sous accord de
              confidentialité
            </li>
          </ul>
        </section>

        {/* Section 4 - Cookies */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Cookies</h2>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience sur notre
            site. Vous pouvez choisir de désactiver les cookies via les
            paramètres de votre navigateur.
          </p>
        </section>

        {/* Section 5 - Sécurité des données */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            5. Sécurité des données
          </h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité pour protéger vos
            données personnelles contre tout accès non autorisé, modification ou
            divulgation.
          </p>
        </section>

        {/* Section 6 - Droits des utilisateurs */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Vos droits</h2>
          <p>Conformément au RGPD, vous avez le droit de :</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Accéder à vos données personnelles</li>
            <li>Corriger ou supprimer vos données</li>
            <li>Vous opposer au traitement de vos données</li>
            <li>Porter plainte auprès des autorités compétentes</li>
          </ul>
        </section>

        {/* Section 7 - Contact */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Contact</h2>
          <p>
            Si vous avez des questions concernant cette politique de
            confidentialité, vous pouvez nous contacter à l'adresse suivante :
          </p>
          <p className="mt-2">
            <strong>Nom :</strong> Mathis Petit <br />
            <strong>Adresse :</strong> 43 rue de la challe, Saint Bonnet lès
            Allier <br />
            <strong>Email :</strong> mathispetitfrpro@gmail.com
          </p>
        </section>

        {/* Section 8 - Modifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            8. Modifications de cette politique
          </h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de
            confidentialité à tout moment. Toute modification sera publiée sur
            cette page.
          </p>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
