import React, { useState } from 'react';
import thumbnail from '../assets/images/videoImg.webp';
import { X } from 'lucide-react';
import video from '../assets/images/video.mp4';

export const Video = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-bg') closeModal();
  };

  return (
    <div className="relative w-full py-16 md:py-28 bg-[#25282A] px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* Thumbnail with Play Button */}
        <div className="relative w-full rounded-xl overflow-hidden cursor-pointer group">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-orange-500/10 group-hover:opacity-30 opacity-0 transition-opacity duration-500 rounded-xl"></div>

          <img
            src={thumbnail}
            alt="Video Thumbnail"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Play button with pulse animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={openModal}
              className="focus:outline-none group/button"
              aria-label="Play video"
            >
              <div className="relative">
                {/* Pulse ring animation */}
                <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-ping opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>

                {/* Main play button */}
                <div className="w-20 h-20 md:w-24 md:h-24 border-4 border-white/50 bg-black/30 group-hover/button:bg-black/50 transition-all duration-300 rounded-full flex items-center justify-center backdrop-blur-md shadow-2xl">
                  <svg
                    className="w-10 h-10 md:w-12 md:h-12 text-white group-hover/button:scale-110 transform transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Modal - Full Screen Video */}
        {isOpen && (
          <div
            id="modal-bg"
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-black/95 flex justify-center items-center z-[100] p-4 backdrop-blur-md animate-fadeIn"
          >
            <div className="relative w-full max-w-6xl">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-14 right-0 md:-right-14 text-white hover:text-orange-400 z-10 p-2 transition-colors duration-200"
              >
                <X size={36} strokeWidth={2} />
              </button>

              {/* Local Video Player */}
              <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-xl">
                <video
                  src={video}
                  controls
                  autoPlay
                  preload="auto"
                  className="w-full h-full rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
