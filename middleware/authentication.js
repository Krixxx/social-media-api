const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check header and assing it to a variable
  const authHeader = req.headers.authorization;

  // if authHeader is missing or it doesn't start correctly, we throw new error
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  // if all OK, we create token
  const token = authHeader.split(' ')[1];

  // now we verify token
  try {
    // get the payload and verify it with our secret
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user to forward it to job routes
    req.user = {
      userId: payload.userId,
      name: payload.name,
      image: payload.image,
    };

    // pass the user to the job routes
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;
