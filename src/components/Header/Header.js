import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }

  const handleSignup = () => {
    navigate('/register');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className='navbar-brand'>React-Bootstrap</NavLink>
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
            <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
            <button className='btn-signup' onClick={() => handleSignup()}> Sign up</button>
            {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item >Log in</NavDropdown.Item>
              <NavDropdown.Item >Log out</NavDropdown.Item>
              <NavDropdown.Item >Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >Other</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default Header;