// src/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const protect = require('../middleware/auth.middleware.js');

/**
 * POST /api/v1/auth/register - Register a new user
 * Body: { username, email, password }
 */
router.post('/register', authController.registerUser);

/**
 * POST /api/v1/auth/login - Login user
 * Body: { email, password }
 */
router.post('/login', authController.loginUser);

/**
 * POST /api/v1/auth/logout - Logout user (Protected)
 */
router.post('/logout', protect, authController.logoutUser);

module.exports = router;
