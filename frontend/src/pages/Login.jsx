import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext.jsx';
import LoginForm from '../components/Auth/LoginForm.jsx';

const Login = () => {
  return (
    <ThemeProvider>
      <LoginForm />
    </ThemeProvider>
  );
};

export default Login;