import { useEffect, useState } from 'react';
import './Admin.scss'
import Sidebar from "./Sidebar";
import { FaBars } from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Language from '../Header/Language';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/action/userAction';
import { toast } from 'react-toastify';


const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, account, isLoading, error, isLogouted } = useSelector(state => state.user)

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isLogouted) {
      toast.success("Logout successful!");
      navigate('/login');
    }
  }, [isLogouted, navigate]);

  const handleLogout = async () => {
    dispatch(logoutUser(account.email));
  }

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className='admin-header'>
          <span onClick={() => setCollapsed(!collapsed)}>
            <FaBars className='leftside' />
          </span>
          <div className='rightside'>
            <Language />
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item >Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >Other</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className='admin-main'> {/* phai co chieu cao */}
          {/* <PerfectScrollbar> */}
          <Outlet />
          {/* </PerfectScrollbar> */}
        </div>
      </div>
    </div>
  )
}

export default Admin;