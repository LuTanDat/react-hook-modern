import './Login.scss'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/action/userAction';
import { ImSpinner9 } from "react-icons/im";
import Language from '../Header/Language';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector(state => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const defaultValidInput = {
    isValidEmail: true,
    isValidPassword: true,
  }
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);

    if (!email) {
      toast.error('Email is required')
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
      return false;
    }
    const isValidEmail = validateEmail(email)
    if (!isValidEmail) {
      toast.error('Invalid email')
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
      return false;
    }
    if (!password) {
      toast.error('Password is required')
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
      return false;
    }

    return true;
  }

  const handleLogin = async () => {
    // validate
    if (!isValidInputs()) return;

    // submit apis
    dispatch(loginUser(email, password, navigate));
  }

  const handleKeyDown = (e) => {
    if (e && e.key === 'Enter') {
      handleLogin();
    }
  }

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate('/register')}>Sign up</button>
        <span>Contact us</span>
        <Language />
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
            className={`form-control ${objCheckInput.isValidEmail ? '' : 'is-invalid'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
          </input>
        </div>
        <div className="form-group pass-group">
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className={`form-control ${objCheckInput.isValidPassword ? '' : 'is-invalid'}`}
            placeholder='At least 6 characters'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          >
          </input>

          {showPassword ?
            <VscEye className='icon-eye'
              onClick={() => setShowPassword(false)}
            /> :
            <VscEyeClosed className='icon-eye'
              onClick={() => setShowPassword(true)}
            />
          }
        </div>
        <span className='forgot-password'>Forgot password?</span>
        <div>
          <button
            className='btn-login'
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            {isLoading && <ImSpinner9 className="loaderIcon" />}
            <span>Login</span>
          </button>
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