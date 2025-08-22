import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { useGameJams } from '../../hooks/useGameJams.js';
import GameJamHero from './GameJamHero.jsx';

import  useGames  from '../../hooks/useGames.js';

const GameJamLayout = ({ gameJams:jamsPrps =[] }) => {
  const { themeClasses } = useTheme();
  //jams for hero
  const { gameJams: jamsData, error: jamsError } = useGameJams();
  const gameJams = Array.isArray(jamsData) && jamsData.length ? jamsData : jamsPrps;

  //games for featured
  const { games: uploadedGames, loading, error } = useGames();
  const games = Array.isArray(uploadedGames) ? uploadedGames : [];

    // Show error state
  if (jamsError || jamsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading data</p>
          <p className={themeClasses.textSecondary}>
            {jamsError?.message || jamsError?.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <GameJamHero gameJams={gameJams} />

      {/* Three Features Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.bg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* GGJ NEXT Card */}
            <div className={`${themeClasses.cardBg} rounded-2xl shadow-xl border ${themeClasses.border} overflow-hidden hover:shadow-2xl transition-all duration-300 group`}>
              <div className="h-48 bg-gradient-to-br from-[#B27B2B] to-[#B27B2B] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-5 transition-all duration-300"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-4xl">💡</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 text-center">
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4 tracking-wide`}>
                  GGJ NEXT
                </h3>
                <p className={`${themeClasses.textSecondary} mb-8 leading-relaxed`}>
                  GGJ Next is a jam for kids 10-18 who are interested in learning the creation of video games.
                </p>
                <button className={`${themeClasses.accentBg} hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-colors shadow-lg uppercase`}>
                  FIND OUT MORE
                </button>
              </div>
            </div>

            {/* University Challenge Card */}
            <div className={`${themeClasses.cardBg} rounded-2xl shadow-xl border ${themeClasses.border} overflow-hidden hover:shadow-2xl transition-all duration-300 group`}>
              <div className="h-48 bg-gradient-to-br from-[#B27B2B] to-[#B27B2B] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-5 transition-all duration-300"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-4xl">🏆</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 text-center">
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4 tracking-wide`}>
                  UNIVERSITY CHALLENGE JAM
                </h3>
                <p className={`${themeClasses.textSecondary} mb-8 leading-relaxed`}>
                  Tackle a social impact topic for the chance to turn your jam game into a $10K scholarship.
                </p>
                <button className={`${themeClasses.accentBg} hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-colors shadow-lg uppercase`}>
                  LEARN MORE
                </button>
              </div>
            </div>

            {/* Apply for Stipend Card */}
            <div className={`${themeClasses.cardBg} rounded-2xl shadow-xl border ${themeClasses.border} overflow-hidden hover:shadow-2xl transition-all duration-300 group`}>
              <div className="h-48 bg-gradient-to-br from-[#B27B2B] to-[#B27B2B] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-5 transition-all duration-300"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-4xl">🌍</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 text-center">
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4 tracking-wide`}>
                  APPLY FOR STIPEND
                </h3>
                <p className={`${themeClasses.textSecondary} mb-8 leading-relaxed`}>
                  As we seek to grow GGJ Next around the globe, stipends are available for most countries.
                </p>
                <button className={`${themeClasses.accentBg} hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-colors shadow-lg uppercase`}>
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uploaded Games Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.bg === 'bg-black' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${themeClasses.text} mb-4`}>
              Featured Games
            </h2>
            <p className={`text-lg ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              Discover amazing games created by our community members during game jams and competitions.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B27B2B]"></div>
              <span className={`ml-4 ${themeClasses.text}`}>Loading games...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Error loading games: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-[#B27B2B] text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : games.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🎮</span>
              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>No Games Yet</h3>
              <p className={`${themeClasses.textSecondary} mb-6`}>
                Be the first to upload your game!
              </p>
              <button 
                onClick={() => window.location.href = '/upload'}
                className="bg-[#B27B2B] text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
              >
                Upload Your Game
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.bg === 'bg-black' ? 'bg-gray-900' : 'bg-blue-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="text-6xl mb-6">📧</div>
            <h2 className={`text-4xl md:text-5xl font-bold ${themeClasses.text} mb-6`}>
              Sign up to our mailing list
            </h2>
            <p className={`${themeClasses.textSecondary} text-xl mb-2 max-w-3xl mx-auto leading-relaxed`}>
              Get updates from GGJ NEXT. Find out when new courses come online and when we host new events directly to your inbox.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className={`flex-1 px-6 py-4 rounded-full border text-lg ${themeClasses.inputBg} ${themeClasses.border} ${themeClasses.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
              />
              <button 
                type="submit"
                className={`${themeClasses.accentBg} hover:bg-orange-600 text-white px-12 py-4 rounded-full font-bold text-lg tracking-wide transition-colors shadow-lg uppercase`}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.bg}`}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold ${themeClasses.text} mb-8 leading-tight`}>
            GGJ NEXT wouldn't be possible without our generous sponsors.
          </h2>
          <p className={`${themeClasses.textSecondary} text-xl mb-12 max-w-3xl mx-auto`}>
            Learn how your company can become a part of this excellent educational event.
          </p>
          
          <button className={`${themeClasses.accentBg} hover:bg-orange-600 text-white px-12 py-4 rounded-full font-bold text-lg tracking-wide transition-colors shadow-lg uppercase mb-16`}>
            SPONSOR GGJ NEXT
          </button>
        </div>
      </section>
    </div>
  );
};

export default GameJamLayout;

