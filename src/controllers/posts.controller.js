// src/controllers/posts.controller.js

/**
 * Get all posts
 * GET /api/v1/posts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllPosts = async (req, res) => {
  try {
    // For now, the "business logic" is simple.
    // In the future, this is where we would call a service to get data from a database.
    // Example: const posts = await Post.find();
    const posts = [
      { id: 1, title: 'Controller Post 1' },
      { id: 2, title: 'Controller Post 2' }
    ];

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

    // Fetch post from database
    // Example: const post = await Post.findById(postId);
    const post = {
      id: parseInt(postId),
      title: `Post ${postId}`
    };

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

// We export the functions in an object so we can easily add more functions later.
module.exports = {
  getAllPosts,
  getPostById
};