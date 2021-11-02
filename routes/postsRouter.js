const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postsController');

router.route('/').post(createPost).get(getAllPosts);

router.route('/:id').get(getPost).delete(deletePost).patch(updatePost);

module.exports = router;
