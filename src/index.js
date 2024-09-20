import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'; // dam bao load xong data tu localstorage len roi moi chay react
import { BrowserRouter } from "react-router-dom";
import Layout from './Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css'; // hien thi thanh tien trinh khi load api
import 'react-perfect-scrollbar/dist/css/styles.css'; // tao scroll bar
import "react-awesome-lightbox/build/style.css"; // review image

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
