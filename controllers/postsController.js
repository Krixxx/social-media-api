const { StatusCodes } = require('http-status-codes');
const Post = require('../models/Post');
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require('../errors');

// get all posts
const getAllPosts = async (req, res) => {
  const posts = await Post.find().sort('-createdAt'); //or should we sort by -updatedAt ???

  res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

// get single post
const getPost = async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  res.status(StatusCodes.OK).json({ post });
};

// create a post
const createPost = async (req, res) => {
  console.log(req);
  req.body.createdBy = req.user.userId;
  req.body.image = req.user.image;

  const post = await Post.create(req.body);

  res.status(StatusCodes.CREATED).json({ post });
};

// update post
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

  const post = await Post.findOneAndRemove({ _id: postId, createdBy: userId });

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
