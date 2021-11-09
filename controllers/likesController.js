const { StatusCodes } = require('http-status-codes');
// import like schema
const Like = require('../models/Like');
// import Post schema
const Post = require('../models/Post');

const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require('../errors');

// get all likes
const getAllUserLikes = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const likes = await Like.find({ userId: userId });

  if (!likes) {
    throw new NotFoundError('No likes with such user id');
  }
  res.status(StatusCodes.OK).json({ likes });
};

// save like
const like = async (req, res) => {
  const {
    params: { id: postId },
    user: { userId },
  } = req;

  // get original post, increment commentCount and update post
  const updatePost = await Post.findOneAndUpdate(
    { _id: postId },
    { $inc: { likeCount: 1 } },
    { new: true, runValidators: true }
  );

  if (!updatePost) {
    throw new NotFoundError('Please provide correct post id');
  }

  //   save like
  const like = await Like.create({ postId, userId });

  res.status(StatusCodes.CREATED).json({ like });
};

// unlike
const unLike = async (req, res) => {
  const {
    params: { id: postId, like: likeId },
    user: { userId },
  } = req;

  //   remove like
  const like = await Like.findOneAndRemove({ _id: likeId, postId, userId });

  if (!like) {
    throw new NotFoundError('like does not exist');
  }
  // get original post, increment commentCount and update post
  const updatePost = await Post.findOneAndUpdate(
    { _id: postId },
    { $inc: { likeCount: -1 } },
    { new: true, runValidators: true }
  );

  if (!updatePost) {
    throw new NotFoundError('Please provide correct post id');
  }

  res.status(StatusCodes.OK).send();
};

module.exports = { like, unLike, getAllUserLikes };
