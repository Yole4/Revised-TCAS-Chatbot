import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './components/Context/AuthContext';
import { PublicContextProvider } from './components/Context/PublicContext';
import { AdminContextProvider } from './components/Context/AdminContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AdminContextProvider>
          <PublicContextProvider >
            <App />
          </PublicContextProvider>
        </AdminContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);