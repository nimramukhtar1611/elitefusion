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
    <div className="flex justify-center items-center py-8 md:min-h-screen bg-[#25282A] px-4">
      {/* Thumbnail with Play Button */}
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl rounded-xl overflow-hidden border-none lg:border-2 lg:border-gray-700">
        <img
          src={thumbnail}
          alt="Video Thumbnail"
          className="w-full h-auto object-cover"
        />
        <button
          onClick={openModal}
          className="absolute inset-0 flex items-center justify-center focus:outline-none group"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 border-4 border-gray-500 bg-white bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white group-hover:scale-110 transform transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          id="modal-bg"
          onClick={handleOutsideClick}
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 backdrop-blur-sm animate-fadeIn"
        >
          <div className="relative w-full max-w-3xl bg-black rounded-lg overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={28} />
            </button>

            {/* YouTube Embed */}
            <div className="w-full aspect-video">
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
  );
};
