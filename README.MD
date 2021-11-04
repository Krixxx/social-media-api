#### User

- POST /api/v1/auth/register // Register User {"name":"test", "email":"test@test.com","password":"something"}
- POST /api/v1/auth/login // Login User {"email":"test@test.com","password":"something"}
- PATCH /api/v1/users // Auth Required // Update User
- DELETE /api/v1/users // Auth Required // Delete User

#### Public route

- GET /api/v1/public // Get All Posts
- GET /api/v1/public/{id} // Get all comments on post

#### Posts

- POST /api/v1/posts // Auth Required // Create Post {"message":"hello"}
- GET /api/v1/posts/{id} // Auth Required // Get Single Post
- DELETE /api/v1/posts/{id} // Auth Required // Delete Single Post

#### Comments

- POST /api/v1/posts/{id}/comment // Auth Required // Create comment to post
- DELETE /api/v1/posts/{id}/comment/{com} // Auth required // Delete single comment

#### Likes

- POST /api/v1/posts/{id}/like // Auth required // Like a post
- DELETE /api/v1/posts/{id}/like/{like} // Auth required // Remove like from a post

#### TODO:

- user image upload to cloudinary
- notifications - how to do? Socket IO? Notification will come when new comments or likes.
