import React from "react";
import { ThemeProvider } from "../contexts/ThemeContext.jsx";
import GameJamesContent from "../components/GameJams/GameJamesContent.jsx";

const GameJames = () => {
  return (
    <ThemeProvider>
      <GameJamesContent />
    </ThemeProvider>
  );
};

export default GameJames;
