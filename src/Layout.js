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
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import PrivateRoute from "./routes/PrivateRoute";

const NotFound = () => {
  return (
    <div className='container alert alert-danger text-center mt-3'>
      <span>404 Not found data with current URL</span>
    </div>
  )
}

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}> {/*Nested Routes */}
          <Route index element={<Home />} />
          <Route path="users" element={<PrivateRoute><ListQuiz /></PrivateRoute>} />
        </Route>

        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} >
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />




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