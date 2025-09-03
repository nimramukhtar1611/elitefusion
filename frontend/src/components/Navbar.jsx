import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';
import menuIcon from '../assets/images/menuImg.webp';
import bgImg from '../assets/images/menuBg.jpg';
// hover background images
import aboutBg from '../assets/images/aboutBg.jpg';
import servicesBg from '../assets/images/serviceBg.jpg';
import worksBg from '../assets/images/ourWorkBg.jpg';
import careersBg from '../assets/images/ourCareer.jpg';
import newsBg from '../assets/images/news-bg.webp';
import portfolioBg from '../assets/images/ourPortfolio.jpg';
import eventsBg from '../assets/images/events-bg.webp';
import jams from '../assets/images/jams.jpg'
import contactBg from '../assets/images/contactBg.jpg';

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Dribbble,
  Mail,
} from 'lucide-react';

const Navbar = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentBg, setCurrentBg] = useState(bgImg);

  // Menu items and background images
  const menuItems = [
    { title: 'About Us', bg: aboutBg, href: '/about-us' },
    { 
      title: 'Our Services', 
      bg: servicesBg,
      href: '/our-services',
      submenu: [
        { title: 'Game Development', href: '/game-development' },
        { title: 'Engineering', href: '/engineering' },
        { title: 'Art Production', href: '/artproduction' },
      ]
    },
    { title: 'Our Works', bg: worksBg, href: '/our-work' },
    { title: 'Portfolio', bg: portfolioBg, href: '/portfolio' },
    { title: 'Careers', bg: careersBg, href: '/careers' },
    // { title: 'News', bg: newsBg, href: '/news' },
    { title: 'Game James', bg: jams, href: '/game-james' },
    // { title: 'Events', bg: eventsBg, href: '/events' },
    { title: 'Contact Us', bg: contactBg, href: '/contact-us' },
    { title: 'Developer Logs', bg: contactBg, href: '/devlogs' },
    { title: 'Dashboard', bg: eventsBg, href: '/creator-dashboard' },
    { title: 'Feed', bg: eventsBg, href: '/feed-page' },
    { title: 'Sign-Up', bg: contactBg, href: '/signup' },
  ];

  // Prevent background scroll when menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup if component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="w-full px-6 sm:mt-[-5px] md:mt-[-20px] py-4 md:py-6 flex justify-between items-center flex-wrap bg-transparent font-secondary absolute top-0 left-0 z-50 text-white">
        {/* Menu Button */}
        <div className="flex items-center gap-2">
          <button onClick={() => setMenuOpen(true)} className="w-8 h-8 md:w-10 md:h-10">
            <img src={menuIcon} alt="Menu" className="w-full h-full object-contain" />
          </button>
          <span className="text-sm md:text-base font-semibold tracking-wide uppercase text-white">
            Menu
          </span>
        </div>

        {/* Logo - Changed to Link */}
        <div className="flex-grow flex justify-center md:ml-28">
          <Link to="/">
            <img src={logoImg} alt="Virtuos Logo" className="h-20 md:h-32 object-contain" />
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 text-sm md:text-base font-medium">
          {/* Languages */}
          <div className="relative">
            <span className="uppercase text-white">English</span>
          </div>
          {/* Contact Button - Changed to Link */}
          <Link
            to="/contact-us"
            className="hidden md:inline-block text-[#B27b2b] uppercase text-sm md:text-base font-semibold px-5 py-2 hover:opacity-75 transition tracking-wide"
            style={{ textShadow: '0 0 12px #ffc695' }}
          >
            Contact Us
          </Link>
        </div>
      </header>

      {/* Full-Screen Menu Panel */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full z-[999] text-white"
          style={{
            backgroundImage: `url(${currentBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background-image 0.5s ease-in-out'
          }}
        >
          {/* Close Button */}
          <div className="absolute top-6 right-6 z-50">
            <button
              onClick={() => {
                setMenuOpen(false);
                setCurrentBg(bgImg); 
              }}
              className="text-4xl font-bold hover:text-[#B27b2b] transition duration-300"
            >
              &times;
            </button>
          </div>

          {/* Main Content Area */}
          <div className="container mx-auto h-full flex flex-col px-6 md:px-12 overflow-y-auto">
            {/* Logo at top center - Changed to Link */}
            <div className="flex justify-center pt-5">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <img
                  src={logoImg}
                  alt="Virtuos Logo"
                  className="h-28 w-auto"
                />
              </Link>
            </div>

            {/* Menu Links */}
            <div className="flex-grow flex items-start justify-between">
              <nav className="w-1/2 max-w-7xl mx-auto font-primary">
                <ul className="space-y-6 md:space-y-8">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="relative group"
                      onMouseEnter={() => setCurrentBg(item.bg)}
                      onMouseLeave={() => setCurrentBg(bgImg)}
                    >
                      <Link
                        to={item.href}
                        className="block text-2xl md:text-4xl lg:text-4xl font-bold uppercase tracking-wider hover:text-[#BA7A2B] transition duration-300"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                      {item.submenu && (
                        <ul className="absolute left-full top-0 ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 max-w-[600px] bg-transparent whitespace-nowrap">
                          {item.submenu.map((subitem, subindex) => (
                            <li
                              key={subindex}
                              onMouseEnter={() => setCurrentBg(servicesBg)}
                              onMouseLeave={() => setCurrentBg(item.bg)}
                            >
                              <Link
                                to={subitem.href}
                                className="block px-6 py-3 text-3xl font-semibold uppercase tracking-wider hover:text-[#BA7A2B] transition duration-300"
                                onClick={() => setMenuOpen(false)}
                              >
                                {subitem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="w-1/2 max-w-7xl mx-auto">
                <img
                  src={currentBg}
                  alt="Menu Background"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>

            {/* Footer with social links */}
            <div className="pb-10 px-6">
              <div className="flex flex-col md:flex-row justify-end items-center gap-6">
                <div className="flex gap-4">
                  <a href="#" className="text-white hover:text-[#BA7A2B] transition" aria-label="Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white hover:text-[#BA7A2B] transition" aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white hover:text-[#BA7A2B] transition" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white hover:text-[#BA7A2B] transition" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white hover:text-[#BA7A2B] transition" aria-label="GitHub">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white hover:text-[#BA7A2B] transition" aria-label="YouTube">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white hover:text-[#BA7A2B] transition" aria-label="Dribbble">
                    <Dribbble className="w-5 h-5" />
                  </a>
                  <a href="mailto:example@email.com" className="text-white hover:text-[#BA7A2B] transition" aria-label="Email">
                    <Mail className="w-5 h-5" />
                  </a>
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