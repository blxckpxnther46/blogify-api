// src/routes/posts.routes.js

const express = require('express');
const router = express.Router();

// Import the controller and middleware
const postController = require('../controllers/posts.controller.js');
const protect = require('../middleware/auth.middleware.js');

/**
 * POST /api/v1/posts - Create a new post (Protected)
 * Body: { title, content }
 * Author is automatically set from authenticated user
 */
router.post('/', protect, postController.createPost);

/**
 * GET /api/v1/posts - Get all posts (Public)
 */
router.get('/', postController.getAllPosts);

/**
 * GET /api/v1/posts/:id - Get a single post by ID (Public)
 */
router.get('/:id', postController.getPostById);

/**
 * PATCH /api/v1/posts/:id - Update a post (Protected)
 * Body: { title?, content?, tags?, likes? }
 * Only the post author can update
 */
router.patch('/:id', protect, postController.updatePost);

/**
 * DELETE /api/v1/posts/:id - Delete a post (Protected)
 * Only the post author can delete
 */
router.delete('/:id', protect, postController.deletePost);

module.exports = router;