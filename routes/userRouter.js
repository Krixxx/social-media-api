const express = require('express');
const router = express.Router();

const {
  getUser,
  updateUser,
  deleteUser,
  getAllUserData,
} = require('../controllers/userController');

const { uploadUserImage } = require('../controllers/uploadsController');

router.route('/').get(getUser).patch(updateUser).delete(deleteUser);
router.route('/user/:id').get(getAllUserData);
router.route('/uploads').post(uploadUserImage);

module.exports = router;
