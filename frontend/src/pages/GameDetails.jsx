import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import { useTheme } from "../contexts/ThemeContext.jsx";
import { fetchGameBySlug } from "../services/gamesApi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const FALLBACK = "/placeholder-cover.png";

export default function GameDetails() {
  const { slug } = useParams();
  // const { themeClasses } = useTheme();

  const [state, setState] = useState({
    loading: true,
    error: "",
    game: null,
  });

  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const getAssetUrl = useMemo(
    () => (p) => (p?.startsWith("http") ? p : `${API_URL}${p || ""}`),
    []
  );

  useEffect(() => {
    let alive = true;
    setState({ loading: true, error: "", game: null });

    fetchGameBySlug(slug)
      .then((res) => {
        if (!alive) return;
        setState({ loading: false, error: "", game: res.game });
      })
      .catch((err) => {
        if (!alive) return;
        setState({ loading: false, error: err.message || "Failed to load game", game: null });
      });

    return () => { alive = false; };
  }, [slug]);

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            {/* Hero skeleton */}
            <div className="relative">
              <div className="h-96 bg-gradient-to-r from-slate-800 via-gray-800 to-slate-700 rounded-3xl shadow-2xl animate-shimmer border border-slate-700/50" />
              <div className="absolute bottom-8 left-8 space-y-4">
                <div className="h-12 w-80 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl animate-pulse-glow" />
                <div className="h-6 w-48 bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg animate-pulse-glow" />
              </div>
            </div>
            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 w-32 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg animate-pulse-glow" />
                <div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-full animate-pulse-glow" />
                  <div className="h-4 bg-gradient-to-r from-slate-600 to-slate-500 rounded w-4/5 animate-pulse-glow" />
                  <div className="h-4 bg-gradient-to-r from-slate-500 to-slate-400 rounded w-3/5 animate-pulse-glow" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl animate-pulse-glow border border-slate-700/50" />
                <div className="h-32 bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl animate-pulse-glow border border-slate-600/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 animate-pulse-slow" />
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-gradient-to-r from-orange-500 to-orange-600 border-t-transparent animate-spin-elegant" />
            <div className="absolute inset-4 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-sm" />
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            Game Not Found
          </h2>
          <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto leading-relaxed">{state.error}</p>
          <Link 
            to="/browse" 
            className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-bold rounded-2xl shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 border border-orange-400/20"
          >
            <svg className="w-6 h-6 mr-3 group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Browse
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500" />
          </Link>
        </div>
      </div>
    );
  }

  const g = state.game;
  if (!g) return null;

  const cover = getAssetUrl(g.coverImage) || FALLBACK;
  const screenshots = Array.isArray(g.screenshots) ? g.screenshots : [];
  const files = Array.isArray(g.gameFiles) ? g.gameFiles : [];
  const tags = Array.isArray(g.tags) ? g.tags : (g.tags ? String(g.tags).split(",").map(t => t.trim()).filter(Boolean) : []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/5" />
        
        {/* Hero Image with Advanced Effects */}
        <div className="relative h-96 md:h-[600px] w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 hover:scale-110 filter hover:brightness-110"
            style={{ backgroundImage: `url(${cover})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-slate-900/40" />
          
          {/* Floating Geometric Elements */}
          <div className="absolute top-8 right-8 opacity-20">
            <div className="w-40 h-40 border-2 border-orange-500/40 rounded-full animate-spin-slow backdrop-blur-sm" />
            <div className="absolute inset-4 w-32 h-32 border border-orange-400/30 rounded-full animate-reverse-spin" />
          </div>
          <div className="absolute bottom-12 right-12 opacity-15">
            <div className="w-32 h-32 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-full animate-pulse-glow backdrop-blur-sm" />
          </div>
          <div className="absolute top-1/2 left-8 opacity-10">
            <div className="w-24 h-24 border border-blue-400/30 rotate-45 animate-float backdrop-blur-sm" />
          </div>
        </div>

        {/* Hero Content with Glass Effect */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <div className="backdrop-blur-md bg-slate-900/30 rounded-3xl p-8 border border-slate-700/50 transform animate-slide-up-hero shadow-2xl">
              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
                {g.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="px-6 py-3 bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-md border border-orange-500/40 rounded-2xl text-orange-300 font-semibold shadow-lg shadow-orange-500/10">
                  by {g.authorUsername || g.author?.username || "Unknown"}
                </span>
                {g.genre && (
                  <span className="px-6 py-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md border border-slate-600/40 rounded-2xl text-gray-300 font-medium shadow-lg">
                    {g.genre}
                  </span>
                )}
                {typeof g.views === "number" && (
                  <span className="px-6 py-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md border border-slate-600/40 rounded-2xl text-gray-300 font-medium shadow-lg">
                    {g.views.toLocaleString()} views
                  </span>
                )}
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-wrap gap-6">
                {files.length > 0 && (
                  <a
                    href={getAssetUrl(files[0].url)}
                    download
                    className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-bold rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-orange-400/20 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <svg className="relative w-6 h-6 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="relative">Download Now</span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-700" />
                  </a>
                )}
                {g.gameplayVideo && (
                  <a
                    href={g.gameplayVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-md border-2 border-orange-500/60 text-orange-300 font-bold rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-slate-900/50 overflow-hidden"
                  >
                    <svg className="w-6 h-6 mr-3 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                    Watch Trailer
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-orange-300/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-700" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Enhanced Tags */}
        {tags.length > 0 && (
          <div className="mb-16 animate-fade-in-up">
            <div className="flex flex-wrap gap-4">
              {tags.map((t, i) => (
                <span 
                  key={i} 
                  className="group px-6 py-3 bg-gradient-to-r from-orange-500/15 to-orange-600/15 backdrop-blur-sm border border-orange-500/30 text-orange-300 rounded-2xl text-sm font-semibold hover:bg-gradient-to-r hover:from-orange-500/25 hover:to-orange-600/25 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg shadow-orange-500/10 cursor-pointer"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="relative">
                    #{t}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-orange-300/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500" />
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Description & Screenshots */}
          <div className="lg:col-span-2 space-y-16">
            {/* Description */}
            {g.description && (
              <section className="animate-slide-up-stagger">
                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent flex items-center">
                  <span className="w-2 h-10 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-6 shadow-lg shadow-orange-500/30" />
                  About This Game
                </h2>
                <div className="backdrop-blur-md bg-gradient-to-br from-slate-800/40 to-slate-700/40 rounded-3xl p-10 border border-slate-600/50 shadow-2xl shadow-slate-900/50 hover:shadow-xl hover:shadow-slate-900/60 transition-all duration-500 hover:border-slate-500/60">
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                    {g.description}
                  </p>
                </div>
              </section>
            )}

            {/* Enhanced Screenshots Gallery */}
            {screenshots.length > 0 && (
              <section className="animate-slide-up-stagger">
                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent flex items-center">
                  <span className="w-2 h-10 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-6 shadow-lg shadow-orange-500/30" />
                  Screenshots
                </h2>
                
                {/* Main Screenshot with Enhanced Effects */}
                <div className="mb-8 relative group">
                  <div className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/50 border border-slate-600/50 backdrop-blur-sm">
                    <img
                      src={getAssetUrl(screenshots[activeScreenshot])}
                      alt={`Screenshot ${activeScreenshot + 1}`}
                      className="w-full h-96 object-cover group-hover:scale-110 transition-all duration-700 filter group-hover:brightness-110"
                      onError={(e) => { e.currentTarget.src = FALLBACK; }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl" />
                </div>

                {/* Enhanced Thumbnail Navigation */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {screenshots.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveScreenshot(i)}
                      className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:scale-110 hover:-translate-y-2 shadow-lg backdrop-blur-sm ${
                        activeScreenshot === i 
                          ? 'border-orange-500 shadow-xl shadow-orange-500/40 bg-gradient-to-br from-orange-500/20 to-orange-600/20' 
                          : 'border-slate-600/60 hover:border-orange-400/60 hover:shadow-xl hover:shadow-orange-500/20'
                      }`}
                    >
                      <img
                        src={getAssetUrl(s)}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-24 object-cover transition-all duration-500"
                        onError={(e) => { e.currentTarget.src = FALLBACK; }}
                      />
                      {activeScreenshot === i && (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center backdrop-blur-sm">
                          <div className="w-3 h-3 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50 animate-pulse" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Enhanced Right Column - Sidebar */}
          <aside className="space-y-8">
            {/* Game Details */}
            <div className="backdrop-blur-md bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-3xl p-8 border border-slate-600/50 shadow-2xl shadow-slate-900/50 hover:shadow-xl hover:shadow-slate-900/60 transition-all duration-500 animate-slide-up-stagger hover:border-slate-500/60">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center">
                <svg className="w-6 h-6 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Game Details
              </h3>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex justify-between items-center py-3 border-b border-slate-600/30 hover:border-orange-500/30 transition-colors duration-300">
                  <span className="text-gray-400 font-medium">Release Status</span>
                  <span className="capitalize font-semibold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">{g.releaseStatus || "—"}</span>
                </li>
                <li className="flex justify-between items-center py-3 border-b border-slate-600/30 hover:border-orange-500/30 transition-colors duration-300">
                  <span className="text-gray-400 font-medium">Project Type</span>
                  <span className="capitalize font-semibold text-blue-400">{g.projectType || "—"}</span>
                </li>
                <li className="flex justify-between items-center py-3 border-b border-slate-600/30 hover:border-orange-500/30 transition-colors duration-300">
                  <span className="text-gray-400 font-medium">Pricing</span>
                  <span className="capitalize font-semibold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">{g.pricing || "Free"}</span>
                </li>
                <li className="flex justify-between items-center py-3 border-b border-slate-600/30 hover:border-orange-500/30 transition-colors duration-300">
                  <span className="text-gray-400 font-medium">Visibility</span>
                  <span className="capitalize font-semibold text-purple-400">{g.visibility || "Public"}</span>
                </li>
                {g.isLudumDare && (
                  <li className="flex justify-between items-center py-3 border-b border-slate-600/30 hover:border-orange-500/30 transition-colors duration-300">
                    <span className="text-gray-400 font-medium">Ludum Dare</span>
                    <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Yes {g.ludumDareTag ? `(${g.ludumDareTag})` : ""}
                    </span>
                  </li>
                )}
                {g.hasAI && (
                  <li className="flex justify-between items-center py-3">
                    <span className="text-gray-400 font-medium">AI Content</span>
                    <span className="capitalize font-semibold text-cyan-400">{g.hasAI}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Enhanced Downloads */}
            {files.length > 0 && (
              <div className="backdrop-blur-md bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-3xl p-8 border border-slate-600/50 shadow-2xl shadow-slate-900/50 hover:shadow-xl hover:shadow-slate-900/60 transition-all duration-500 animate-slide-up-stagger hover:border-slate-500/60">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center">
                  <svg className="w-6 h-6 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Downloads
                </h3>
                <ul className="space-y-4">
                  {files.map((f, i) => (
                    <li key={i} className="group">
                      <a
                        href={getAssetUrl(f.url)}
                        download
                        className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-slate-700/50 to-slate-600/50 border border-slate-600/60 hover:border-orange-500/60 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-600/10 transition-all duration-500 group-hover:transform group-hover:scale-105 group-hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-orange-500/20 backdrop-blur-sm"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {f.originalName || f.filename}
                          </p>
                          {f.size && (
                            <p className="text-xs text-gray-400 mt-1">
                              {(f.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          )}
                        </div>
                        <svg className="w-6 h-6 text-orange-500 group-hover:animate-bounce group-hover:text-orange-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Enhanced External Store Links */}
            {g.appStoreLinks && Object.values(g.appStoreLinks).some(Boolean) && (
              <div className="backdrop-blur-md bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-3xl p-8 border border-slate-600/50 shadow-2xl shadow-slate-900/50 hover:shadow-xl hover:shadow-slate-900/60 transition-all duration-500 animate-slide-up-stagger hover:border-slate-500/60">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center">
                  <svg className="w-6 h-6 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Available On
                </h3>
                <div className="space-y-3">
                  {Object.entries(g.appStoreLinks).map(([k, v]) =>
                    v ? (
                      <a
                        key={k}
                        href={v}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-2xl border border-orange-500/30 text-orange-300 hover:bg-gradient-to-r hover:from-orange-500/15 hover:to-orange-600/15 hover:border-orange-500/60 transition-all duration-500 text-center font-semibold hover:transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-orange-500/20 backdrop-blur-sm"
                      >
                        {k.replace(/([A-Z])/g, " $1").trim()}
                      </a>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Enhanced Back Navigation */}
        <div className="mt-20 pt-12 border-t border-slate-600/30">
          <Link 
            to="/browse" 
            className="group inline-flex items-center text-gray-400 hover:text-orange-400 text-xl transition-all duration-500 hover:transform hover:scale-105"
          >
            <div className="mr-4 p-3 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 group-hover:border-orange-500/50 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-orange-500/20 backdrop-blur-sm">
              <svg className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="font-semibold">Back to Browse Games</span>
          </Link>
        </div>
      </div>
    </div>
  );
}