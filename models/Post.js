const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'Please insert message'],
      maxLength: 255,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    userHandle: {
      type: String,
      required: [true, 'Please provide user name'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    image: {
      type: String,
      required: [true, 'Please provide user image address'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
