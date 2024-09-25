import React from "react";
import HeroSectionLogin from "../components/HeroSectionLogin";
import "../assets/login.css";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  return (
    <div className="login-container">
      <HeroSectionLogin title="d'enregistrement" />
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
