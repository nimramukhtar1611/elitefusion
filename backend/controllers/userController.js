export const getProfile = (req, res) => {
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user: req.user // comes from `needlogin` middleware
    });
  };
