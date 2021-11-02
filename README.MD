#### User

POST /api/v1/auth/register Register User {"name":"test", "email":"test@test.com","password":"something"}
POST /api/v1/auth/login Login User {"email":"test@test.com","password":"something"}
PATCH /api/v1/users Authentication Required Update User  
DELETE /api/v1/users Authentication Required Delete User

#### Posts

POST /api/v1/posts Authentication Required Create Post {"message":"hello"}
GET /api/v1/posts Authentication Required Get All Posts
GET /api/v1/posts/{id} Authentication Required Get Single Post
DELETE /api/v1/posts/{id} Authentication Required Delete Single Post
