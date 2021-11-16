const express = require('express');
const router = express.Router();

const {
  getUser,
  updateUser,
  deleteUser,
  getAllUserData,
} = require('../controllers/userController');

const { uploadUserImage } = require('../controllers/uploadsController');
const { getAllUserLikes } = require('../controllers/likesController');

router.route('/').get(getUser).patch(updateUser).delete(deleteUser);
router.route('/:id').get(getAllUserData);
router.route('/uploads').post(uploadUserImage);
router.route('/likes').get(getAllUserLikes);

module.exports = router;
