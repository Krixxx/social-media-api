const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, NotFoundError } = require('../errors');

// update user
const updateUser = async (req, res) => {
  const {
    body: { name, image },
    user: { userId },
  } = req;

  if (!image) {
    req.body.image = '/assets/img/default_img.png';
  }

  if (name === '') {
    throw new BadRequestError('User name cannot be empty');
  }

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

  res.status(StatusCodes.OK).json({ user });
};

// delete user
const deleteUser = async (req, res) => {
  console.log(req);
  const {
    user: { userId },
  } = req;

  const user = await User.findOneAndRemove({
    _id: userId,
  });

  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  updateUser,
  deleteUser,
};
