import { useState } from 'react';
import './Login.scss'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(email, password);

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
      </div>
    </div>
  )
}

export default Login;