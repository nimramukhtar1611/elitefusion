import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#25282A] text-white pt-20 pb-12 px-6 sm:px-8 lg:px-12 font-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 uppercase font-primary tracking-tight">
              Elite <span className="text-[#b27b2b]">Fusion</span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-md font-secondary">
              Leading the future of gaming innovation with cutting-edge technology and creative solutions.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="bg-[#303336] p-3 rounded-full  hover:bg-[#b27b2b] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-[#303336] p-3 rounded-full hover:bg-[#b27b2b] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-[#303336] p-3 rounded-full hover:bg-[#b27b2b] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-[#303336] p-3 rounded-full hover:bg-[#b27b2b] transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-primary font-bold mb-5 uppercase tracking-wider border-b border-[#b27b2b] pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 ">
              <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-400 hover:text-[#b27b2b] transition-colors flex items-center">
                <span className="w-2 font-secondary h-2 bg-[#b27b2b] rounded-full mr-3"></span>
                Home
              </Link></li>
              <li><Link to="/our-services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
 className="text-gray-400 hover:text-[#b27b2b] transition-colors flex items-center font-secondary">
                <span className="w-2 h-2 bg-[#b27b2b] rounded-full mr-3"></span>
                Services
              </Link></li>
              <li><Link to="/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}  className="text-gray-400 hover:text-[#BA7A2B] transition-colors flex items-center">
                <span className="w-2 h-2 bg-[#b27b2b] rounded-full font-secondary mr-3"></span>
                Portfolio
              </Link></li>
              <li><Link to="/game-james" className="text-gray-400 hover:text-[#BA7A2B] transition-colors flex items-center">
                <span className="w-2 h-2 bg-[#b27b2b] rounded font-secondary-full mr-3"></span>
                Game Jam
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-5 uppercase font-primary tracking-wider border-b border-[#b27b2b] pb-2 inline-block">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-[#b27b2b] mt-1 flex-shrink-0" size={18} />
                <p className="text-gray-400 font-secondary">123 Gaming Street, Tech City</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-[#b27b2b] flex-shrink-0" size={18} />
                <p className="text-gray-400 font-secondary">info@elitefusion.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-[#b27b2b] flex-shrink-0" size={18} />
                <p className="text-gray-400 font-secondary">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#303336] my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0 font-secondary">
            © {new Date().getFullYear()} Elite Fusion Company. All rights reserved.
          </p>
          <div className="flex space-x-6 font-secondary">
            <a href="#" className="text-gray-500 hover:text-[#b27b2b] text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-[#b27b2b] text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-[#b27b2b] text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;