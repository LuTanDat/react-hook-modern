import { useState } from 'react';
import './Admin.scss'
import Sidebar from "./Sidebar";
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className='admin-header'>
          <FaBars onClick={() => setCollapsed(!collapsed)} />
        </div>
        <div className='admin-main'> {/* phai co chieu cao */}
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  )
}

export default Admin;