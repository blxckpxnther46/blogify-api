// src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

/**
 * Middleware to protect routes that require authentication
 * Verifies the JWT token from the cookie and attaches user info to req.user
 */
const protect = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided'
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object for use in controllers
    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized - Invalid token'
    });
  }
};

module.exports = protect;
