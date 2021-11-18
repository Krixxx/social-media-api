const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, NotFoundError } = require('../errors');

// get current user
const getUser = async (req, res) => {
  // get userId from logged in user data in request
  const {
    user: { userId },
  } = req;

  // find user from db
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }

  // return user object
  res.status(StatusCodes.OK).json({ user });
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
