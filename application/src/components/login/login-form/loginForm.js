import React, {useState} from 'react';
import { useDispatch } from 'react-redux'; 
import { loginUser } from '../../../redux/actions/authActions'
import { useHistory } from 'react-router-dom';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password, history, setSubmitError))
  }
  
  return (
      <form>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input type="text" className="form-control" id="inputEmail" placeholder="test@test.com" value={email} onChange={e => setEmail(e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input type="password" className="form-control" id="inputPassword" value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>
        <div className="d-flex justify-content-center">
            <button onClick={onSubmitHandler} type="submit" className="btn btn-primary">Login</button>
        </div>
        <div className='submit-error text-danger text-center'>
          <p>{submitError}</p>
        </div>
      </form>
  )
}

export default LoginForm;