import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      isVerified: user.isVerified
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
};

// Helper function to set cookie
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000 // 1 hour
  });
};

// Register user
export const registerUser = async (req, res) => {
  try {
    console.log('Registration Request Body:', req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Request body is empty",
        solution: "Ensure you're sending JSON with Content-Type: application/json"
      });
    }

    const { username, email, password, confirmPassword } = req.body;

    // Validate all required fields exist
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        requiredFields: ["username", "email", "password", "confirmPassword"],
        receivedFields: Object.keys(req.body)
      });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email: email.toLowerCase() },
        { username: username }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: existingUser.email === email.toLowerCase() 
          ? "Email already exists" 
          : "Username already exists"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      isVerified: false
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser);
    setTokenCookie(res, token);

    return res.status(201).json({ 
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isVerified: newUser.isVerified
      }
    });

  } catch (err) {
    console.error("Registration Error Details:", {
      error: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString(),
      requestBody: req.body
    });
    
    return res.status(500).json({ 
      success: false,
      message: "Registration failed",
      errorDetails: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Sign in user -  handle both username and email
export const signInUser = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const { username, email, password } = req.body;
    const loginField = username || email; // Accept either username or email

    if (!loginField || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide username/email and password" 
      });
    }

    // Find user by email OR username
    const user = await User.findOne({
      $or: [
        { email: loginField.toLowerCase() },
        { username: loginField }
      ]
    });

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Check if user is OAuth user (no password)
    if (!user.password && (user.googleId || user.githubId)) {
      return res.status(400).json({
        success: false,
        message: "Please sign in using the OAuth method you used to register"
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Generate token
    const token = generateToken(user);
    setTokenCookie(res, token);

    // Prepare user data (remove sensitive info)
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
      profilePicture: user.profilePicture
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userData
    });
  
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ 
      success: false,
      message: err.message || "Server error during authentication" 
    });
  }
};

// Logout user
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  res.status(200).json({ 
    success: true,
    message: "Logged out successfully" 
  });
};

// Get user data
export const getUserData = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        status: "error", 
        message: "User not found" 
      });
    }

    return res.status(200).json({ 
      success: true,
      status: "ok", 
      data: user 
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        status: "error", 
        message: "Token expired" 
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        status: "error", 
        message: "Invalid token" 
      });
    }
    console.error("Server error:", error);
    return res.status(500).json({ 
      success: false,
      status: "error", 
      message: "Internal server error" 
    });
  }
};