import { useState } from 'react';
import './Admin.scss'
import Sidebar from "./Sidebar";
import { FaBars } from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Language from '../Header/Language';
import { postLogout } from '../../services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';
import { toast } from 'react-toastify';
import Profile from '../Header/Profile';


const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const account = useSelector(state => state.user.account);
  const [show, setShow] = useState(false);

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
              <NavDropdown.Item onClick={() => setShow(true)}>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >Other</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className='admin-main'> {/* phai co chieu cao */}
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
      <Profile
        show={show}
        setShow={setShow}
      />
    </div>
  )
}

export default Admin;