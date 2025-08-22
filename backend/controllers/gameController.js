import Game from '../models/Game.js';
import path from 'path';
import fs from 'fs/promises';

// @desc    Get all games
// @route   GET /api/games
// @access  Public
export const getAllGames = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, status = 'active', search } = req.query;
    
    // Build query
    let query = { status };
    
    if (author) {
      query.author = new RegExp(author, 'i');
    }
    
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { author: new RegExp(search, 'i') },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const games = await Game.find(query)
      .sort({ uploadedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Add full image URLs
    const gamesWithUrls = games.map(game => ({
      ...game,
      coverImage: game.coverImage ? `http://localhost:5000/${game.coverImage}` : null
    }));

    const total = await Game.countDocuments(query);

    res.status(200).json({
      success: true,
      count: gamesWithUrls.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: gamesWithUrls
    });

  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch games',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Get single game
// @route   GET /api/games/:id
// @access  Public
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    // Add full image URL
    const gameWithUrl = {
      ...game.toObject(),
      coverImage: game.coverImage ? `http://localhost:5000/${game.coverImage}` : null
    };

    res.status(200).json({
      success: true,
      data: gameWithUrl
    });

  } catch (error) {
    console.error('Get game error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch game',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Upload/Create new game
// @route   POST /api/games
// @access  Public
export const uploadGame = async (req, res) => {
  try {
    const { title, githubLink, author = 'Muhammad-Irfanum' } = req.body;

    // Validation
    if (!title || !githubLink) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and GitHub link'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a cover image'
      });
    }

    // Check if game title already exists by this author
    const existingGame = await Game.findOne({ 
      title: new RegExp(`^${title}$`, 'i'), 
      author: new RegExp(`^${author}$`, 'i') 
    });

    if (existingGame) {
      return res.status(409).json({
        success: false,
        message: 'You have already uploaded a game with this title'
      });
    }

    // Create game object
    const gameData = {
      title: title.trim(),
      githubLink: githubLink.trim(),
      author: author.trim(),
      coverImage: req.file.path.replace(/\\/g, '/'), // Normalize path separators
      originalFileName: req.file.originalname,
      fileSize: req.file.size,
      uploadedAt: new Date()
    };

    const game = await Game.create(gameData);

    // Return game with full image URL
    const gameResponse = {
      ...game.toObject(),
      coverImage: `http://localhost:5000/${game.coverImage}`
    };

    res.status(201).json({
      success: true,
      message: 'Game uploaded successfully!',
      data: gameResponse
    });

  } catch (error) {
    console.error('Upload game error:', error);

    // Delete uploaded file if game creation fails
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    // Handle validation errors
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
      message: 'Failed to upload game',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Update game
// @route   PUT /api/games/:id
// @access  Public
export const updateGame = async (req, res) => {
  try {
    const { title, githubLink, author, description, tags } = req.body;

    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    // Update fields
    if (title) game.title = title.trim();
    if (githubLink) game.githubLink = githubLink.trim();
    if (author) game.author = author.trim();
    if (description) game.description = description.trim();
    if (tags) game.tags = tags;

    // Handle new cover image
    if (req.file) {
      try {
        await fs.unlink(game.coverImage);
      } catch (error) {
        console.log('Old image not found or already deleted');
      }
      
      game.coverImage = req.file.path.replace(/\\/g, '/');
      game.originalFileName = req.file.originalname;
      game.fileSize = req.file.size;
    }

    const updatedGame = await game.save();

    // Return with full image URL
    const gameResponse = {
      ...updatedGame.toObject(),
      coverImage: `http://localhost:5000/${updatedGame.coverImage}`
    };

    res.status(200).json({
      success: true,
      message: 'Game updated successfully!',
      data: gameResponse
    });

  } catch (error) {
    console.error('Update game error:', error);

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
      message: 'Failed to update game',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Delete game
// @route   DELETE /api/games/:id
// @access  Public
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    // Delete image file
    try {
      await fs.unlink(game.coverImage);
    } catch (error) {
      console.log('Image file not found or already deleted');
    }

    await Game.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Game deleted successfully!'
    });

  } catch (error) {
    console.error('Delete game error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete game',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Increment game plays
// @route   POST /api/games/:id/play
// @access  Public
export const incrementPlays = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    await game.incrementPlays();

    res.status(200).json({
      success: true,
      message: 'Play count updated',
      plays: game.plays
    });

  } catch (error) {
    console.error('Increment plays error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update play count',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Increment game likes
// @route   POST /api/games/:id/like
// @access  Public
export const incrementLikes = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    await game.incrementLikes();

    res.status(200).json({
      success: true,
      message: 'Like count updated',
      likes: game.likes
    });

  } catch (error) {
    console.error('Increment likes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update like count',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};