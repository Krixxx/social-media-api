const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter recipient'],
    },
    sender: {
      type: String,
      required: [true, 'Please enter sender'],
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter sender ID'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Pleaseprovide post ID'],
    },
    type: {
      type: String,
      required: [true, 'Please provide notification type'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);
