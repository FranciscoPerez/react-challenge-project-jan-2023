import React from "react";
import LoginForm from "./login-form/loginForm";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="main-body">
      <h1 className="text-center">Login Screen</h1>
      <div className="d-flex justify-content-center mt-5">
        <LoginForm
          onLogin={() => {
            navigate("/view-orders");
          }}
        />
      </div>
    </div>
  );
};

export default Login;
