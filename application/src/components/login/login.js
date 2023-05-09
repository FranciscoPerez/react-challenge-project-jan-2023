import React, { Component } from 'react';
import LoginForm from './login-form/loginForm';
import './login.css';
import { Link } from 'react-router-dom';

class Login extends Component {
  
  render() {
    return (
      <div className="main-body">
        <h1 className="text-center">Login Screen</h1>
        <div className="d-flex justify-content-center mt-5">
          <LoginForm />
        </div>
        <Link to={"/create-account"}>Create Account</Link>
      </div>
    )
  }
}

export default Login;