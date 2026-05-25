// src/index.js

const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db.js');

// Import routers
const postRouter = require('./routes/posts.routes.js');
const userRouter = require('./routes/users.routes.js');
const authRouter = require('./routes/auth.routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser()); // CRITICAL: Initialize cookie parser

// Connect to MongoDB
connectDB();

// Main welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Blogify API!',
    version: '1.0.0',
    endpoints: {
      posts: '/api/v1/posts',
      users: '/api/v1/users'
    }
  });
});

// Mount the routers
// For any request that starts with /api/v1/posts, hand it over to the postRouter
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`✓ Server is running at http://localhost:${PORT}/`);
});