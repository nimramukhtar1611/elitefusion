// src/pages/UploadGames.jsx
import React, { useState } from 'react';
import { FaUpload, FaImage, FaYoutube, FaCamera, FaFile, FaDollarSign } from 'react-icons/fa';
import { GiConsoleController } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { ThemeProvider } from '../contexts/ThemeContext.jsx';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

const UploadGames = () => {
  const { user } = useAuth(); // server reads real author from JWT; no need to send author fields
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    projectUrl: '',
    shortDescription: '',
    classification: 'games',
    projectType: 'downloadable',
    releaseStatus: 'released',
    pricing: 'free',
    suggestedDonation: '',
    coverImage: null,
    gameplayVideo: '',
    screenshots: [],
    gameFiles: [],
    description: '',
    genre: '',
    tags: '',
    isLudumDare: false,
    ludumDareTag: '',
    hasAI: 'no',
    appStoreLinks: {
      steam: '',
      appleAppStore: '',
      googlePlay: '',
      amazonAppStore: '',
      windowsStore: ''
    },
    customNoun: '',
    community: 'comments',
    visibility: 'draft'
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      if (name === 'coverImage') {
        setFormData(prev => ({ ...prev, coverImage: files[0] || null }));
      } else if (name === 'screenshots') {
        setFormData(prev => ({ ...prev, screenshots: [...prev.screenshots, ...Array.from(files)] }));
      } else if (name === 'gameFiles') {
        setFormData(prev => ({ ...prev, gameFiles: [...prev.gameFiles, ...Array.from(files)] }));
      }
    } else if (name.startsWith('appStore_')) {
      const storeName = name.replace('appStore_', '');
      setFormData(prev => ({
        ...prev,
        appStoreLinks: { ...prev.appStoreLinks, [storeName]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (uploadError) setUploadError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadError(null);

    try {
      const fd = new FormData();

      // primitive fields
      fd.append('title', formData.title);
      if (formData.projectUrl) fd.append('projectUrl', formData.projectUrl);
      if (formData.shortDescription) fd.append('shortDescription', formData.shortDescription);
      fd.append('classification', formData.classification);
      fd.append('projectType', formData.projectType);
      fd.append('releaseStatus', formData.releaseStatus);
      fd.append('pricing', formData.pricing);
      if (formData.suggestedDonation) fd.append('suggestedDonation', formData.suggestedDonation);
      if (formData.gameplayVideo) fd.append('gameplayVideo', formData.gameplayVideo);
      if (formData.description) fd.append('description', formData.description);
      if (formData.genre) fd.append('genre', formData.genre);
      if (formData.tags) fd.append('tags', formData.tags);
      fd.append('isLudumDare', String(formData.isLudumDare));
      if (formData.ludumDareTag) fd.append('ludumDareTag', formData.ludumDareTag);
      fd.append('hasAI', formData.hasAI);
      fd.append('appStoreLinks', JSON.stringify(formData.appStoreLinks));
      fd.append('customNoun', formData.customNoun || 'game');
      fd.append('community', formData.community);
      fd.append('visibility', formData.visibility);

      // files — exact names, no brackets; repeat the same key for arrays
      if (formData.coverImage) fd.append('coverImage', formData.coverImage);
      formData.screenshots.forEach(f => fd.append('screenshots', f));
      formData.gameFiles.forEach(f => fd.append('gameFiles', f));

      // Optional debug:
      // for (const [k, v] of fd.entries()) console.log('FD:', k, v?.name ?? v);

      const res = await fetch(`${API_BASE}/games/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`, // DON'T set Content-Type for FormData
        },
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      // success → go to your jam/games page (adjust route if needed)
      navigate('/game-james');
    } catch (err) {
      setUploadError(err.message || 'Network error. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeScreenshot = (index) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  const removeGameFile = (index) => {
    setFormData(prev => ({
      ...prev,
      gameFiles: prev.gameFiles.filter((_, i) => i !== index)
    }));
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <GiConsoleController className="mx-auto text-5xl text-orange-500 mb-3" />
            <h1 className="text-4xl font-bold font-primary text-white mb-2">CREATE A NEW PROJECT</h1>
            <p className="text-gray-400">Share your amazing game with the world!</p>
          </div>

          {/* Payment Notice */}
          <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 mb-6">
            <p className="text-yellow-300 text-sm">
              You don't have payment configured. If you set a minimum price above $0 no one will be able to download your project.{' '}
              <button type="button" className="text-orange-500 hover:text-orange-400 underline">Edit account</button>
            </p>
          </div>

          {/* Quality Guidelines Notice */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-8">
            <p className="text-blue-300 text-sm">
              Make sure everyone can find your page. Review our{' '}
              <button type="button" className="text-orange-500 hover:text-orange-400 underline">quality guidelines</button>
              {' '}before posting your project.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Error Display */}
            {uploadError && (
              <div className="bg-red-900/50 border border-red-500 rounded-lg p-4">
                <p className="text-red-300">{uploadError}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Enter your game title"
                    required
                    disabled={isUploading}
                  />
                </div>

                {/* Project URL */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Project URL</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-600 bg-gray-800 text-gray-400 text-sm">
                      https://elitesfusion.com/
                    </span>
                    <input
                      type="text"
                      name="projectUrl"
                      value={formData.projectUrl}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 bg-[#111] border border-gray-600 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="your-game-url"
                      disabled={isUploading}
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Short description or tagline</label>
                  <p className="text-gray-400 text-sm mb-2">
                    Shown when we link to your project. Avoid duplicating your project's title.
                  </p>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Optional"
                    disabled={isUploading}
                  />
                </div>

                {/* Classification */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Classification</label>
                  <p className="text-gray-400 text-sm mb-2">What are you uploading?</p>
                  <select
                    name="classification"
                    value={formData.classification}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                    disabled={isUploading}
                  >
                    <option value="games">Games — A piece of software you can play</option>
                    <option value="tools">Tools — Engines, assets, add-ons</option>
                    <option value="comics">Comics — Visual stories</option>
                    <option value="books">Books — Novels, tutorials, guides</option>
                  </select>
                </div>

                {/* Kind of Project */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Kind of project</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                    disabled={isUploading}
                  >
                    <option value="downloadable">Downloadable — You only have files to be downloaded</option>
                    <option value="playable">Playable in browser — Runs in web browser</option>
                    <option value="external">External link — Links to other website</option>
                  </select>
                </div>

                {/* Release Status */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Release status</label>
                  <select
                    name="releaseStatus"
                    value={formData.releaseStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                    disabled={isUploading}
                  >
                    <option value="released">Released — Project is complete, but might receive some updates</option>
                    <option value="in_development">In development — Project is in active development</option>
                    <option value="prototype">Prototype — Early development/proof of concept</option>
                    <option value="on_hold">On hold — Development is paused</option>
                    <option value="canceled">Canceled — Development has stopped</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Cover Image */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <FaImage className="mr-2 text-orange-500" />
                    Upload Cover Image
                  </label>

                  <label
                    htmlFor="coverImageInput"
                    className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-orange-500 transition-colors cursor-pointer block"
                  >
                    {formData.coverImage ? (
                      <div className="space-y-2">
                        <img
                          src={URL.createObjectURL(formData.coverImage)}
                          alt="Cover preview"
                          className="max-h-32 mx-auto rounded"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData(prev => ({ ...prev, coverImage: null }));
                          }}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <FaUpload className="mx-auto text-2xl text-gray-400 mb-2" />
                        <p className="text-gray-400 text-sm">Click to upload or drag & drop</p>
                      </div>
                    )}
                  </label>
                  <input
                    id="coverImageInput"
                    type="file"
                    name="coverImage"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                  />

                  <p className="text-gray-500 text-xs mt-1">
                    Required (Minimum: 315x250, Recommended: 630x500). Used when linking to your project.
                  </p>
                </div>

                {/* Gameplay Video */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <FaYoutube className="mr-2 text-orange-500" />
                    Gameplay video or trailer
                  </label>
                  <p className="text-gray-400 text-sm mb-2">Provide a link to YouTube or Vimeo.</p>
                  <input
                    type="url"
                    name="gameplayVideo"
                    value={formData.gameplayVideo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="e.g. https://www.youtube.com/watch?v=..."
                    disabled={isUploading}
                  />
                </div>

                {/* Screenshots */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <FaCamera className="mr-2 text-orange-500" />
                    Screenshots
                  </label>
                  <p className="text-gray-400 text-sm mb-2">
                    Upload 3–5 for best results. These appear on your game's page.
                  </p>

                  <div className="space-y-2">
                    {formData.screenshots.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                        <span className="text-sm text-gray-300">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeScreenshot(index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <label htmlFor="screenshotsInput" className="cursor-pointer inline-block">
                    <div className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center">
                      Add screenshots
                    </div>
                  </label>
                  <input
                    id="screenshotsInput"
                    type="file"
                    name="screenshots"
                    onChange={handleChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaDollarSign className="mr-2 text-orange-500" />
                Pricing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="pricing"
                    value="free"
                    checked={formData.pricing === 'free'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500"
                    disabled={isUploading}
                  />
                  <span className="text-white">$0 or donate</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="pricing"
                    value="paid"
                    checked={formData.pricing === 'paid'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500"
                    disabled={isUploading}
                  />
                  <span className="text-white">Paid</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="pricing"
                    value="no_payments"
                    checked={formData.pricing === 'no_payments'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500"
                    disabled={isUploading}
                  />
                  <span className="text-white">No payments</span>
                </label>
              </div>

              {formData.pricing === 'free' && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">
                    Users will be asked for a donation before download (they can skip and download for free).
                  </p>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Suggested donation — Default donation amount
                    </label>
                    <input
                      type="number"
                      name="suggestedDonation"
                      value={formData.suggestedDonation}
                      onChange={handleChange}
                      className="w-32 px-3 py-2 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                      placeholder="$2.00"
                      step="0.01"
                      min="0"
                      disabled={isUploading}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Upload Files Section */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FaFile className="mr-2 text-orange-500" />
                Uploads
              </h3>

              <div className="space-y-4">
                {formData.gameFiles.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="flex items-center justify-between bg-gray-800 p-3 rounded">
                    <span className="text-gray-300">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      type="button"
                      onClick={() => removeGameFile(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="flex flex-wrap gap-4">
                  <label htmlFor="gameFilesInput" className="cursor-pointer">
                    <div className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors inline-block">
                      Upload files
                    </div>
                  </label>
                  <input
                    id="gameFilesInput"
                    type="file"
                    name="gameFiles"
                    onChange={handleChange}
                    multiple
                    className="hidden"
                    disabled={isUploading}
                  />

                  <button
                    type="button"
                    disabled
                    className="bg-blue-600/50 text-white/70 px-6 py-3 rounded-lg cursor-not-allowed"
                    title="Coming soon"
                  >
                    Choose from Dropbox
                  </button>

                  <button
                    type="button"
                    disabled
                    className="border border-gray-600 text-gray-400 px-6 py-3 rounded-lg cursor-not-allowed"
                    title="Coming soon"
                  >
                    Add External file
                  </button>
                </div>

                <p className="text-gray-500 text-sm">
                  File size limit: 1 GB. <button type="button" className="text-orange-500 hover:text-orange-400">Contact us</button> if you need more space.
                </p>
              </div>
            </div>

            {/* Details Section */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Details</h3>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Description — This will make up the content of your game page.
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-4 py-3 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 resize-vertical"
                  placeholder="Describe your game, its features, gameplay, story..."
                  disabled={isUploading}
                />
              </div>
            </div>

            {/* Genre Section */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Genre</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">
                    Select the category that best describes your game. You can pick additional genres with tags below.
                  </p>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                    disabled={isUploading}
                  >
                    <option value="">No genre</option>
                    <option value="action">Action</option>
                    <option value="adventure">Adventure</option>
                    <option value="puzzle">Puzzle</option>
                    <option value="strategy">Strategy</option>
                    <option value="rpg">RPG</option>
                    <option value="simulation">Simulation</option>
                    <option value="sports">Sports</option>
                    <option value="racing">Racing</option>
                    <option value="platformer">Platformer</option>
                    <option value="shooter">Shooter</option>
                    <option value="fighting">Fighting</option>
                    <option value="visual-novel">Visual Novel</option>
                    <option value="interactive-fiction">Interactive Fiction</option>
                    <option value="card-game">Card Game</option>
                    <option value="board-game">Board Game</option>
                    <option value="educational">Educational</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Tags — Tips for choosing tags
                  </label>
                  <p className="text-gray-400 text-sm mb-2">
                    Any other keywords someone might search to find your game. Max of 10.
                    Avoid using the genre or platforms provided above.
                  </p>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Click to view options, type to filter or enter custom tag"
                    disabled={isUploading}
                  />
                </div>

                {/* Ludum Dare */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="ludumDare"
                      name="isLudumDare"
                      checked={formData.isLudumDare}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange-500"
                      disabled={isUploading}
                    />
                    <label htmlFor="ludumDare" className="text-white">Ludum Dare 57 submission?</label>
                  </div>

                  {formData.isLudumDare && (
                    <div>
                      <input
                        type="text"
                        name="ludumDareTag"
                        value={formData.ludumDareTag}
                        onChange={handleChange}
                        className="w-48 px-3 py-2 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="Add Ludum Dare tag"
                        disabled={isUploading}
                      />
                    </div>
                  )}
                </div>

                {/* AI Generation Disclosure */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">NEW</span>
                    <span className="text-blue-300 font-medium">AI generation disclosure</span>
                    <button type="button" className="text-blue-400 hover:text-blue-300">Learn more →</button>
                  </div>
                  <p className="text-blue-200 text-sm mb-3">
                    Please disclose if this project contains content produced by generative AI tools.
                  </p>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="hasAI"
                        value="yes"
                        checked={formData.hasAI === 'yes'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-500"
                        disabled={isUploading}
                      />
                      <span className="text-blue-200">Yes — This project contains the output of Generative AI</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="hasAI"
                        value="no"
                        checked={formData.hasAI === 'no'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-500"
                        disabled={isUploading}
                      />
                      <span className="text-blue-200">No — This project does not contain the output of Generative AI</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* App Store Links */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-white mb-6">App store links</h3>
              <p className="text-gray-400 text-sm mb-6">If your project is available on any other stores we'll link to it.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.appStoreLinks).map(([store, value]) => (
                  <div key={store}>
                    <label className="block text-white text-sm font-medium mb-2 capitalize">
                      {store.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type="url"
                      name={`appStore_${store}`}
                      value={value}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder={`${store} URL`}
                      disabled={isUploading}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Noun */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Custom noun</h3>
              <p className="text-gray-400 text-sm mb-4">
                You can change how ElitesFusion refers to your project by providing a custom noun.
                Leave blank to default to 'game'.
              </p>
              <input
                type="text"
                name="customNoun"
                value={formData.customNoun}
                onChange={handleChange}
                className="w-64 px-4 py-3 bg-[#111] border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Optional"
                disabled={isUploading}
              />
            </div>

            {/* Community */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Community</h3>
              <p className="text-gray-400 text-sm mb-4">Build a community for your project by letting people post to your page.</p>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="community"
                    value="disabled"
                    checked={formData.community === 'disabled'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500"
                    disabled={isUploading}
                  />
                  <span className="text-white">Disabled</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="community"
                    value="comments"
                    checked={formData.community === 'comments'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500"
                    disabled={isUploading}
                  />
                  <span className="text-white">Comments — Add a nested comment thread to the bottom of the project page</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="community"
                    value="discussion"
                    checked={formData.community === 'discussion'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500"
                    disabled={isUploading}
                  />
                  <span className="text-white">Discussion board — Add a dedicated community page with categories, threads, replies & more</span>
                </label>
              </div>
            </div>

            {/* Visibility & Access */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Visibility & access</h3>
              <p className="text-gray-400 text-sm mb-4">
                Use Draft to review your page before making it public.{' '}
                <button type="button" className="text-orange-500 hover:text-orange-400 underline">Learn more about access modes</button>
              </p>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="draft"
                    checked={formData.visibility === 'draft'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500"
                    disabled={isUploading}
                  />
                  <span className="text-white">Draft — Only those who can edit the project can view the page</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="restricted"
                    checked={formData.visibility === 'restricted'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500"
                    disabled={isUploading}
                  />
                  <span className="text-white">Restricted — Only owners & authorized people can view the page</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={formData.visibility === 'public'}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500"
                    disabled={isUploading}
                  />
                  <span className="text-white">Public — Anyone can view the page, you can enable this after you've saved</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-700 pt-8">
              <button
                type="submit"
                disabled={isUploading}
                className={`w-full sm:w-auto px-8 py-4 rounded-lg font-bold text-white transition-all duration-300 ${
                  isUploading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-orange-500/30'
                }`}
              >
                {isUploading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SAVING & UPLOADING...
                  </span>
                ) : (
                  'SAVE & VIEW PAGE'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UploadGames;
