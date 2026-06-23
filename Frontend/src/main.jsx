import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// IMPORT YOUR CSS FILES HERE
// Note: The order matters! Bootstrap first, then your custom styles.
import './assets/css/bootstrap.css';      
import './assets/css/font-awesome.min.css';
import './assets/css/style.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);