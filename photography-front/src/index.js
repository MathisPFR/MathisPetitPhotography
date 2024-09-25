import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './index.css';
import 'flowbite';
import { AuthProvider } from "./AuthContext"; // Importer le AuthProvider



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider>
    <App />
     </AuthProvider>
  </React.StrictMode>
);


