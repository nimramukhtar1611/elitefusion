// routes/authRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';

import User from '../models/User.js';
import {
  registerUser,
  signInUser,
  getUserData,
  logout,
} from '../controllers/authController.js';
import { getProfile } from '../controllers/userController.js';

const router = express.Router();

/* Helpers */
const generateToken = (user) => jwt.sign(
  { id: user._id, email: user.email, isVerified: user.isVerified },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
);

const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  });
};

const createOAuthClient = () => {
  if (!process.env.GOOGLE_CLIENT_ID) throw new Error('GOOGLE_CLIENT_ID is not configured');
  return new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
};

const validateGoogleSignIn = (req, res, next) => {
  if (!req.body.credential) {
    return res.status(400).json({ success: false, message: 'Missing Google credential token' });
  }
  next();
};

/* Google Sign-In (ID token) */
router.post('/google-signin', validateGoogleSignIn, async (req, res) => {
  try {
    const client = createOAuthClient();
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload.email || !payload.sub) {
      return res.status(400).json({ success: false, message: 'Invalid Google token payload' });
    }

    let user = await User.findOne({ $or: [{ email: payload.email }, { googleId: payload.sub }] });
    if (!user) {
      user = new User({
        username: payload.name || payload.email.split('@')[0],
        email: payload.email,
        googleId: payload.sub,
        isVerified: true,
        profilePicture: payload.picture || null,
      });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = payload.sub;
      user.isVerified = true;
      if (!user.profilePicture && payload.picture) user.profilePicture = payload.picture;
      await user.save();
    }

    const token = generateToken(user);
    setTokenCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'Google authentication successful',
      token,
      user: { id: user._id, username: user.username, email: user.email, isVerified: user.isVerified, profilePicture: user.profilePicture },
    });
  } catch (e) {
    console.error('Google authentication error:', e.message);
    res.status(500).json({ success: false, message: 'Authentication server error' });
  }
});

/* Google Sign-In (access token) */
router.post('/google-access-token-signin', async (req, res) => {
  const { access_token } = req.body;
  if (!access_token) return res.status(400).json({ success: false, message: 'No access token provided.' });

  try {
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { sub, email, name, picture, email_verified } = profile;
    if (!email || !sub || !email_verified) {
      return res.status(400).json({ success: false, message: 'Invalid or unverified Google profile.' });
    }

    let user = await User.findOne({ $or: [{ email }, { googleId: sub }] });
    if (!user) {
      user = new User({ username: name || email.split('@')[0], email, googleId: sub, isVerified: true, profilePicture: picture || null });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = sub;
      user.isVerified = true;
      if (!user.profilePicture && picture) user.profilePicture = picture;
      await user.save();
    }

    const token = generateToken(user);
    setTokenCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'Google Sign-In successful',
      token,
      user: { id: user._id, username: user.username, email: user.email, isVerified: user.isVerified, profilePicture: user.profilePicture },
    });
  } catch (e) {
    console.error('Error during Google access token sign-in:', e.message);
    res.status(500).json({ success: false, message: 'Server error during Google sign-in' });
  }
});

/* GitHub OAuth */
router.get('/github', (req, res) => {
  const redirectURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`;
  res.redirect(redirectURL);
});

router.get('/github/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).json({ success: false, error: 'Missing authorization code' });
  try {
    const tokenRes = await axios.post('https://github.com/login/oauth/access_token',
      { client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET, code },
      { headers: { Accept: 'application/json' } }
    );
    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get('https://api.github.com/user', { headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' } });
    const emailRes = await axios.get('https://api.github.com/user/emails', { headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' } });

    const githubUser = userRes.data;
    const primaryEmail = emailRes.data.find((e) => e.primary)?.email;
    if (!primaryEmail) return res.status(400).json({ success: false, error: 'Unable to get email from GitHub' });

    let user = await User.findOne({ $or: [{ email: primaryEmail }, { githubId: githubUser.id.toString() }] });
    if (!user) {
      user = new User({ username: githubUser.login, email: primaryEmail, githubId: githubUser.id.toString(), isVerified: true, profilePicture: githubUser.avatar_url || null });
      await user.save();
    } else if (!user.githubId) {
      user.githubId = githubUser.id.toString();
      user.isVerified = true;
      if (!user.profilePicture && githubUser.avatar_url) user.profilePicture = githubUser.avatar_url;
      await user.save();
    }

    const token = generateToken(user);
    setTokenCookie(res, token);

    res.redirect(`http://localhost:5173?auth=success&token=${token}`);
  } catch (e) {
    console.error('GitHub Auth Error:', e.message);
    res.redirect(`http://localhost:5173?auth=error&message=${encodeURIComponent('GitHub Authentication Failed')}`);
  }
});

/* Standard auth endpoints */
router.post('/register', registerUser);
router.post('/signin', signInUser);
router.post('/userData', getUserData);
router.post('/logout', logout);
router.get('/profile', getProfile);

export default router;
