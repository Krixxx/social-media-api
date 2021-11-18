const { StatusCodes } = require('http-status-codes');
const Post = require('../models/Post');
const User = require('../models/User');
const { NotFoundError } = require('../errors');

// get all posts
const getAllPosts = async (req, res) => {
  // get all posts and sort them newest first
  const posts = await Post.find().sort('-createdAt');

  // return result, which is posts array
  res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

// get single post
const getPost = async (req, res) => {
  // get postId from url params
  const postId = req.params.id;

  // get post from database
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  // return post object
  res.status(StatusCodes.OK).json({ post });
};

// create a post
const createPost = async (req, res) => {
  //
  // we could use req.user.image to retrieve image url, but when we change user image, we want to create post with new image without logging out and then in.
  // Therefore we fetch this user image url from server first, and then pass it to request body. userId and user name cannot change.
  const { image } = await User.findOne({ _id: req.user.userId });

  // add needed information to request body. Required info is message, createdBy, image and userHandle
  req.body.createdBy = req.user.userId;
  req.body.image = image;
  req.body.userHandle = req.user.name;

  // create post with information in req.body
  const post = await Post.create(req.body);

  // return response - post object
  res.status(StatusCodes.CREATED).json({ post });
};

// update post - not used in our app
const updatePost = async (req, res) => {
  // not needed, but let's keep dummy here
  res.send('update post');
};

// delete post
const deletePost = async (req, res) => {
  const {
    params: { id: postId },
    user: { userId },
  } = req;

  // find and delete post with postId and userId
  const post = await Post.findOneAndRemove({ _id: postId, createdBy: userId });

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  res.status(StatusCodes.OK).send();
};

// get all given user posts
const getAllUserPosts = async (req, res) => {
  // get user name from query
  const {
    query: { name: user },
  } = req;

  // find all posts, created By given user
  const posts = await Post.find({ createdBy: user });

  if (!posts) {
    throw new NotFoundError(`No posts from user ${user}`);
  }

  // return repsonse, array of Posts
  res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAllUserPosts,
};
