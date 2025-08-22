import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const FALLBACK = "/placeholder-cover.png"; // put a tiny placeholder in /public if you like

export default function GameCard({ game }) {
  const { themeClasses } = useTheme();
  const cover = game?.coverImage?.startsWith("http") ? game.coverImage : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${game?.coverImage ?? ""}`;

  return (
    <div className={`${themeClasses.cardBg} rounded-2xl shadow-xl border ${themeClasses.border} overflow-hidden group transition-all hover:shadow-2xl`}>      
      <Link to={`/games/${game.slug || game.id}`} className="block">
        <div className="relative h-44 bg-gray-800 overflow-hidden">
          <img src={cover || FALLBACK} onError={(e)=>{e.currentTarget.src=FALLBACK;}} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
          {game.pricing === 'paid' && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Paid</span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/games/${game.projectUrl || game.slug || game.id}`} className={`block text-lg font-bold ${themeClasses.text} mb-1 line-clamp-1`}>{game.title}</Link>
        <p className={`${themeClasses.textSecondary} text-sm line-clamp-2 mb-3`}>{game.shortDescription || game.description?.slice(0, 110)}</p>
        <div className="flex items-center justify-between text-xs">
          <span className={`${themeClasses.textSecondary}`}>{game.genre || '—'}</span>
          <span className="text-orange-400">by {game.authorUsername || game.author?.username || 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
}