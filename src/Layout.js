import {
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Dashboard from './components/Admin/Content/Dashboard';
import ManageUsers from './components/Admin/Content/ManageUsers';
import Login from './components/Auth/Login';

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}> {/*Nested Routes */}
          <Route index element={<Home />} />
          <Route path="users" element={<User />} />
        </Route>

        <Route path="/admin" element={<Admin />} >
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Route>

        <Route path="/login" element={<Login />} />







      </Routes>

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
    </>
  )
}

export default Layout;