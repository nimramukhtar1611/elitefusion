import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext.jsx';
import UploadGameForm from '../components/UploadGameForm.jsx';

const UploadGame = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black">
        <UploadGameForm />
      </div>
    </ThemeProvider>
  );
};

export default UploadGame;