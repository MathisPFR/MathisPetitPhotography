import React from "react";
import HeroSection from "../components/HeroSection";
import "../assets/login.css";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  return (
    <div className="login-container">
      <HeroSection
        title="Formulaire"
        subtitle="D'enregistrement"
        backgroundImage="./images/PhotosDefinitive29Juin2022.jpg"
      />
      <div className="login-form-container">
        <RegisterForm />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
