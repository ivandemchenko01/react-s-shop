import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import axios from 'axios'
import 'macro-css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

axios.defaults.baseURL = 'http://localhost:3002';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
      <App/>
    </Router>
  // </React.StrictMode>
);