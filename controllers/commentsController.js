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

  // update original post and add comment count

  // get initial post
  const initialPost = await Post.findOne({ _id: postId });

  // check, if we receive post
  if (!initialPost) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  // destructure current comment count
  const { commentCount: initialCommentCount } = initialPost;

  // get original post and update comment count
  await Post.findOneAndUpdate(
    { _id: postId },
    { commentCount: initialCommentCount + 1 },
    { new: true, runValidators: true }
  );

  // save comment to db
  const comment = await Comment.create({ message, postId, userId, image });

  // return response
  res.status(StatusCodes.CREATED).json({ comment });
};

module.exports = { createComment };
