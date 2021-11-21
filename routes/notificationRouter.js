const express = require('express');
const router = express.Router();

// import notification controllers
const {
  getUserActiveNotifications,
  markNotificationsRead,
} = require('../controllers/notificationController');

router.route('/').get(getUserActiveNotifications).patch(markNotificationsRead);

module.exports = router;
