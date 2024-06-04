import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import axios from 'axios'
import 'macro-css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

axios.defaults.baseURL = 'https://my-json-server.typicode.com/ivandemchenko01/react-s-shop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router basename='/react-s-shop'>
      <App/>
    </Router>
  // </React.StrictMode>
);