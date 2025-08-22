import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { ThemeProvider } from './contexts/ThemeContext.jsx';   
import { AuthProvider } from './contexts/AuthContext.jsx';  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>                {/* <-- wrap everything */}
      <AuthProvider>               {/* you can keep AuthProvider here */}
        <BrowserRouter>            {/* keep ONE router (here) */}
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
