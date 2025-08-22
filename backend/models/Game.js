import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  // Basic Info
  title: {
    type: String,
    required: true,
    trim: true
  },
  projectUrl: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  
  // Classification
  classification: {
    type: String,
    enum: ['games', 'tools', 'comics', 'books'],
    default: 'games'
  },
  projectType: {
    type: String,
    enum: ['downloadable', 'playable', 'external'],
    default: 'downloadable'
  },
  releaseStatus: {
    type: String,
    enum: ['released', 'in_development', 'prototype', 'on_hold', 'canceled'],
    default: 'released'
  },
  
  // Pricing
  pricing: {
    type: String,
    enum: ['free', 'paid', 'no_payments'],
    default: 'free'
  },
  suggestedDonation: {
    type: Number,
    min: 0
  },
  
  // Media
  coverImage: {
    type: String, // URL to uploaded image
    required: true
  },
  gameplayVideo: {
    type: String // YouTube/Vimeo URL
  },
  screenshots: [{
    type: String // URLs to uploaded screenshots
  }],
  
  // Files
  gameFiles: [{
    filename: String,
    originalName: String,
    size: Number,
    mimetype: String,
    url: String
  }],
  
  // Content
  description: {
    type: String,
    required: true
  },
  
  // Categories
  genre: {
    type: String,
    enum: [
      'action', 'adventure', 'puzzle', 'strategy', 'rpg', 'simulation',
      'sports', 'racing', 'platformer', 'shooter', 'fighting', 
      'visual-novel', 'interactive-fiction', 'card-game', 'board-game',
      'educational', 'other'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  
  // Special Categories
  isLudumDare: {
    type: Boolean,
    default: false
  },
  ludumDareTag: {
    type: String
  },
  hasAI: {
    type: String,
    enum: ['yes', 'no'],
    default: 'no'
  },
  
  // App Store Links
  appStoreLinks: {
    steam: String,
    appleAppStore: String,
    googlePlay: String,
    amazonAppStore: String,
    windowsStore: String
  },
  
  // Customization
  customNoun: {
    type: String,
    default: 'game'
  },
  
  // Community
  community: {
    type: String,
    enum: ['disabled', 'comments', 'discussion'],
    default: 'comments'
  },
  
  // Visibility
  visibility: {
    type: String,
    enum: ['draft', 'restricted', 'public'],
    default: 'draft'
  },
  
  // Author Info
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorUsername: {
    type: String,
    required: true
  },
  
  // Stats
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  
  // Comments/Reviews
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
    comment: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // SEO
  slug: {
    type: String,
    unique: true
  },
  
  // Moderation
  isApproved: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: {
    type: Date
  }
});

// Create slug from title
gameSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  
  if (this.visibility === 'public' && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  
  next();
});

// Indexes for better performance
gameSchema.index({ title: 'text', description: 'text', tags: 'text' });
gameSchema.index({ genre: 1 });
gameSchema.index({ author: 1 });
gameSchema.index({ visibility: 1 });
gameSchema.index({ createdAt: -1 });
gameSchema.index({ slug: 1 });

export default mongoose.model('Game', gameSchema);