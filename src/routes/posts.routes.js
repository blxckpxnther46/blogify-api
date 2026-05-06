// src/routes/posts.routes.js

const express = require('express');
const router = express.Router();

// Import the controller
const postController = require('../controllers/posts.controller.js');

/**
 * POST /api/v1/posts - Create a new post
 * Body: { title, content, author }
 */
router.post('/', postController.createPost);

/**
 * GET /api/v1/posts - Get all posts
 */
router.get('/', postController.getAllPosts);

/**
 * GET /api/v1/posts/:id - Get a single post by ID
 */
router.get('/:id', postController.getPostById);

/**
 * PATCH /api/v1/posts/:id - Update a post
 * Body: { title?, content?, tags?, likes? }
 */
router.patch('/:id', postController.updatePost);

/**
 * DELETE /api/v1/posts/:id - Delete a post
 */
router.delete('/:id', postController.deletePost);

module.exports = router;