# Blogify API

A professional, production-ready REST API for a blogging platform built with Node.js, Express, and MongoDB.

## 🎯 Project Overview

Blogify API is a fully functional, data-driven application that demonstrates modern backend architecture principles. It provides complete CRUD operations for users and posts with one-to-many relationships.

## ✨ Features

- **User Management**: Create, read, update, and delete users
- **Post Management**: Create, read, update, and delete blog posts
- **Author Association**: Posts are linked to users via MongoDB references
- **Data Validation**: Comprehensive schema validation with meaningful error messages
- **Clean Architecture**: Separation of concerns with models, services, controllers, and routes
- **Error Handling**: Proper HTTP status codes and standardized response formats
- **Environment Configuration**: Secure configuration management with environment variables

## 🏗️ Architecture

The project follows a **layered architecture pattern**:

```
Routes → Controllers → Services → Models → Database
```

- **Routes** (`src/routes/`): Define API endpoints
- **Controllers** (`src/controllers/`): Handle HTTP requests/responses
- **Services** (`src/services/`): Contain business logic and data access
- **Models** (`src/models/`): Define data schemas with Mongoose
- **Config** (`src/config/`): Database connection and environment setup

## 📋 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Development**: Nodemon for auto-reload
- **Environment**: dotenv for configuration

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blogify-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the root directory:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/blogify-db?retryWrites=true&w=majority
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

  For production deployments, use:
  ```bash
  npm start
  ```

   Expected output:
   ```
   ✓ MongoDB Connected: <host>
   ✓ Server is running at http://localhost:3000/
   ```

## 📚 API Endpoints

### Posts
- `POST /api/v1/posts` - Create a new post
- `GET /api/v1/posts` - Get all posts (with author details populated)
- `GET /api/v1/posts/:id` - Get a single post
- `PATCH /api/v1/posts/:id` - Update a post
- `DELETE /api/v1/posts/:id` - Delete a post

### Users
- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:userId` - Get a single user
- `PATCH /api/v1/users/:userId` - Update a user
- `DELETE /api/v1/users/:userId` - Delete a user

## 📊 Data Models

### User Schema
```javascript
{
  username: String (required, unique, min 3 chars),
  email: String (required, unique, valid email),
  bio: String (optional, max 500 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Schema
```javascript
{
  title: String (required, 5-200 chars),
  content: String (required, min 10 chars),
  author: ObjectId (references User, required),
  tags: [String] (optional),
  likes: Number (default 0),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

See [INTEGRATION_CHECKLIST.md](INTEGRATION_CHECKLIST.md) for detailed Postman testing guide with complete CRUD cycle instructions.

### Example: Create a User
```bash
POST http://localhost:3000/api/v1/users
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "bio": "I love blogging!"
}
```

### Example: Create a Post
```bash
POST http://localhost:3000/api/v1/posts
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my first post...",
  "author": "<user_id>"
}
```

## 🔧 Available Scripts

- `npm run start` - Start the server in production mode
- `npm run dev` - Start the server with auto-reload (development)
- `npm test` - Run tests (placeholder)

## 📝 Response Format

All API responses follow a standardized format:

### Success Response
```json
{
  "success": true,
  "data": {
    "posts": [/* array of posts */]
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🎓 Learning Resources

This project demonstrates:
- RESTful API design principles
- Mongoose schema modeling and validation
- Service layer pattern for code organization
- Error handling and status codes
- MongoDB relationships (one-to-many)
- Environment configuration best practices
- Git workflow with feature branches and conventional commits

## 📚 Documentation

- [INTEGRATION_CHECKLIST.md](INTEGRATION_CHECKLIST.md) - Complete integration guide with testing instructions
- [src/models/](src/models/) - Data schema definitions
- [src/services/](src/services/) - Business logic implementations
- [src/controllers/](src/controllers/) - HTTP request handlers
- [src/routes/](src/routes/) - API endpoint definitions

## 🔐 Security Notes

- **Never commit `.env` file** - It contains sensitive credentials
- Use `.env.example` template to document required variables
- Database credentials are stored in environment variables
- Implement authentication in Module 4

## 🚀 Next Steps

1. Update `.env` with your MongoDB Atlas connection string
2. Test all endpoints using the Postman guide
3. Review the integration checklist
4. Create a Pull Request for final review
5. Implement authentication layer (Module 4)

## 📞 Support

For questions or issues, refer to:
- [INTEGRATION_CHECKLIST.md](INTEGRATION_CHECKLIST.md) - Troubleshooting and detailed setup
- MongoDB documentation: https://docs.mongodb.com/
- Mongoose documentation: https://mongoosejs.com/
- Express documentation: https://expressjs.com/

---

**Status**: ✅ Ready for Database Integration Testing
**Version**: 1.0.0
**Module**: 3 - Data Layer Integration