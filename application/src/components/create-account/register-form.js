import axios from "axios";
import { SERVER_IP } from "../../private";
import { useRef, useState } from "react"
import { useHistory } from "react-router-dom";
import "./register-form.css"

const REGISTER_USER_URL = `${SERVER_IP}/api/register`;

const validateEmail = (email) => {
  const pattern = /^\S+@\S+\.\S+$/i;
  return pattern.test(email)
}

const validatePassword = (password) => {
  if(password.length === 0 || password.length < 7 || password.length > 30) {
    return false;
  }
  return true;
}

const RegisterForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setSubmitError('');
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if(isEmailValid && isPasswordValid){
      axios.post(REGISTER_USER_URL, {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value
      })
      .then((response) => {
        console.log(response);
        history.push('/login')
      })
      .catch((error)=>{
        if(error.response && error.response.data && error.response.data.error){
          setSubmitError(error.response.data.error);
        }
        console.log(error)
      });
    }

    if(!isEmailValid){
      setEmailError('Email is invalid');
    }

    if(!isPasswordValid){
      setPasswordError('Password must be between 7 and 30 characters.');
    }
  }
  
  return (
    <form>
      <div className="form-group signup-input-group">
        <label htmlFor="inputEmail">Email</label>
        <input type="text" className="form-control" id="inputEmail" placeholder="test@test.com" ref={emailInputRef}></input>
        {emailError && <p className="text-danger text-center">{emailError}</p>}
      </div>
      <div className="form-group signup-input-group">
        <label htmlFor="inputPassword">Password</label>
        <input type="password" className="form-control" id="inputPassword" ref={passwordInputRef}></input>
        {passwordError && <p className="text-danger text-center">{passwordError}</p>}
      </div>
      <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary" onClick={onSubmitHandler}>Create Account</button>
      </div>
      {submitError && 
        <div className="submit-error text-danger text-center">
          <p>{submitError}</p>
        </div>}
    </form>)
}

export default RegisterForm;