const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// register user controller
const register = async (req, res) => {
  const user = await User.create({
    ...req.body,
  });

  // here we use User.Schema method to generate web token
  const token = user.createJWT();

  // return response from server
  // token should be always in response, other info depends how we want to set it up in front-end
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

// login user controller
const login = async (req, res) => {
  // get email and password from request
  const { email, password } = req.body;

  // throw error, if email or password are missing
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // check for the user from the database
  const user = await User.findOne({ email });

  // if user doesn't exist, throw error
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  // if user exists, compare password
  const isPasswordCorrect = await user.comparePassword(password);

  // if password is false, throw error
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  // is user exists and password matches, we generate token and send back response
  const token = user.createJWT();

  // send back response
  // token should be always in response, other info depends how we want to set it up in front-end
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
