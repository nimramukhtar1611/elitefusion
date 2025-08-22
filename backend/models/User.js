import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function() {
      // Only require username for non-OAuth users
      return !this.googleId && !this.githubId;
    },
    trim: true,
    minLength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
    lowercase: true,
    trim: true,
  },
  googleId: { 
    type: String,
    sparse: true // Allows multiple null values but unique non-null values
  },
  githubId: { 
    type: String,
    sparse: true 
  },
  password: {
    type: String,
    required: function() {
      // Only require password for non-OAuth users
      return !this.googleId && !this.githubId;
    },
    minLength: [6, "Password must be at least 6 characters long"],
  },
  profilePicture: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
}, {
  timestamps: true
});


// Add index for better performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ githubId: 1 });

const User = mongoose.model("User", userSchema);

export default User;