#### User

- POST /api/v1/auth/register // Register User {"name":"test", "email":"test@test.com","password":"something"}
- POST /api/v1/auth/login // Login User {"email":"test@test.com","password":"something"}
- PATCH /api/v1/users // Auth Required // Update User
- DELETE /api/v1/users // Auth Required // Delete User

#### Posts

- POST /api/v1/posts // Auth Required // Create Post {"message":"hello"}
- GET /api/v1/posts // Auth Required // Get All Posts
- GET /api/v1/posts/{id} // Auth Required // Get Single Post
- DELETE /api/v1/posts/{id} // Auth Required // Delete Single Post

#### TODO:

- Add comments
- Add likes
- comment count for posts
- like count for posts
- delete comment and reduce comment count
- unlike and reduce like count
- user image upload to cloudinary
- notifications - how to do? Socket IO? Notification will come when new comments or likes.
