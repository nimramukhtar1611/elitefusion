import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiMenu, FiX, FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import { FaGamepad, FaUpload, FaBlog, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { GiJoystick } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import logo from "../../assets/images/logo2.png";

const GameJamsNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { themeClasses, isDarkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout, loading } = useAuth();
  
  // Refs for click outside detection
  const profileDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Generate user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "MI";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Show loading state
  if (loading) {
    return (
      <nav className={`${themeClasses.bg} ${themeClasses.text} border-b ${themeClasses.border} sticky top-0 z-50 backdrop-blur-sm bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img className="h-16 w-auto" src={logo} alt="Elite Fusion Logo" />
              </Link>
            </div>
            <div className="animate-pulse">
              <div className="h-10 w-32 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`${themeClasses.bg} ${themeClasses.text} border-b ${themeClasses.border} sticky top-0 z-50 backdrop-blur-sm bg-opacity-95`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  className="h-16 w-auto transition-all duration-300 hover:scale-105"
                  src={logo}
                  alt="Elite Fusion Logo"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:ml-8 lg:flex lg:space-x-1">
              <Link
                to="/browse"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-lg ${themeClasses.textSecondary} hover:${themeClasses.text} hover:bg-orange-500/10 transition-all duration-200`}
              >
                <FaGamepad className={`mr-2 ${themeClasses.accent} group-hover:text-orange-500`} />
                <span>Browse Games</span>
              </Link>
              <Link
                to="/jams"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-lg ${themeClasses.textSecondary} hover:${themeClasses.text} hover:bg-orange-500/10 transition-all duration-200`}
              >
                <GiJoystick className={`mr-2 ${themeClasses.accent} group-hover:text-orange-500`} />
                <span>Game Jams</span>
              </Link>
              <Link
                to="/upload"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-lg ${themeClasses.textSecondary} hover:${themeClasses.text} hover:bg-orange-500/10 transition-all duration-200`}
              >
                <FaUpload className={`mr-2 ${themeClasses.accent} group-hover:text-orange-500`} />
                <span>Upload Games</span>
              </Link>
              <Link
                to="/our-work"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-lg ${themeClasses.textSecondary} hover:${themeClasses.text} hover:bg-orange-500/10 transition-all duration-200`}
              >
                <FaBlog className={`mr-2 ${themeClasses.accent} group-hover:text-orange-500`} />
                <span>Our Work</span>
              </Link>
            </div>
          </div>

          {/* Right side - Search, Theme, Auth */}
          <div className="flex items-center space-x-3">
            {/* Search - Hidden on small screens */}
            <form onSubmit={handleSearch} className="hidden xl:flex">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${themeClasses.inputBg} ${themeClasses.text} ${themeClasses.border} border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all w-64 text-sm`}
                />
                <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} w-4 h-4`} />
              </div>
            </form>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg ${themeClasses.hoverBg} transition-all duration-200 hover:scale-105`}
              aria-label="Toggle theme"
            >
              <span className="text-lg">{isDarkMode ? "🌞" : "🌙"}</span>
            </button>

            {/* Authentication Section */}
            <div className="flex items-center">
              {isAuthenticated && user ? (
                // User Profile Section
                <div className="relative">
                  <button
                    ref={profileButtonRef}
                    onClick={toggleProfileDropdown}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${themeClasses.hoverBg} transition-all duration-200 hover:scale-105 min-w-0`}
                  >
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">
                          {getUserInitials(user.username || user.name || "Muhammad-Irfanum")}
                        </span>
                      </div>
                    </div>
                    
                    {/* User Name - Hidden on mobile */}
                    <div className="hidden md:flex flex-col items-start min-w-0">
                      <span className={`${themeClasses.text} font-medium text-sm truncate max-w-28`}>
                        {user.username || user.name || "Muhammad-Irfanum"}
                      </span>
                     
                    </div>
                    
                    {/* Dropdown Arrow */}
                    <FiChevronDown 
                      className={`w-4 h-4 ${themeClasses.textSecondary} transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div 
                      ref={profileDropdownRef}
                      className={`absolute right-0 mt-2 w-64 ${themeClasses.cardBg} rounded-xl shadow-2xl border ${themeClasses.border} z-50 overflow-hidden backdrop-blur-sm`}
                    >
                      {/* User Info Header */}
                      <div className="p-4 border-b border-gray-700/50 bg-gradient-to-r from-orange-500/10 to-orange-600/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {getUserInitials(user.username || user.name || "Muhammad-Irfanum")}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold ${themeClasses.text} truncate`}>
                              {user.username || user.name || "Muhammad-Irfanum"}
                            </p>
                            <p className={`text-xs ${themeClasses.textSecondary} truncate`}>
                              {user.email || "muhammad.irfanum@example.com"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className={`flex items-center px-4 py-3 text-sm ${themeClasses.textSecondary} hover:${themeClasses.text} hover:bg-orange-500/10 transition-all duration-200`}
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <FiUser className="mr-3 w-4 h-4" />
                          My Profile
                        </Link>
                        <Link
                          to="/my-games"
                          className={`flex items-center px-4 py-3 text-sm ${themeClasses.textSecondary} hover:${themeClasses.text} hover:bg-orange-500/10 transition-all duration-200`}
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <FaGamepad className="mr-3 w-4 h-4" />
                          My Games
                        </Link>
                        <div className="border-t border-gray-700/50 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className={`w-full flex items-center px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200`}
                        >
                          <FiLogOut className="mr-3 w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Login/Register Buttons
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${themeClasses.textSecondary} hover:${themeClasses.text} border ${themeClasses.border} hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-200`}
                  >
                    <FaSignInAlt className="mr-2 w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-orange-500/25`}
                  >
                    <FaUserPlus className="mr-2 w-4 h-4" />
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-lg ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-3 border-t border-gray-700/50">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full ${themeClasses.inputBg} ${themeClasses.text} ${themeClasses.border} border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                />
                <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary} w-4 h-4`} />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {[
                { to: "/browse", icon: FaGamepad, label: "Browse Games" },
                { to: "/jams", icon: GiJoystick, label: "Game Jams" },
                { to: "/upload", icon: FaUpload, label: "Upload Games" },
                { to: "/our-work", icon: FaBlog, label: "Our Work" }
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${themeClasses.textSecondary} hover:${themeClasses.text} hover:bg-orange-500/10 transition-all duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className={`mr-3 w-5 h-5 ${themeClasses.accent}`} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Authentication */}
            <div className="pt-4 border-t border-gray-700/50">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  {/* Mobile User Info */}
                  <div className="flex items-center px-4 py-3 rounded-lg bg-orange-500/10">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">
                        {getUserInitials(user.username || user.name || "Muhammad-Irfanum")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${themeClasses.text} truncate`}>
                        {user.username || user.name || "Muhammad-Irfanum"}
                      </p>
                      <p className={`text-xs ${themeClasses.textSecondary} truncate`}>
                        {user.email || "muhammad.irfanum@example.com"}
                      </p>
                    </div>
                  </div>

                  {/* Mobile User Menu */}
                  <Link
                    to="/profile"
                    className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${themeClasses.textSecondary} hover:${themeClasses.text} hover:bg-orange-500/10 transition-all duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser className={`mr-3 w-5 h-5 ${themeClasses.accent}`} />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/my-games"
                    className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${themeClasses.textSecondary} hover:${themeClasses.text} hover:bg-orange-500/10 transition-all duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaGamepad className={`mr-3 w-5 h-5 ${themeClasses.accent}`} />
                    <span>My Games</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200`}
                  >
                    <FiLogOut className="mr-3 w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-lg ${themeClasses.textSecondary} hover:${themeClasses.text} border ${themeClasses.border} hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaSignInAlt className={`mr-3 w-5 h-5 ${themeClasses.accent}`} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUserPlus className="mr-3 w-5 h-5" />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default GameJamsNavbar;