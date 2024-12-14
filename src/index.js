import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Dashboard from './components/Admin/Content/Dashboard';
import ManageUsers from './components/Admin/Content/ManageUsers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}> {/*Nested Routes */}
          <Route index element={<Home />} />
          <Route path="users" element={<User />} />
        </Route>

        <Route path="/admin" element={<Admin />} >
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
