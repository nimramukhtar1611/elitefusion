'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaDiscord, FaEnvelope, FaComment, FaPaperPlane } from 'react-icons/fa';
import { GiGamepad } from 'react-icons/gi';

const ContactForm = () => {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{
          backgroundImage: "url('https://www.virtuosgames.com/wp-content/uploads/2024/11/3services_hero_1920x870_APNG.png')",
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <GiGamepad className="mx-auto text-5xl text-[#B27b2b] mb-3" />
          <h2 className="text-5xl font-bold text-white font-primary">CONTACT THE TEAM</h2>
        </div>

        {/* Form Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#111] rounded-xl shadow-2xl overflow-hidden border border-gray-700"
        >
          <form 
            action="https://api.web3forms.com/submit" 
            method="POST"
            className="p-8 space-y-6"
          >
            {/* Hidden Access Key */}
            <input type="hidden" name="access_key" value="cebb77a2-34f1-4a33-b703-b6c912b85b19" />

            {/* Name Field */}
            <div className="relative">
              <label className="block text-white text-sm font-medium mb-2 flex items-center">
                <FaUser className="mr-2 text-[#B27b2b]" />
                Your Gamer Tag
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your gamer tag"
                className="w-full px-4 py-3 pl-10 bg-black border border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-[#B27b2b] focus:border-transparent text-white placeholder-gray-400"
                required
              />
              <FaUser className="absolute left-3 top-[52px] text-gray-400" />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-white text-sm font-medium mb-2 flex items-center">
                <FaEnvelope className="mr-2 text-[#B27b2b]" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 pl-10 bg-black border border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-[#B27b2b] focus:border-transparent text-white placeholder-gray-400"
                required
              />
              <FaEnvelope className="absolute left-3 top-[52px] text-gray-400" />
            </div>

            {/* Discord Field */}
            <div className="relative">
              <label className="block text-white text-sm font-medium mb-2 flex items-center">
                <FaDiscord className="mr-2 text-[#B27b2b]" />
                Discord (optional)
              </label>
              <input
                type="text"
                name="discord"
                placeholder="username#1234"
                className="w-full px-4 py-3 pl-10 bg-black border border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-[#B27b2b] focus:border-transparent text-white placeholder-gray-400"
              />
              <FaDiscord className="absolute left-3 top-[52px] text-gray-400" />
            </div>

            {/* Message Field */}
            <div className="relative">
              <label className="block text-white text-sm font-medium mb-2 flex items-center">
                <FaComment className="mr-2 text-[#B27b2b]" />
                Your Message
              </label>
              <textarea
                rows="4"
                name="message"
                placeholder="How can we help you?"
                className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-[#B27b2b] focus:border-transparent text-white placeholder-gray-400"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-bold 
              text-black bg-[#B27b2b] hover:bg-orange-600 transition-all duration-300"
            >
              <FaPaperPlane className="h-5 w-5" />
              SEND MESSAGE
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-black/50 text-center border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              Need immediate help?{' '}
              <a href="https://discord.gg/A7JVR8bh" target="_blank" className="text-[#B27b2b]hover:underline">Join our Discord</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
