import { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext.jsx";
import useGames from "../hooks/useGames.js";
import GameCard from "../components/Games/GameCard.jsx";

export default function LatestGame() {
  const { themeClasses } = useTheme();
  const { games, loading, error } = useGames({ 
    limit: 1, 
    visibility: "public",
    sort: "-createdAt" // Ensure newest game is fetched
  });

  // Get the latest game (first in the array since sorted by -createdAt)
  const latestGame = useMemo(() => games[0] || null, [games]);

  return (
    <div className={`relative ${themeClasses.background} ${themeClasses.text}`}>
      {loading ? (
        <div className="text-center py-8">
          <div className="text-2xl text-gray-400 animate-pulse">Loading latest game...</div>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <div className="flex items-center justify-center text-red-400">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      ) : !latestGame ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎮</div>
          <h3 className="text-2xl font-bold text-gray-300">No Games Available</h3>
          <p className="text-gray-400">Check back soon for new games!</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-fade-in">
            <GameCard game={latestGame} />
          </div>
        </div>
      )}
    </div>
  );
}