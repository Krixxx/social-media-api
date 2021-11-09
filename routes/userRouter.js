const express = require('express');
const router = express.Router();

const {
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const { uploadUserImage } = require('../controllers/uploadsController');
const { getAllUserLikes } = require('../controllers/likesController');

router.route('/').get(getUser).patch(updateUser).delete(deleteUser);
router.route('/uploads').post(uploadUserImage);
router.route('/likes').get(getAllUserLikes);

module.exports = router;
