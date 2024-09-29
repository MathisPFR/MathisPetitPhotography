import React from "react";
import HeroSection from "../components/HeroSection";
import LoginForm from "../components/LoginForm";
import "../assets/login.css";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <div className="login-container">
      <HeroSection
        title="Formulaire de"
        subtitle="Connexion"
        backgroundImage="./images/PhotosDefinitive29Juin2022.jpg"
      />
      <div className="login-form-container">
        <LoginForm />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
