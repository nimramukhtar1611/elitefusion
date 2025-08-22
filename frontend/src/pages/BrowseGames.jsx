import { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext.jsx";
import useGames from "../hooks/useGames.js";
import GameGridSkeleton from "../components/Games/GameGridSkeleton.jsx";
import GameCard from "../components/Games/GameCard.jsx";

const GENRES = [
  "", "action", "adventure", "puzzle", "strategy", "rpg", "simulation", "sports", "racing", "platformer", "shooter", "fighting", "visual-novel", "interactive-fiction", "card-game", "board-game", "educational", "other"
];

const GENRE_ICONS = {
  action: "⚔️",
  adventure: "🗺️", 
  puzzle: "🧩",
  strategy: "♟️",
  rpg: "🐉",
  simulation: "🔬",
  sports: "⚽",
  racing: "🏎️",
  platformer: "🦘",
  shooter: "🎯",
  fighting: "👊",
  "visual-novel": "📖",
  "interactive-fiction": "📚",
  "card-game": "🃏",
  "board-game": "🎲",
  educational: "🎓",
  other: "🎮"
};

export default function BrowseGames() {
  const { themeClasses } = useTheme();
  const { games, loading, error, totalPages, total, filters, setFilters } = useGames({ limit: 12, visibility: "public" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/3 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5" />
        
        {/* Floating Geometric Elements */}
        <div className="absolute top-8 right-8 opacity-10">
          <div className="w-32 h-32 border border-orange-500/30 rounded-full animate-spin-slow" />
          <div className="absolute inset-4 w-24 h-24 border border-orange-400/20 rounded-full animate-reverse-spin" />
        </div>
        <div className="absolute bottom-8 left-8 opacity-8">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full animate-pulse-glow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero Content */}
          <div className="text-center mb-16 animate-slide-up-hero">
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-gray-200 to-orange-300 bg-clip-text text-transparent drop-shadow-2xl">
              Browse Games
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover amazing projects created by our talented community of developers and creators
            </p>
            
            {/* Stats Bar */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="backdrop-blur-md bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-2xl p-6 border border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-orange-500/30">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  {total || 0}
                </div>
                <div className="text-gray-400 font-medium">Total Games</div>
              </div>
              <div className="backdrop-blur-md bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-2xl p-6 border border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-orange-500/30">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  {GENRES.filter(Boolean).length}
                </div>
                <div className="text-gray-400 font-medium">Genres</div>
              </div>
              <div className="backdrop-blur-md bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-2xl p-6 border border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-orange-500/30">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {filters.page || 1}
                </div>
                <div className="text-gray-400 font-medium">Current Page</div>
              </div>
            </div>
          </div>

          {/* Enhanced Search & Filter Controls */}
          <div className="backdrop-blur-md bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-3xl p-8 border border-slate-600/50 shadow-2xl animate-slide-up-stagger">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Search Input */}
              <div className="md:col-span-6 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-orange-400 group-focus-within:text-orange-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  value={filters.search}
                  onChange={(e) => setFilters(f => ({ ...f, page: 1, search: e.target.value }))}
                  placeholder="Search by title, tags, developer..."
                  className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border border-slate-600/60 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 hover:border-slate-500/80"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Genre Filter */}
              <div className="md:col-span-3 relative group">
                <select
                  value={filters.genre}
                  onChange={(e) => setFilters(f => ({ ...f, page: 1, genre: e.target.value }))}
                  className="w-full px-4 py-4 bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border border-slate-600/60 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 hover:border-slate-500/80 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">🎮 All Genres</option>
                  {GENRES.filter(Boolean).map(g => (
                    <option key={g} value={g} className="bg-slate-800">
                      {GENRE_ICONS[g] || "🎮"} {g.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Sort Filter */}
              <div className="md:col-span-3 relative group">
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters(f => ({ ...f, page: 1, sort: e.target.value }))}
                  className="w-full px-4 py-4 bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border border-slate-600/60 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 hover:border-slate-500/80 appearance-none cursor-pointer"
                >
                  <option value="-createdAt" className="bg-slate-800">🆕 Newest First</option>
                  <option value="createdAt" className="bg-slate-800">⏰ Oldest First</option>
                  <option value="title" className="bg-slate-800">🔤 Title A→Z</option>
                  <option value="-views" className="bg-slate-800">👀 Most Viewed</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.search || filters.genre) && (
              <div className="mt-6 pt-6 border-t border-slate-600/30">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-gray-400 font-medium">Active filters:</span>
                  {filters.search && (
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-300 rounded-full text-sm border border-orange-500/30">
                      Search: "{filters.search}"
                      <button
                        onClick={() => setFilters(f => ({ ...f, search: "" }))}
                        className="ml-2 text-orange-400 hover:text-orange-300"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.genre && (
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                      {GENRE_ICONS[filters.genre]} {filters.genre.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      <button
                        onClick={() => setFilters(f => ({ ...f, genre: "" }))}
                        className="ml-2 text-purple-400 hover:text-purple-300"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Error Display */}
          {error && (
            <div className="mb-8 backdrop-blur-md bg-gradient-to-r from-red-900/40 to-red-800/40 border border-red-500/50 rounded-2xl p-6 text-red-200 shadow-xl animate-slide-up">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && games.length === 0 && (
            <div className="text-center py-24 animate-fade-in">
              <div className="relative mb-8">
                <div className="text-8xl mb-6 animate-float">🎮</div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500/20 rounded-full animate-pulse" />
              </div>
              <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                No Games Found
              </h3>
              <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                Try adjusting your filters or be the first to upload an amazing game!
              </p>
              <button
                onClick={() => setFilters({ search: "", genre: "", sort: "-createdAt", page: 1 })}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear All Filters
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="animate-fade-in">
              <GameGridSkeleton />
            </div>
          ) : (
            games.length > 0 && (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-8 animate-slide-up">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Game Results
                    </h2>
                    <div className="px-4 py-2 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-full">
                      <span className="text-sm text-gray-300 font-medium">
                        {total} {total === 1 ? 'game' : 'games'} found
                      </span>
                    </div>
                  </div>
                  
                  {/* View Toggle (Future Enhancement) */}
                  <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-1">
                    <button className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-300 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in-up">
                  {games.map((game, index) => (
                    <div 
                      key={game._id || game.id} 
                      className="animate-slide-up-stagger"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <GameCard game={game} />
                    </div>
                  ))}
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex items-center justify-center animate-slide-up">
                    <div className="backdrop-blur-md bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-2 border border-slate-600/50 shadow-xl">
                      <div className="flex items-center space-x-2">
                        {/* Previous Button */}
                        <button
                          onClick={() => setFilters(f => ({ ...f, page: Math.max(1, f.page - 1) }))}
                          disabled={filters.page <= 1}
                          className="group flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-slate-700/60 to-slate-600/60 text-gray-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-500/20 hover:to-orange-600/20 hover:text-orange-300 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
                        >
                          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center space-x-1 mx-4">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (filters.page <= 3) {
                              pageNum = i + 1;
                            } else if (filters.page >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = filters.page - 2 + i;
                            }
                            
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setFilters(f => ({ ...f, page: pageNum }))}
                                className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                                  filters.page === pageNum
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                                    : 'text-gray-400 hover:text-orange-300 hover:bg-orange-500/10'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        {/* Next Button */}
                        <button
                          onClick={() => setFilters(f => ({ ...f, page: Math.min(totalPages, f.page + 1) }))}
                          disabled={filters.page >= totalPages}
                          className="group flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-slate-700/60 to-slate-600/60 text-gray-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-500/20 hover:to-orange-600/20 hover:text-orange-300 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
                        >
                          Next
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </section>
    </div>
  );
}