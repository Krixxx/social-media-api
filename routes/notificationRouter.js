const express = require('express');
const router = express.Router();

// import notification controllers
const {
  markNotificationsRead,
} = require('../controllers/notificationController');

router.route('/').patch(markNotificationsRead);

module.exports = router;
