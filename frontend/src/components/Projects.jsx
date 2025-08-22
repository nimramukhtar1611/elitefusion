import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import logoImg from '../assets/images/logo.png';
import menuIcon from '../assets/images/menuImg.webp';
import bgImg from '../assets/images/menuBg.webp';
// Import your hover background images
import aboutBg from '../assets/images/about-bg.webp';
import servicesBg from '../assets/images/services-bg.webp';
import worksBg from '../assets/images/works-bg.webp';
import portfolioBg from '../assets/images/portfolio-bg.webp'; 
import careersBg from '../assets/images/menuBg.webp';
import newsBg from '../assets/images/news-bg.webp';
import eventsBg from '../assets/images/events-bg.webp';
import contactBg from '../assets/images/menuBg.webp';

const Navbar = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentBg, setCurrentBg] = useState(bgImg);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  // Preload all background images
  useEffect(() => {
    const images = [aboutBg, servicesBg, worksBg, portfolioBg, careersBg, newsBg, eventsBg, contactBg];
    images.forEach(img => {
      new Image().src = img;
    });
  }, []);

  const menuItems = [
    { title: 'About Us', bg: aboutBg },
    { title: 'Our Services', bg: servicesBg },
    { title: 'Our Works', bg: worksBg },
    { title: 'Portfolio', bg: portfolioBg }, // Added Portfolio item
    { title: 'Careers', bg: careersBg },
    { title: 'News', bg: newsBg },
    { title: 'Events', bg: eventsBg },
    { title: 'Contact Us', bg: contactBg }
  ];

  const socialLinks = [
    { icon: Facebook, url: '#' },
    { icon: Instagram, url: '#' },
    { icon: Linkedin, url: '#' },
    { icon: Youtube, url: '#' }
  ];

  const handleMouseEnter = (bg) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setCurrentBg(bg);
  };

  const handleMouseLeave = () => {
    // Add a small delay before reverting to prevent flickering
    const timeout = setTimeout(() => {
      setCurrentBg(bgImg);
    }, 100);
    setHoverTimeout(timeout);
  };

  return (
    <>
      <header className="w-full px-6 py-4 md:py-6 flex justify-between items-center flex-wrap bg-transparent font-secondary absolute top-0 left-0 z-50 text-white">
        {/* ... (keep your existing header code) ... */}
      </header>

      {/* Full-Screen Menu Panel */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full z-[999] text-white overflow-hidden"
          style={{
            backgroundImage: `url(${currentBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background-image 0.3s ease-in-out'
          }}
        >
          {/* Close Button */}
          <div className="absolute top-6 right-6 z-[1000]">
            <button
              onClick={() => {
                setMenuOpen(false);
                setCurrentBg(bgImg);
              }}
              className="text-4xl font-bold hover:text-[#FFC695] transition-colors duration-300"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          {/* Main Content Area */}
          <div className="container mx-auto h-full flex flex-col">
            {/* Logo at top center */}
            <div className="flex justify-center pt-5">
              <img
                src={logoImg}
                alt="Virtuos Logo"
                className="h-16 w-auto transition-opacity hover:opacity-90"
              />
            </div>

            {/* Menu Links */}
            <div className="flex-grow flex items-start justify-start">
              <nav className="w-full max-w-7xl mx-auto font-primary">
                <ul className="space-y-6 md:space-y-8">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={`#${item.title.toLowerCase().replace(' ', '-')}`}
                        className="block text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider hover:text-[#FFC695] transition-colors duration-300"
                        onMouseEnter={() => handleMouseEnter(item.bg)}
                        onMouseLeave={handleMouseLeave}
                        onFocus={() => handleMouseEnter(item.bg)}
                        onBlur={handleMouseLeave}
                        aria-label={item.title}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Footer with social links */}
            <div className="pb-10 px-6">
              <div className="flex flex-col md:flex-row justify-end items-center gap-6">
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className="text-white hover:text-[#FFC695] transition-colors"
                        aria-label={Icon.displayName}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;