import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FirestoreProvider } from './context/FirestoreContext'
import { StorageProvider } from './context/StorageContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <FirestoreProvider>
        <StorageProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
