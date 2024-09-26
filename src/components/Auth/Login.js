import './Login.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner9 } from "react-icons/im";
import Language from '../Header/Language';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true)
    // submit apis
    const data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data))
      toast.success(data.EM)
      setIsLoading(false)
      navigate('/')
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM)
      setIsLoading(false)
    }
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
        {/* <span>Contact us</span> */}
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
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
          </input>
        </div>
        <div className="form-group pass-group">
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
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