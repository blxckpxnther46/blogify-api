// src/controllers/users.controller.js
const userService = require('../services/users.service.js');

/**
 * Get all users
 * GET /api/v1/users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      data: {
        users: users
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch users'
    });
  }
};

/**
 * Get a single user by ID
 * GET /api/v1/users/:userId
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getSingleUser = async (req, res) => {
  try {
    const requestedUserId = req.params.userId;

    // Fetch user from service
    const user = await userService.getUserById(requestedUserId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch user'
    });
  }
};

/**
 * Create a new user
 * POST /api/v1/users
 * @param {Object} req - Express request object (body: { username, email, bio })
 * @param {Object} res - Express response object
 */
const createUser = async (req, res) => {
  try {
    const { username, email, bio } = req.body;

    // Validate required fields
    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: username, email'
      });
    }

    // Create user using service
    const user = await userService.createUser({ username, email, bio });

    res.status(201).json({
      success: true,
      data: {
        user: user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create user'
    });
  }
};

/**
 * Update a user
 * PATCH /api/v1/users/:userId
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

    // Update user using service
    const user = await userService.updateUser(userId, updateData);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update user'
    });
  }
};

/**
 * Delete a user
 * DELETE /api/v1/users/:userId
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete user using service
    const user = await userService.deleteUser(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: {
        user: user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete user'
    });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};