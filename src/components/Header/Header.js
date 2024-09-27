import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { postLogout } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { FaReact } from "react-icons/fa";
import { useState } from 'react';
import Profile from './Profile';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const account = useSelector(state => state.user.account);

  const handleLogin = () => {
    navigate('/login');
  }

  const handleSignup = () => {
    navigate('/register');
  }

  const handleLogout = async () => {
    let res = await postLogout(account.email, account.refresh_token)
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate('/login');
    } else {
      toast.error(res.EM)
    }

  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to="/" className='navbar-brand'>
            <FaReact className="brand-icon" />
            React-Bootstrap
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className='nav-link'>Home</NavLink>
              <NavLink to="/users" className='nav-link'>Users</NavLink>
              <NavLink to="/admin" className='nav-link'>Admin</NavLink>
              {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link> */}
            </Nav>
            <Nav>
              {!isAuthenticated ?
                <>
                  <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                  <button className='btn-signup' onClick={() => handleSignup()}> Sign up</button>
                </>
                :
                <>
                  {/* <span>Hello {account.username}</span> */}
                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => setShow(true)}>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >Other</NavDropdown.Item>
                  </NavDropdown>
                </>
              }
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
      <Profile
        show={show}
        setShow={setShow}
      />
    </>

  );
}

export default Header;