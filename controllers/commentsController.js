const { StatusCodes } = require('http-status-codes');
// import comment schema
const Comment = require('../models/Comment');
// import Post schema
const Post = require('../models/Post');

const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require('../errors');

const createComment = async (req, res) => {
  const {
    params: { id: postId },
    user: { userId, image },
    body: { message },
  } = req;

  // get original post, increment commentCount and update post
  const updatePost = await Post.findOneAndUpdate(
    { _id: postId },
    { $inc: { commentCount: 1 } },
    { new: true, runValidators: true }
  );

  if (!updatePost) {
    throw new NotFoundError('Please provide correct post id');
  }

  // save comment to db
  const comment = await Comment.create({ message, postId, userId, image });

  // return response
  res.status(StatusCodes.CREATED).json({ comment });
};

module.exports = { createComment };
