// src/controllers/posts.controller.js
const postService = require('../services/posts.service.js');

/**
 * Get all posts
 * GET /api/v1/posts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();

    // Return standardized success response
    res.status(200).json({
      success: true,
      data: {
        posts: posts
      }
    });
  } catch (error) {
    // Return standardized error response
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch posts'
    });
  }
};

/**
 * Get a single post by ID
 * GET /api/v1/posts/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    // Fetch post from service
    const post = await postService.getPostById(postId);

    // Check if post exists
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Return standardized success response
    res.status(200).json({
      success: true,
      data: {
        post: post
      }
    });
  } catch (error) {
    // Return standardized error response
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch post'
    });
  }
};

/**
 * Create a new post
 * POST /api/v1/posts
 * @param {Object} req - Express request object (body: { title, content, author })
 * @param {Object} res - Express response object
 */
const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validate required fields
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, content, author'
      });
    }

    // Create post using service
    const post = await postService.createPost({ title, content, author });

    // Return standardized success response
    res.status(201).json({
      success: true,
      data: {
        post: post
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create post'
    });
  }
};

/**
 * Update a post
 * PATCH /api/v1/posts/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updateData = req.body;

    // Update post using service
    const post = await postService.updatePost(postId, updateData);

    // Check if post exists
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Return standardized success response
    res.status(200).json({
      success: true,
      data: {
        post: post
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update post'
    });
  }
};

/**
 * Delete a post
 * DELETE /api/v1/posts/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Delete post using service
    const post = await postService.deletePost(postId);

    // Check if post exists
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Return standardized success response
    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: {
        post: post
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete post'
    });
  }
};

// We export the functions in an object so we can easily add more functions later.
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};