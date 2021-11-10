#### User

- POST /api/v1/auth/register // Register User {"name":"test", "email":"test@test.com","password":"something"}
- POST /api/v1/auth/login // Login User {"email":"test@test.com","password":"something"}
- GET /api/v1/users // Auth Required // Get User
- PATCH /api/v1/users // Auth Required // Update User
- DELETE /api/v1/users // Auth Required // Delete User

#### Public route

- GET /api/v1/public // Get All Posts
- GET /api/v1/public/{id}/comment // Get all comments on post

#### Posts

- POST /api/v1/posts // Auth Required // Create Post {"message":"hello"}
- GET /api/v1/posts/{id} // Auth Required // Get Single Post
- DELETE /api/v1/posts/{id} // Auth Required // Delete Single Post

#### Comments

- POST /api/v1/posts/{id}/comment // Auth Required // Create comment to post
- DELETE /api/v1/posts/{id}/comment/{com} // Auth required // Delete single comment

#### Likes

- POST /api/v1/posts/{id}/like // Auth required // Like a post
- DELETE /api/v1/posts/{id}/like // Auth required // Remove all post likes
- DELETE /api/v1/posts/{id}/like/{like} // Auth required // Remove like from a post
- GET /api/v1/users/likes // Auth required // Get all user likes

#### Upload

- POST /api/v1/users/uploads // Auth required // Upload image

#### TODO:

- notifications - how to do? Socket IO? Notification will come when new comments or likes.
