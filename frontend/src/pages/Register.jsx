import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext.jsx';
import RegisterForm from '../components/Auth/SignUp.jsx';
const Register = () => {
  return (
    <ThemeProvider>
      <RegisterForm />
    </ThemeProvider>
  );
};

export default Register;