import express from 'express';
import Game from '../models/Game.js';
import { uploadFields } from '../middlewares/uploadMiddleware.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// @desc    Upload a new game
// @route   POST /api/games/upload
// @access  Private
const uploadGame = async (req, res) => {
  try {
    console.log('📝 Game upload request received');
    console.log('👤 User:', req.user?.username || 'Anonymous');
    console.log('📋 Form fields received:', Object.keys(req.body));
    console.log('📁 Files received:', req.files);

    const {
      title,
      projectUrl,
      shortDescription,
      classification,
      projectType,
      releaseStatus,
      pricing,
      suggestedDonation,
      gameplayVideo,
      description,
      genre,
      tags,
      isLudumDare,
      ludumDareTag,
      hasAI,
      appStoreLinks,
      customNoun,
      community,
      visibility
    } = req.body;

    // Validate required fields
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Game title is required'
      });
    }

    if (!description || description.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Game description is required'
      });
    }

    // Check if cover image is provided
    if (!req.files || !req.files.coverImage || req.files.coverImage.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cover image is required'
      });
    }

    // Process file URLs
    const coverImageUrl = `/uploads/games/covers/${req.files.coverImage[0].filename}`;
    
    const screenshotUrls = req.files.screenshots && req.files.screenshots.length > 0
      ? req.files.screenshots.map(file => `/uploads/games/screenshots/${file.filename}`)
      : [];
    
    const gameFileData = req.files.gameFiles && req.files.gameFiles.length > 0
      ? req.files.gameFiles.map(file => ({
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          url: `/uploads/games/files/${file.filename}`
        }))
      : [];

    // Process tags
    const processedTags = tags && tags.trim() 
      ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) 
      : [];

    // Process app store links
    let processedAppStoreLinks = {};
    try {
      if (appStoreLinks && typeof appStoreLinks === 'string') {
        processedAppStoreLinks = JSON.parse(appStoreLinks);
      } else if (appStoreLinks && typeof appStoreLinks === 'object') {
        processedAppStoreLinks = appStoreLinks;
      }
    } catch (error) {
      console.log('⚠️ Failed to parse app store links:', error.message);
      processedAppStoreLinks = {};
    }

    // Generate project URL if not provided
    const generatedProjectUrl = projectUrl && projectUrl.trim() 
      ? projectUrl.trim()
      : title
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');

    // Create game object
    const gameData = {
      title: title.trim(),
      projectUrl: generatedProjectUrl,
      shortDescription: shortDescription?.trim() || '',
      classification: classification || 'games',
      projectType: projectType || 'downloadable',
      releaseStatus: releaseStatus || 'released',
      pricing: pricing || 'free',
      suggestedDonation: suggestedDonation ? parseFloat(suggestedDonation) : undefined,
      coverImage: coverImageUrl,
      gameplayVideo: gameplayVideo?.trim() || '',
      screenshots: screenshotUrls,
      gameFiles: gameFileData,
      description: description.trim(),
      genre: genre || '',
      tags: processedTags,
      isLudumDare: isLudumDare === 'true' || isLudumDare === true,
      ludumDareTag: ludumDareTag?.trim() || '',
      hasAI: hasAI || 'no',
      appStoreLinks: processedAppStoreLinks,
      customNoun: customNoun?.trim() || 'game',
      community: community || 'comments',
      visibility: visibility || 'draft',
      author: req.user.id,
      authorUsername: req.user.username
    };

    console.log('🎮 Creating game:', gameData.title);

    // Create and save game
    const game = new Game(gameData);
    const savedGame = await game.save();

    console.log('✅ Game created successfully:', savedGame._id);

    res.status(201).json({
      success: true,
      message: 'Game uploaded successfully!',
      game: {
        id: savedGame._id,
        title: savedGame.title,
        slug: savedGame.slug,
        visibility: savedGame.visibility,
        coverImage: savedGame.coverImage,
        author: savedGame.authorUsername,
        createdAt: savedGame.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Game upload error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `A game with this ${field} already exists`
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during game upload',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get all games
// @route   GET /api/games
// @access  Public
const getAllGames = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      genre, 
      search, 
      visibility = 'public',
      sort = '-createdAt' 
    } = req.query;

    // Build query
    const query = { visibility };
    
    if (genre && genre !== 'all') {
      query.genre = genre;
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query
    const games = await Game.find(query)
      .populate('author', 'username email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-gameFiles');

    const total = await Game.countDocuments(query);

    res.json({
      success: true,
      games,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });

  } catch (error) {
    console.error('❌ Error fetching games:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching games'
    });
  }
};

// @desc    Get single game by slug
// @route   GET /api/games/slug/:slug
// @access  Public
// routes/gameRoutes.js (top)
import mongoose from 'mongoose';

// ...

// @desc    Get single game by slug or projectUrl
// @route   GET /api/games/slug/:slug
// @access  Public
const getGameBySlug = async (req, res) => {
  try {
    const key = req.params.slug;

    // try slug or projectUrl first
    let game = await Game.findOne({
      $or: [{ slug: key }, { projectUrl: key }],
    }).populate('author', 'username email createdAt');

    // fallback: if the key looks like an ObjectId, try by _id
    if (!game && mongoose.Types.ObjectId.isValid(key)) {
      game = await Game.findById(key).populate('author', 'username email createdAt');
    }

    if (!game) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }

    game.views += 1;
    await game.save();

    res.json({ success: true, game });
  } catch (error) {
    console.error('❌ Error fetching game:', error);
    res.status(500).json({ success: false, message: 'Error fetching game' });
  }
};


// @desc    Get user's games
// @route   GET /api/games/user/my-games
// @access  Private
const getUserGames = async (req, res) => {
  try {
    const games = await Game.find({ author: req.user.id })
      .sort('-createdAt')
      .select('-gameFiles');

    res.json({
      success: true,
      games
    });

  } catch (error) {
    console.error('❌ Error fetching user games:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching your games'
    });
  }
};

// @desc    Update game
// @route   PUT /api/games/id/:id
// @access  Private
const updateGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    // Check if user owns the game
    if (game.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this game'
      });
    }

    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Game updated successfully',
      game: updatedGame
    });

  } catch (error) {
    console.error('❌ Error updating game:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating game'
    });
  }
};

// @desc    Delete game
// @route   DELETE /api/games/id/:id
// @access  Private
const deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    // Check if user owns the game
    if (game.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this game'
      });
    }

    await Game.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Game deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting game:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting game'
    });
  }
};

// ✅ PROPERLY DEFINED ROUTES (this is likely where the error was)
router.post('/upload', authenticateToken, uploadFields, uploadGame);
router.get('/', getAllGames);
router.get('/user/my-games', authenticateToken, getUserGames);
router.get('/slug/:slug', getGameBySlug);  // Fixed: added /slug prefix
router.put('/id/:id', authenticateToken, updateGame);  // Fixed: added /id prefix
router.delete('/id/:id', authenticateToken, deleteGame);  // Fixed: added /id prefix

export default router;