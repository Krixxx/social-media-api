const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const Notification = require('../models/Notification');

// mark notifications read
const markNotificationsRead = async (req, res) => {
  // this function must receive an array of notificationId's.

  // then it must change each notification read: false

  res.send('marked notifications as read!');
};

// get all current user active notifications - NOT USED IN PROJECT
const getUserActiveNotifications = async (req, res) => {
  const user = req.user.userId;

  const notifications = await Notification.find(
    {
      //find all notifications, where:
      recipient: user, //recipient is current user
      read: false, //notification is not read
      senderId: { $ne: user }, //sender id is not equal to current user
    },
    { updatedAt: 0, senderId: 0, __v: 0, read: 0 } //exclude these fields from returned result
  ).sort('-createdAt'); //sort newest first

  if (!notifications) {
    throw new NotFoundError(`No active notifications for user ${userId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ notifications, count: notifications.length });
};

module.exports = {
  markNotificationsRead,
  getUserActiveNotifications,
};
