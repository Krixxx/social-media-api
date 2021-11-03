const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'Please insert comment'],
      maxLength: 255,
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Please provide post to comment'],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user id'],
    },
    image: {
      type: String,
      required: [true, 'Please provide user image address'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
