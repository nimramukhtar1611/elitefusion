import React, { useState } from 'react';

// Import images from icons folder
import bird from '../assets/icons/bird.webp';
import cryengine3 from '../assets/icons/cryengine3.webp';
import foxEngine from '../assets/icons/fox-engine.webp';
import frostbite from '../assets/icons/frostbite.webp';
import guerrilla from '../assets/icons/guerrilla.webp';
import marmalade from '../assets/icons/marmalade.webp';
import unity from '../assets/icons/unity.webp';
import unrealEngine4 from '../assets/icons/unreal-engine-4.webp';

const images = [
  { src: bird, alt: 'Bird' },
  { src: foxEngine, alt: 'Fox Engine' },
  { src: cryengine3, alt: 'CryEngine 3' },
  { src: unrealEngine4, alt: 'Unreal Engine 4' },
  { src: unity, alt: 'Unity' },
  { src: guerrilla, alt: 'Guerrilla' },
  { src: frostbite, alt: 'Frostbite' },
  { src: marmalade, alt: 'Marmalade' },
];

const GameEngines = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState('forward');

  // Duplicate images for seamless scrolling
  const duplicatedImages = [...images, ...images];

  // Toggle direction on button click
  const toggleDirection = () => {
    setDirection((prev) => (prev === 'forward' ? 'backward' : 'forward'));
  };

  return (
    <section className="bg-[#25282A] py-20 px-0 relative overflow-hidden w-full">
      <div className="w-full mx-auto px-4">
        <p className="text-center text-white font-semibold mb-8 font-secondary">
          We’re experts in leading game engines,<br />
          and readily adaptable to your proprietary engines.
        </p>

        <div
          className="marquee-container overflow-hidden relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`marquee-content flex items-center py-4 ${
              direction === 'backward' ? 'marquee-backward' : ''
            }`}
            style={{
              animationPlayState: isHovered ? 'paused' : 'running',
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="marquee-item mx-4 md:mx-6 transition-all duration-300 hover:scale-110 hover:brightness-125 flex-shrink-0"
                style={{ width: '120px' }}
              >
                <img
                  decoding="async"
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto max-h-[100px] object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#25282A] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#25282A] to-transparent z-10"></div>
        </div>
      </div>

      <style>{`
        .marquee-container {
          position: relative;
          width: 100%;
        }

        .marquee-content {
          display: flex;
          width: max-content;
          animation: marquee-forward 40s linear infinite;
        }

        .marquee-backward {
          animation: marquee-backward 40s linear infinite;
        }

        @keyframes marquee-forward {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-backward {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .marquee-item {
          flex: 0 0 auto;
        }

        @media (max-width: 1024px) {
          .marquee-item {
            width: 100px !important;
            margin: 0 4px !important;
          }
          .marquee-content {
            animation-duration: 30s !important;
          }
        }

        @media (max-width: 768px) {
          .marquee-item {
            width: 80px !important;
          }
          .marquee-content {
            animation-duration: 25s !important;
          }
        }

        @media (max-width: 480px) {
          .marquee-item {
            width: 70px !important;
          }
          .marquee-content {
            animation-duration: 20s !important;
          }
        }
      `}</style>
    </section>
  );
};

export default GameEngines;
