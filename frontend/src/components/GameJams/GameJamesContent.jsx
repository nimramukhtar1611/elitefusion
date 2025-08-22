import React from "react";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { useGameJams } from "../../hooks/useGameJams.js";
import GameJamLayout from "../GameJams/GameJamLayout.jsx";
import GameJamsNavbar from "./GameJamsNavbar.jsx";



const GameJamesContent = () => {
  const { themeClasses } = useTheme();
  const { gameJams, loading, error } = useGameJams();

  if (loading) {
    return (
      <div
        className={`${themeClasses.bg} min-h-screen flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B27B2B] mx-auto mb-4"></div>
          <p className={themeClasses.text}>Loading Game Jams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${themeClasses.bg} min-h-screen flex items-center justify-center`}
      >
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#B27B2B] text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${themeClasses.bg} min-h-screen transition-all duration-300`}
    >
      <GameJamsNavbar />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         

          <GameJamLayout gameJams={gameJams} />
    
          
        </div>
      </main>
    </div>
  );
};

export default GameJamesContent;
