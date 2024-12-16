import './Login.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    // validate
    const isValidEmail = validateEmail(email)
    if (!isValidEmail) {
      toast.error('invalid email')
      return;
    }
    if (!password) {
      toast.error('invalid password')
      return;
    }

    // submit apis
    const data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM)
      navigate('/')
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM)
    }
  }

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
        <span>Contact us</span>
      </div>
      <div className="title col-4 mx-auto">
        LOGIN
      </div>
      <div className="wellcome col-4 mx-auto">
        Hello, who’s this?
      </div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
          </input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
          </input>
        </div>
        <span className='forgot-password'>Forgot password?</span>
        <div>
          <button className='btn-login' onClick={() => handleLogin()}>Login</button>
        </div>
        <div className='text-center'>
          <span className='back' onClick={() => navigate('/')}>
            &#60;&#60; Go to Home page
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login;