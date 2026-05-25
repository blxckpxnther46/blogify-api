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
 * @param {Object} req - Express request object (body: { title, content })
 * @param {Object} res - Express response object
 * @note Requires authentication - uses req.user.id as author
 */
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, content'
      });
    }

    // Use authenticated user as author
    const postData = {
      title,
      content,
      author: req.user.id
    };

    // Create post using service
    const post = await postService.createPost(postData);

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
 * @param {Object} req - Express request object (body: { title?, content?, tags?, likes? })
 * @param {Object} res - Express response object
 * @note Requires authentication - only owner can update post
 */
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updateData = req.body;

    // Fetch post to check ownership
    const post = await postService.getPostById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if the user is the post author
    if (post.author._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this post'
      });
    }

    // Update post using service
    const updatedPost = await postService.updatePost(postId, updateData);

    // Return standardized success response
    res.status(200).json({
      success: true,
      data: {
        post: updatedPost
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
 * @note Requires authentication - only owner can delete post
 */
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Fetch post to check ownership
    const post = await postService.getPostById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if the user is the post author
    if (post.author._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this post'
      });
    }

    // Delete post using service
    const deletedPost = await postService.deletePost(postId);

    // Return standardized success response
    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: {
        post: deletedPost
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