# Pull Request: Implement 5-Pillar Security Architecture

## PR Title
```
feat: implement 5-pillar security architecture
```

## PR Description

### Overview
This PR implements comprehensive security architecture for the Blogify API following the 5-pillar security framework. All authentication, authorization, and secure cookie handling mechanisms are now in place.

---

## Security Pillars Implementation ✅

### ✅ Pillar 1: Configuration & Secrets
**Status:** COMPLETE

- [x] Installed `bcryptjs`, `jsonwebtoken`, `cookie-parser` dependencies
- [x] Created `.env` file with `JWT_SECRET` configuration
- [x] Initialized `cookie-parser` middleware in `src/index.js`
- [x] Set secure cookie options: `httpOnly`, `secure`, `sameSite`

**Files Modified:**
- `package.json` - Added 3 security dependencies
- `.env` - Created with JWT_SECRET and JWT_EXPIRE
- `src/index.js` - Added cookie-parser middleware

---

### ✅ Pillar 2: Secure Registration (Password Hashing)
**Status:** COMPLETE

- [x] Added `password` field to User model with validation
- [x] Created `registerUser` controller with bcrypt hashing
- [x] Password hashing uses 10 salt rounds (industry standard)
- [x] Password field uses `select: false` to prevent accidental exposure
- [x] Duplicate email/username validation before registration

**Files Created/Modified:**
- `src/models/user.model.js` - Added password field with validation
- `src/controllers/auth.controller.js` - New file with registerUser logic

---

### ✅ Pillar 3: Secure Login (JWT Cookies)
**Status:** COMPLETE

- [x] Implemented `loginUser` controller with bcrypt password comparison
- [x] JWT token generation with user ID and email
- [x] Secure cookie transmission with:
  - `httpOnly: true` (prevents JavaScript access)
  - `secure: true` (in production, HTTPS only)
  - `maxAge: 3600000` (1 hour expiration)
  - `sameSite: 'strict'` (CSRF protection)
- [x] Professional error messages ("Invalid credentials")

**Files Created:**
- `src/controllers/auth.controller.js` - loginUser implementation
- `src/routes/auth.routes.js` - Auth endpoints

---

### ✅ Pillar 4: The Gatekeeper (Middleware)
**Status:** COMPLETE

- [x] Created `auth.middleware.js` with JWT verification
- [x] Extracts token from cookies (not from headers)
- [x] Verifies JWT signature against `JWT_SECRET`
- [x] Attaches `req.user` object to authenticated requests
- [x] Returns 401 Unauthorized for missing/invalid tokens

**Files Created:**
- `src/middleware/auth.middleware.js` - Protect middleware

---

### ✅ Pillar 5: Authorization (Ownership)
**Status:** COMPLETE

- [x] Added ownership checks in `updatePost` controller
- [x] Added ownership checks in `deletePost` controller
- [x] Compares `post.author._id` with `req.user.id`
- [x] Returns 403 Forbidden when user attempts to modify others' posts
- [x] Applied `protect` middleware to: POST, PATCH, DELETE /api/v1/posts

**Files Modified:**
- `src/controllers/posts.controller.js` - Added authorization logic
- `src/routes/posts.routes.js` - Added protect middleware to protected routes

---

## API Endpoints Summary

### Authentication Endpoints (NEW)
```
POST /api/v1/auth/register
  Body: { username, email, password }
  Response: { success, message, data.user }

POST /api/v1/auth/login
  Body: { email, password }
  Response: { success, message, data.user }
  Sets: httpOnly token cookie

POST /api/v1/auth/logout (Protected)
  Response: { success, message }
  Clears: token cookie
```

### Protected Post Endpoints
```
POST /api/v1/posts (Protected)
  Body: { title, content }
  Author auto-set from req.user.id
  
PATCH /api/v1/posts/:id (Protected)
  Only post owner can update
  Returns 403 Forbidden if not owner

DELETE /api/v1/posts/:id (Protected)
  Only post owner can delete
  Returns 403 Forbidden if not owner
```

### Public Endpoints
```
GET /api/v1/posts - List all posts
GET /api/v1/posts/:id - Get single post
```

---

## Testing Strategy (Postman)

### Phase 1: Happy Path ✅
1. **Register:**
   - `POST http://localhost:3000/api/v1/auth/register`
   - Body: `{ "username": "alice", "email": "alice@test.com", "password": "password123" }`
   - Expected: 201 Created
   - Verify: Check Cookies tab → token cookie should be httpOnly ✓

2. **Login:**
   - `POST http://localhost:3000/api/v1/auth/login`
   - Body: `{ "email": "alice@test.com", "password": "password123" }`
   - Expected: 200 OK, token in cookie
   - Verify: Cookie should be present and httpOnly ✓

3. **Create Post:**
   - `POST http://localhost:3000/api/v1/posts`
   - Body: `{ "title": "Alice's First Post", "content": "This is great content" }`
   - Expected: 201 Created (NO need to pass author - it's automatic!)
   - Verify: Author is automatically set to logged-in user ✓

### Phase 2: Authentication Failure 🚫
1. **Logout/Clear Cookie:**
   - `POST http://localhost:3000/api/v1/auth/logout`
   - Clear cookies manually in Postman if needed

2. **Attempt Access Without Token:**
   - `DELETE http://localhost:3000/api/v1/posts/[post_id]`
   - Expected: **401 Unauthorized**
   - Message: "Not authorized - No token provided" ✓

### Phase 3: Authorization Failure 🚫
1. **Register/Login as Bob:**
   - Create user "bob" and login

2. **Attempt to Delete Alice's Post:**
   - `DELETE http://localhost:3000/api/v1/posts/[alice_post_id]`
   - (Bob is logged in with his token)
   - Expected: **403 Forbidden**
   - Message: "You are not authorized to delete this post" ✓

---

## Changed Files

```
Modified:
  ✏️ package.json (+3 dependencies)
  ✏️ .env (NEW - with JWT_SECRET)
  ✏️ src/index.js (cookieParser middleware)
  ✏️ src/models/user.model.js (password field)
  ✏️ src/controllers/posts.controller.js (ownership checks, req.user.id)
  ✏️ src/routes/posts.routes.js (protect middleware)

Created:
  ✨ src/controllers/auth.controller.js (register, login, logout)
  ✨ src/middleware/auth.middleware.js (JWT verification)
  ✨ src/routes/auth.routes.js (auth endpoints)
```

---

## Security Features

✅ **Password Security:**
- Bcrypt hashing with 10 salt rounds
- Passwords never stored or returned in API responses

✅ **Token Security:**
- JWT signed with secret key
- 1-hour expiration
- Stored in httpOnly cookies (XSS protection)
- SameSite=strict (CSRF protection)
- Secure flag enabled in production

✅ **Authorization:**
- Resource-based access control
- Users can only modify their own posts
- Clear 403 Forbidden responses for unauthorized access

✅ **Error Handling:**
- Professional error messages
- No sensitive information leakage
- Proper HTTP status codes

---

## Environment Variables Required

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogify-db
PORT=3000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=1h
```

---

## How to Create This PR on GitHub

1. Go to your repository on GitHub: https://github.com/YOUR_USERNAME/blogify-api
2. Click "Pull requests" → "New pull request"
3. Set:
   - **Base:** `main`
   - **Compare:** `feat/security-5-pillars`
4. Copy the title and description from above
5. Click "Create pull request"

---

## Checklist for Review

- [x] All 5 security pillars implemented
- [x] Password hashing with bcrypt (10 rounds)
- [x] JWT authentication with secure cookies
- [x] Authorization checks on protected resources
- [x] Proper middleware placement
- [x] Professional error messages
- [x] No console.log(token) statements
- [x] Unused code removed
- [x] API documentation updated
- [x] Ready for testing in Postman

---

## Next Steps

1. ✅ Merge this PR to main
2. ✅ Follow Postman testing strategy above
3. ✅ Deploy to production environment
4. ✅ Monitor authentication logs
