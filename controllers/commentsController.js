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
    user: { userId, image, name },
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
  const comment = await Comment.create({ message, postId, userId, image, userHandle:name });

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

const deletePostComment = async (req, res) => {
  const {
    params: { id: postId, com: commentId },
    user: { userId },
  } = req;

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

  res.status(StatusCodes.OK).send();
};

const deleteAllPostComments = async (req, res) =>{

const {
  params:{id:postId}
}= req

const removed = await Comment.deleteMany({postId:postId})

if (!removed) {
    throw new NotFoundError('There were no comments for that post');
  }

  res.status(StatusCodes.OK).json({ removed });

}

module.exports = { createComment, getAllPostComments, deletePostComment, deleteAllPostComments };
