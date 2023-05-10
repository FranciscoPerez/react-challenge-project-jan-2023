import RegisterForm from "./register-form";
import { Link } from "react-router-dom";

const Register = () => {
  return (<div className="main-body">
            <h1 className="text-center">Create an Account</h1>
            <div className="d-flex justify-content-center mt-5">
              <RegisterForm />
            </div>
            <Link to={"/login"}>Sign In</Link>
          </div>)
}

export default Register;