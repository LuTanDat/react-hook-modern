import { useState } from 'react';
import './Admin.scss'
import Sidebar from "./Sidebar";
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'react-toastify/dist/ReactToastify.css';

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false)
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
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item >Profile</NavDropdown.Item>
              <NavDropdown.Item >Log out</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >Other</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className='admin-main'>
          <Outlet />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={900}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default Admin;