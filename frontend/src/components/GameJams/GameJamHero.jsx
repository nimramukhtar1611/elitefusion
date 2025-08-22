import React from 'react';
import { Link } from 'react-router-dom';
import { GiJoystick } from 'react-icons/gi';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import logo from '../../assets/images/logo2.png';

const GameJamHero = () => {
  const { themeClasses } = useTheme();

  return (
    <section className={`${themeClasses.heroBg} py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          
          {/* Left side - Logo and Visual */}
          <div className="relative flex items-center justify-center lg:order-1">
            <div className="relative">
              {/* Floating animation container */}
              <div className="relative animate-bounce" style={{ animationDuration: '3s' }}>
                {/* Main logo container */}
                <div className="relative">
                  {/* Glow effect behind logo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur-xl opacity-30 scale-110"></div>
                  
                  {/* Logo */}
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-8 border border-white/20 shadow-2xl">
                    <img
                      src={logo}
                      alt="GGJ Next Logo"
                      className="w-48 h-48 md:w-64 md:h-64 object-contain filter drop-shadow-2xl"
                    />
                  </div>
                </div>

                {/* Floating particles around logo */}
                <div className="absolute -top-4 -right-4 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-6 -left-6 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 -left-8 w-2 h-2 bg-orange-300 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>

            {/* Apply to be a local site leader link */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <Link 
                to="/apply-local-leader" 
                className={`${themeClasses.accent} hover:text-orange-600 underline text-sm font-medium transition-colors`}
              >
                Apply to be a local site leader
              </Link>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left lg:order-2">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6`}>
              <span className={themeClasses.accent}>GGJ NEXT</span>
              <span className="text-sm align-super">®</span>
              <span className={`${themeClasses.text}`}> is the </span>
              <span className={themeClasses.accent}>Global Game Jam</span>
              <span className="text-sm align-super">®</span>
              <span className={`${themeClasses.text}`}> event dedicated to young creators.</span>
            </h1>
            
            {/* Date */}
            <div className="mb-8">
              <p className={`${themeClasses.accent} font-bold text-xl mb-4`}>
                20 JANUARY – 26 JANUARY 2025
              </p>
              
              {/* Description */}
              <div className={`${themeClasses.textSecondary} text-base leading-relaxed space-y-4`}>
                <p>
                  <strong>IN 2025, GLOBAL GAME JAM AND GAMES FOR CHANGE HAVE PARTNERED TO CREATE THE WORLD'S LARGEST STUDENT GAME JAM IN SUPPORT OF THE GAMES FOR CHANGE "G4C STUDENT CHALLENGE."</strong> THE JAM COLLABORATION WILL KICK OFF WITH THE 2025 GLOBAL GAME JAM AND RUN THROUGH APRIL 18, 2025.
                </p>
              </div>
            </div>

            {/* Partnership info */}
            <div className={`${themeClasses.textSecondary} mb-8`}>
              <p className={`font-semibold ${themeClasses.accent} mb-4`}>
                THE GGJ NEXT-G4C PARTNERSHIP WILL INCLUDE TWO STUDENT JAMS:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className={`w-2 h-2 ${themeClasses.accentBg} rounded-full mr-3`}></span>
                  THE G4C-GGJ NEXT STUDENT JAM
                </li>
                <li className="flex items-center">
                  <span className={`w-2 h-2 ${themeClasses.accentBg} rounded-full mr-3`}></span>
                  THE G4C-GGJ UNIVERSITY STUDENT CHALLENGE JAM
                </li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className={`${themeClasses.accentBg} hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg`}>
                <GiJoystick className="inline mr-2" />
                Join Game Jam
              </button>
              <button className={`${themeClasses.cardBg} ${themeClasses.text} border-2 border-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full font-semibold transition-colors`}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameJamHero;


