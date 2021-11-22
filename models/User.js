const mongoose = require('mongoose');

// import hashing library
const bcrypt = require('bcryptjs');

// import web token library
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, //this is how we check for regex match
        'Please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minLength: 6,
    },
    image: {
      type: String,
      required: [true, 'Please provide image'],
      default: '/assets/img/default_img.png',
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  { timestamps: true }
);

//we use mongoose middleware for hashing password
// pre save means, that this middleware is run before saving document to db
// basically this generates and passes hashed password to database, on the creation moment.
UserSchema.pre('save', async function () {
  //we use function, because we need to use keyword 'this'

  // set up salt, for hashing password (salt means random bytes) genSalt(10) is default size.
  const salt = await bcrypt.genSalt(10);

  // we hash our password
  this.password = await bcrypt.hash(this.password, salt);

  // we do not have to call next() when using mongoose 5.*
});

// we create new user schema method for creating web token
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, image: this.image },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// we create new user schema method for comparing passwords when trying to log in
UserSchema.methods.comparePassword = async function (candidatePassword) {
  // we use compare method. candidatePassword is the one which we get from login
  // we return true or false
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
