// src/routes/users.routes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller.js');

/**
 * POST /api/v1/users - Create a new user
 * Body: { username, email, bio? }
 */
router.post('/', userController.createUser);

/**
 * GET /api/v1/users - Get all users
 */
router.get('/', userController.getAllUsers);

/**
 * GET /api/v1/users/:userId - Get a single user by ID
 */
router.get('/:userId', userController.getSingleUser);

/**
 * PATCH /api/v1/users/:userId - Update a user
 * Body: { username?, email?, bio? }
 */
router.patch('/:userId', userController.updateUser);

/**
 * DELETE /api/v1/users/:userId - Delete a user
 */
router.delete('/:userId', userController.deleteUser);

module.exports = router;