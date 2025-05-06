import './Register.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Language from '../Header/Language';

const Register = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const defaultValidInput = {
    isValidEmail: true,
    isValidPassword: true,
    isValidUsername: true,
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
    if (!username) {
      toast.error('Username is required')
      setObjCheckInput({ ...defaultValidInput, isValidUsername: false })
      return false;
    }

    return true;
  }

  const handleRegister = async () => {
    // validate
    if (!isValidInputs()) return;

    // submit apis
    const data = await postRegister(email, username, password);
    if (data && +data.EC === 0) {
      toast.success(data.EM)
      navigate('/login')
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM)
    }
  }

  return (
    <div className="register-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate('/login')}>Log in</button>
        <span>Contact us</span>
        <Language />
      </div>
      <div className="title col-4 mx-auto">
        REGISTER
      </div>
      <div className="wellcome col-4 mx-auto">
        Hello, who’s this?
      </div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type="email"
            className={`form-control ${objCheckInput.isValidEmail ? '' : 'is-invalid'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          >
          </input>
        </div>
        <div className="form-group pass-group">
          <label>Password (*)</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className={`form-control ${objCheckInput.isValidPassword ? '' : 'is-invalid'}`}
            placeholder='At least 6 characters'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          >
          </input>

          {showPassword ?
            <span className='icon-eye'
              onClick={() => setShowPassword(false)}>
              <VscEye />
            </span>
            :
            <span className='icon-eye'
              onClick={() => setShowPassword(true)}>
              <VscEyeClosed />
            </span>
          }
        </div>
        <div className="form-group">
          <label>Username (*)</label>
          <input
            type="text"
            className={`form-control ${objCheckInput.isValidUsername ? '' : 'is-invalid'}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
          </input>
        </div>
        <div>
          <button className='btn-register' onClick={() => handleRegister()}>Create my free account</button>
        </div>
        <div className='text-center'>
          <span className='back' onClick={() => navigate('/login')}>
            &#60;&#60; Go to Login page
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register;