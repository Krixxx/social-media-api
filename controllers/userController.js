const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const Like = require('../models/Like');
const Notification = require('../models/Notification');
const { BadRequestError, NotFoundError } = require('../errors');

// get current user
const getUser = async (req, res) => {
  // get userId from logged in user data in request
  const {
    user: { userId },
  } = req;

  let userData = {};

  // find user from db
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }

  if (user) {
    userData.user = user;
  } else {
    userData.user = {};
  }

  //get all user likes and add them to user object
  const likes = await Like.find({ userId: userId });

  if (!likes) {
    throw new NotFoundError('No likes with such user id');
  }
  //set likes to user object
  if (likes) {
    userData.likes = likes;
  } else {
    userData.likes = [];
  }

  const notifications = await Notification.find(
    {
      //find all notifications, where:
      recipient: user, //recipient is current user
      read: false, //notification is not read
      senderId: { $ne: user }, //sender id is not equal to current user
    },
    { updatedAt: 0, senderId: 0, __v: 0, read: 0 } //exclude these fields from returned result
  ).sort('-createdAt'); //sort newest first

  if (!notifications) {
    throw new NotFoundError(`No active notifications for user ${userId}`);
  }

  if (notifications) {
    userData.notifications = notifications;
  } else {
    userData.notifications = [];
  }

  // return user object
  res.status(StatusCodes.OK).json({ user, userData });
};

// Get given user data - actually it is the same, but here we fetch userId from url params
const getAllUserData = async (req, res) => {
  // get userId from url params
  const {
    params: { id: userId },
  } = req;

  // find user from db
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }

  // return user object
  res.status(StatusCodes.OK).json({ user });
};

// update user - we cannot change name, email or password, but we can change location, image, website address.
const updateUser = async (req, res) => {
  const {
    body: { name, image },
    user: { userId },
  } = req;

  // set default image address. Image must be located in the same address in frontent folder
  if (!image) {
    req.body.image = '/assets/img/default_img.png';
  }

  if (name === '') {
    throw new BadRequestError('User name cannot be empty');
  }

  // find user by userId and send req.body with new data
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }

  // return updated user object
  res.status(StatusCodes.OK).json({ user });
};

// delete user - not used in our project
const deleteUser = async (req, res) => {
  // get userId from user object in req
  const {
    user: { userId },
  } = req;

  // find user and remove
  const user = await User.findOneAndRemove({
    _id: userId,
  });

  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getAllUserData,
};
