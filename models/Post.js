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

// posID - automaatne
// body - 255
// commentCount
// createdAt - automaatne
// likeCount
// user
// userImage

module.exports = mongoose.model('Post', PostSchema);
