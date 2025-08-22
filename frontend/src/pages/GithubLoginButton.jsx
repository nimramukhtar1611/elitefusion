// components/GithubLoginButton.js
import React from 'react';

const GithubLoginButton = () => {
  const handleGithubLogin = () => {
    // Redirect to your backend GitHub auth route
    window.location.href = "http://localhost:5000/api/auth/github";
  };

  return (
    <button
      onClick={handleGithubLogin}
      style={{
        padding: "10px 20px",
        backgroundColor: "#24292e",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Login with GitHub
    </button>
  );
};

export default GithubLoginButton;
