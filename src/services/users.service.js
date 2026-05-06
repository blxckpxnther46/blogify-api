// src/services/users.service.js
const User = require('../models/user.model.js');

/**
 * Get all users
 * @returns {Promise<Array>} Array of user objects
 */
const getAllUsers = async () => {
  try {
    const users = await User.find().select('-__v');
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

/**
 * Get a single user by ID
 * @param {string} userId - The MongoDB ObjectId of the user
 * @returns {Promise<Object>} The user object
 */
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-__v');
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

/**
 * Create a new user
 * @param {Object} userData - User data (username, email, bio)
 * @returns {Promise<Object>} The created user object
 */
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

/**
 * Update a user by ID
 * @param {string} userId - The MongoDB ObjectId of the user
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object>} The updated user object
 */
const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true
    }).select('-__v');
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

/**
 * Delete a user by ID
 * @param {string} userId - The MongoDB ObjectId of the user
 * @returns {Promise<Object>} The deleted user object
 */
const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    return user;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
