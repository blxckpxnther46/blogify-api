// src/models/post.model.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters long'],
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [10, 'Content must be at least 10 characters long']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required']
    },
    tags: {
      type: [String],
      default: []
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative']
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
