const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Like', LikeSchema);
