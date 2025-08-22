export const validateGameUpload = (req, res, next) => {
  const { title, githubLink, author = 'Muhammad-Irfanum' } = req.body;
  const errors = [];

  // Required fields validation
  if (!title || title.trim().length === 0) {
    errors.push('Game title is required');
  } else if (title.trim().length > 100) {
    errors.push('Game title must be less than 100 characters');
  }

  if (!githubLink || githubLink.trim().length === 0) {
    errors.push('GitHub link is required');
  } else {
    // GitHub URL validation
    const githubUrlPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/i;
    if (!githubUrlPattern.test(githubLink.trim())) {
      errors.push('Please provide a valid GitHub repository URL (https://github.com/username/repository)');
    }
  }

  // File validation
  if (!req.file) {
    errors.push('Cover image is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};