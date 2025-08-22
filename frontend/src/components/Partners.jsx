import React, { useState } from 'react';

const Partners = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Arrays of partner logo URLs
  const partnerLogos1 = [
    'https://www.virtuosgames.com/wp-content/uploads/2024/08/ea.webp',
    'https://www.virtuosgames.com/wp-content/uploads/2024/08/eidos-montreal.webp',
    'https://www.virtuosgames.com/wp-content/uploads/2024/08/frontier.webp',
    'https://www.virtuosgames.com/wp-content/uploads/2024/08/guerrilla.webp',
    'https://www.virtuosgames.com/wp-content/uploads/2024/08/harmonix.webp',
    'https://www.virtuosgames.com/wp-content/uploads/2024/08/light-magic.webp',
    'https://www.virtuosgames.com/wp-content/uploads/2024/08/ubisoft.webp',
    'https://www.virtuosgames.com/wp-content/uploads/2024/08/t2.webp',
    'https://www.virtuosgames.com/wp-content/uploads/2024/11/disney.png',
    'https://www.virtuosgames.com/wp-content/uploads/2024/11/daybreak.png',
    'https://www.virtuosgames.com/wp-content/uploads/2024/11/crystal-dynamics.png',
    'https://www.virtuosgames.com/wp-content/uploads/2024/11/capcom.png',
    'https://www.virtuosgames.com/wp-content/uploads/2024/11/bethesda.png',
    'https://www.virtuosgames.com/wp-content/uploads/2024/11/activision-bliszzard.png',
  ];

  const partnerLogos2 = [
    '/wp-content/uploads/2024/11/2k.png',
    '/wp-content/uploads/2024/11/amazon.png',
    '/wp-content/uploads/2024/11/arkane.png',
    '/wp-content/uploads/2024/11/avalanche.png',
    '/wp-content/uploads/2024/11/konami.png',
    '/wp-content/uploads/2024/11/naughty-dog.png',
    '/wp-content/uploads/2024/11/sony.png',
    '/wp-content/uploads/2024/11/quantic-dream.png',
    '/wp-content/uploads/2024/11/smilegate.png',
    '/wp-content/uploads/2024/11/tencent.png',
    '/wp-content/uploads/2024/11/treyarch.png',
    '/wp-content/uploads/2024/11/wb.png',
    '/wp-content/uploads/2024/11/xbox.png',
    '/wp-content/uploads/2024/11/zynga.png',
  ];

  // Create duplicated arrays for seamless looping
  const duplicatedLogos1 = [...partnerLogos1, ...partnerLogos1];
  const duplicatedLogos2 = [...partnerLogos2, ...partnerLogos2];

  return (
    <section className="bg-[#25282A] py-28 px-0 relative overflow-hidden w-full">
      <div className="w-full mx-auto px-4">
        {/* First Marquee Row - Scrolls Left */}
        <div 
          className="marquee-container overflow-hidden relative w-full mb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="marquee-content flex items-center py-4"
            style={{ 
              animationPlayState: isHovered ? 'paused' : 'running',
            }}
          >
            {duplicatedLogos1.map((logo, index) => (
              <div 
                key={`row1-${index}`} 
                className="marquee-item mx-4 md:mx-6 transition-all duration-300 hover:scale-110 hover:brightness-125 flex-shrink-0"
                style={{ width: '120px' }}
              >
                <img
                  decoding="async"
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="w-full h-auto max-h-[100px] object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#25282A] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#25282A] to-transparent z-10"></div>
        </div>

        {/* Second Marquee Row - Scrolls Right */}
        <div 
          className="marquee-container overflow-hidden relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="marquee-content flex items-center py-4 marquee-right"
            style={{ 
              animationPlayState: isHovered ? 'paused' : 'running',
            }}
          >
            {duplicatedLogos2.map((logo, index) => (
              <div 
                key={`row2-${index}`} 
                className="marquee-item mx-4 md:mx-6 transition-all duration-300 hover:scale-110 hover:brightness-125 flex-shrink-0"
                style={{ width: '120px' }}
              >
                <img
                  decoding="async"
                  src={`https://www.virtuosgames.com${logo}`}
                  alt={`Partner ${index + 15}`}
                  className="w-full h-auto max-h-[100px] object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#25282A] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#25282A] to-transparent z-10"></div>
        </div>
      </div>

      {/* CSS for Animations */}
      <style>{`
        .marquee-container {
          position: relative;
          width: 100%;
        }

        .marquee-content {
          display: flex;
          width: max-content;
          animation: marquee 60s linear infinite;
        }

        .marquee-right {
          animation: marquee-right 30s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
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
            animation-duration: 25s;
          }
        }

        @media (max-width: 768px) {
          .marquee-item {
            width: 80px !important;
          }
          .marquee-content {
            animation-duration: 20s;
          }
        }

        @media (max-width: 480px) {
          .marquee-item {
            width: 70px !important;
          }
          .marquee-content {
            animation-duration: 15s;
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;