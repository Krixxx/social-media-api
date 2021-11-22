const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const Notification = require('../models/Notification');

// mark notifications read. We must pass request body with following structure: {"_id":["NotificationId", "NotificationId" ,"NotificationId"]}
const markNotificationsRead = async (req, res) => {
  // Get list of notification ID's
  const notificationIds = req.body._id;

  // then it must change each notification read: true
  const notifications = await Notification.updateMany(
    {
      _id: {
        $in: notificationIds,
      },
    },
    { read: true }
  );

  if (!notifications) {
    throw new NotFoundError(`No notifications with given ID's`);
  }

  res.status(StatusCodes.OK).send();
};

// get all current user active notifications - NOT USED IN PROJECT, moved directly to userController
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
