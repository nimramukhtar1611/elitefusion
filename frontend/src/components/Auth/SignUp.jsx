import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FaUser, FaEnvelope, FaLock, FaGamepad, FaSteam, FaGoogle, FaDiscord } from 'react-icons/fa';
import { GiPadlock } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username required';
    if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email';
    if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setErrors({});

      try {
        const result = await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        if (result.success) {
          console.log("Registration successful:", result.user);
          setSuccess(true);
          setTimeout(() => navigate("/"), 1500);
        } else {
          setErrors({ api: result.message });
        }
      } catch (error) {
        console.error("Registration error:", error);
        setErrors({ api: "An error occurred. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      setErrors({});
      try {
        const res = await fetch('http://localhost:5000/api/auth/google-access-token-signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_token: tokenResponse.access_token })
        });
        const data = await res.json();
        if (data.success && data.token) {
          localStorage.setItem('token', data.token);
          navigate('/');
          window.location.reload(); // Reload to trigger auth check
        } else {
          setErrors({ google: data.message || 'Google sign-in failed.' });
        }
      } catch (error) {
        console.error('Google sign-in error:', error);
        setErrors({ google: 'An error occurred during Google sign-in.' });
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      setErrors({ google: 'Google Sign-In failed. Please try again.' });
      setGoogleLoading(false);
    },
  });

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center bg-[#111] rounded-xl shadow-2xl p-8 border border-orange-500/30">
          <GiPadlock className="mx-auto text-5xl text-orange-500 mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-white mb-2 font-primary">ACCOUNT CREATED!</h2>
          <p className="text-gray-300 mb-6">Welcome to Elite Fusion! Your gaming journey begins now.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-3 px-4 rounded-lg font-bold text-black bg-orange-500 hover:bg-orange-600 transition-all"
          >
            CONTINUE TO HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <FaGamepad className="mx-auto text-5xl text-orange-500 mb-3" />
          <h2 className="text-5xl font-bold text-white mb-2 font-primary">JOIN THE ARENA</h2>
          <p className="text-gray-400">Create your account and start your gaming journey</p>
        </div>

        {/* Form Container */}
        <div className="bg-[#111] rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <form onSubmit={handleSubmit} className="p-8">
            {/* API Error */}
            {errors.api && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
                <p className="text-red-300 text-sm">{errors.api}</p>
              </div>
            )}

            {/* Username Field */}
            <div className="mb-5">
              <label className="block text-white text-sm font-medium mb-2 flex items-center">
                <FaUser className="mr-2 text-orange-500" />
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-10 bg-black border ${errors.username ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400`}
                  placeholder="Choose a username"
                  required
                  disabled={isLoading}
                />
                <FaUser className="absolute left-3 top-3.5 text-gray-500" />
              </div>
              {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
            </div>

            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-white text-sm font-medium mb-2 flex items-center">
                <FaEnvelope className="mr-2 text-orange-500" />
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-10 bg-black border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400`}
                  placeholder="your@email.com"
                  required
                  disabled={isLoading}
                />
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-500" />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <label className="block text-white text-sm font-medium mb-2 flex items-center">
                <FaLock className="mr-2 text-orange-500" />
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-10 bg-black border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400`}
                  placeholder="At least 8 characters"
                  required
                  disabled={isLoading}
                />
                <FaLock className="absolute left-3 top-3.5 text-gray-500" />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2 flex items-center">
                <FaLock className="mr-2 text-orange-500" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pl-10 bg-black border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400`}
                  placeholder="Re-enter your password"
                  required
                  disabled={isLoading}
                />
                <FaLock className="absolute left-3 top-3.5 text-gray-500" />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-medium text-black bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  CREATING ACCOUNT...
                </span>
              ) : (
                'SIGN UP'
              )}
            </button>

            {/* Divider */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#111] text-gray-400">
                  OR SIGN UP WITH
                </span>
              </div>
            </div>

            {/* Social Signup Buttons */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm bg-black text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors duration-300"
                onClick={() => window.location.href = 'http://localhost:5000/api/auth/github'}
              >
                <FaSteam className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => googleLogin()}
                disabled={googleLoading}
                className={`w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm bg-black text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors duration-300 ${googleLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {googleLoading ? (
                  <svg className="animate-spin h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : <FaGoogle className="h-5 w-5" />}
              </button>
              {errors.google && <p className="col-span-3 text-center text-sm text-red-400 mt-2">{errors.google}</p>}
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm bg-black text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors duration-300"
              >
                <FaDiscord className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="px-8 py-4 bg-black text-center border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 hover:text-orange-400 font-medium transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;