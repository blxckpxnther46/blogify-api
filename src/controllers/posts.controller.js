// src/controllers/posts.controller.js

// This function will be our handler for "GET /api/v1/posts"
const getAllPosts = (req, res) => {
// For now, the "business logic" is simple.
// In the future, this is where we would call a service to get data from a database.
const posts = [
  { id: 1, title: 'Controller Post 1' },
  { id: 2, title: 'Controller Post 2' }
];

// The controller's job is to send the final response.
res.status(200).json({
  message: 'Posts fetched successfully',
  data: posts
});
};

// We export the function in an object so we can easily add more functions later.
module.exports = {
getAllPosts,
};