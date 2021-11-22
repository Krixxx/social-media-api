const { StatusCodes } = require('http-status-codes');
// import comment schema
const Comment = require('../models/Comment');
// import Post schema
const Post = require('../models/Post');
// import Notification Schema
const Notification = require('../models/Notification');

const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require('../errors');

// create comment and also create notification for comment
const createComment = async (req, res) => {
  // get needed values from url params, user and req body.
  const {
    params: { id: postId },
    user: { userId, image, name },
    body: { message },
  } = req;

  // get original post, increment commentCount and update post
  const updatePost = await Post.findOneAndUpdate(
    { _id: postId },
    { $inc: { commentCount: 1 } },
    { new: true, runValidators: true }
  );

  // if no original post found, throw error
  if (!updatePost) {
    throw new NotFoundError('Please provide correct post id');
  }

  // save comment to db
  const comment = await Comment.create({
    message,
    postId,
    userId,
    image,
    userHandle: name,
  });

  // save notification for comment
  //  we need to get recipientId, sender name and postId from request, to add notification.
  const notification = await Notification.create({
    recipient: updatePost.createdBy,
    sender: name,
    senderId: userId,
    postId: postId,
    type: 'comment',
  });

  if (!notification) {
    throw new NotFoundError('Notification error');
  }

  // return response
  res.status(StatusCodes.CREATED).json({ comment });
};

// get all comments for specified post
const getAllPostComments = async (req, res) => {
  // find all comments with given postId
  const allCommentsOnPost = await Comment.find({ postId: req.params.id }).sort(
    '-createdAt'
  );

  // return all comments and also count of comments
  res
    .status(StatusCodes.OK)
    .json({ allCommentsOnPost, count: allCommentsOnPost.length });
};

// delete post comment, postId and commentId needs to be passed through url params
const deletePostComment = async (req, res) => {
  // get needed values
  const {
    params: { id: postId, com: commentId },
    user: { userId },
  } = req;

  // find a comment from db, which has correct commentId and also userId matches
  const comment = await Comment.findOneAndRemove({
    _id: commentId,
    userId,
  });

  if (!comment) {
    throw new NotFoundError(`No comment with id ${commentId}`);
  }

  // get original post, decrement commentCount and update post
  const updatePost = await Post.findOneAndUpdate(
    { _id: postId },
    { $inc: { commentCount: -1 } },
    { new: true, runValidators: true }
  );

  if (!updatePost) {
    throw new NotFoundError('Please provide correct post id');
  }

  // send response
  res.status(StatusCodes.OK).send();
};

// delete all post comments (when deleting a post)
const deleteAllPostComments = async (req, res) => {
  // get postId from url param
  const {
    params: { id: postId },
  } = req;

  // delete all comments that have same postId parameter
  const removed = await Comment.deleteMany({ postId: postId });

  if (!removed) {
    throw new NotFoundError('There were no comments for that post');
  }

  // send reponse
  res.status(StatusCodes.OK).json({ removed });
};

module.exports = {
  createComment,
  getAllPostComments,
  deletePostComment,
  deleteAllPostComments,
};
