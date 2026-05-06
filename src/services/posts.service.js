// src/services/posts.service.js
const Post = require('../models/post.model.js');

/**
 * Get all posts with author information populated
 * @returns {Promise<Array>} Array of posts with author details
 */
const getAllPosts = async () => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email bio')
      .sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
};

/**
 * Get a single post by ID with author information
 * @param {string} postId - The MongoDB ObjectId of the post
 * @returns {Promise<Object>} The post object with populated author
 */
const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId).populate('author', 'username email bio');
    return post;
  } catch (error) {
    throw new Error(`Error fetching post: ${error.message}`);
  }
};

/**
 * Create a new post
 * @param {Object} postData - Post data (title, content, author)
 * @returns {Promise<Object>} The created post object
 */
const createPost = async (postData) => {
  try {
    const post = new Post(postData);
    await post.save();
    // Populate author after saving
    await post.populate('author', 'username email bio');
    return post;
  } catch (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }
};

/**
 * Update a post by ID
 * @param {string} postId - The MongoDB ObjectId of the post
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object>} The updated post object
 */
const updatePost = async (postId, updateData) => {
  try {
    const post = await Post.findByIdAndUpdate(postId, updateData, {
      new: true, // Return the updated document
      runValidators: true // Run schema validators
    }).populate('author', 'username email bio');
    return post;
  } catch (error) {
    throw new Error(`Error updating post: ${error.message}`);
  }
};

/**
 * Delete a post by ID
 * @param {string} postId - The MongoDB ObjectId of the post
 * @returns {Promise<Object>} The deleted post object
 */
const deletePost = async (postId) => {
  try {
    const post = await Post.findByIdAndDelete(postId);
    return post;
  } catch (error) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
