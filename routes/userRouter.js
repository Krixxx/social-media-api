const express = require('express');
const router = express.Router();

const {
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const { uploadUserImage } = require('../controllers/uploadsController');

router.route('/').get(getUser).patch(updateUser).delete(deleteUser);
router.route('/uploads').post(uploadUserImage);

module.exports = router;
