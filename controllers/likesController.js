const { StatusCodes } = require('http-status-codes');
// import like schema
const Like = require('../models/Like');
// import Post schema
const Post = require('../models/Post');
// import Notification schema
const Notification = require('../models/Notification');

const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require('../errors');

// get all likes - NOT USED
const getAllUserLikes = async (req, res) => {
  const {
    user: { userId },
  } = req;

  // find all likes for given userId
  const likes = await Like.find({ userId: userId });

  if (!likes) {
    throw new NotFoundError('No likes with such user id');
  }

  // send response - likes array
  res.status(StatusCodes.OK).json({ likes });
};

/**
 * Like functionality - we get postId, userId and user name. First we update post by using postId. We increment likeCount. Then we create like, using postId and userId. And then we create notification for recipient user.
 */
const like = async (req, res) => {
  // get postId from url params and userId from authorized user
  const {
    params: { id: postId },
    user: { userId, name },
  } = req;

  // get original post, increment likeCount and update post
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

  // save notification for like
  //  we need to get recipientId, sender name and postId from request, to add notification.
  const notification = await Notification.create({
    recipient: updatePost.createdBy,
    sender: name,
    senderId: userId,
    postId: postId,
    type: 'like',
  });

  if (!notification) {
    throw new NotFoundError('Notification error');
  }

  // send response - like object
  res.status(StatusCodes.CREATED).json({ like });
};

/**
 * Unlike functionality - we update unliked post and we decrease likeCount. We also remove notification.
 */
const unLike = async (req, res) => {
  // get postId and likeId from params and userId from authorized user
  const {
    params: { id: postId, like: likeId },
    user: { userId },
  } = req;

  //   remove like
  const like = await Like.findOneAndRemove({ _id: likeId, postId, userId });

  if (!like) {
    throw new NotFoundError('like does not exist');
  }

  // get original post, increment likeCount and update post
  const updatePost = await Post.findOneAndUpdate(
    { _id: postId },
    { $inc: { likeCount: -1 } },
    { new: true, runValidators: true }
  );

  if (!updatePost) {
    throw new NotFoundError('Please provide correct post id');
  }

  // delete like notification
  const notification = await Notification.findOneAndRemove({
    postId: postId,
    senderId: userId,
  });

  if (!notification) {
    throw new NotFoundError('Notification error');
  }

  // return response
  res.status(StatusCodes.OK).send();
};

// remove all likes and notifications for given post (when deleting post)
const removeAllPostLikes = async (req, res) => {
  const {
    params: { id: postId },
  } = req;

  // delete all likes which have given postId
  const removed = await Like.deleteMany({ postId: postId });

  if (!removed) {
    throw new NotFoundError('There were no likes for that post');
  }

  const removedNotifications = await Notification.deleteMany({
    postId: postId,
  });

  if (!removedNotifications) {
    throw new NotFoundError('There were no notifications for that post');
  }
  // return respose
  res.status(StatusCodes.OK).json({ removed });
};

module.exports = { like, unLike, getAllUserLikes, removeAllPostLikes };
