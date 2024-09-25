import React from "react";
import HeroSectionLogin from "../components/HeroSectionLogin";
import LoginForm from "../components/LoginForm";
import "../assets/login.css";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <div className="login-container">
      <HeroSectionLogin title="de connexion" />
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
