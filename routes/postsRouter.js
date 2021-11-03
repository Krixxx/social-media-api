const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postsController');

const {
  createComment,
  getAllPostComments,
} = require('../controllers/commentsController');

router.route('/').post(createPost).get(getAllPosts);

router.route('/:id').get(getPost).delete(deletePost).patch(updatePost);

router.route('/:id/comment').post(createComment).get(getAllPostComments);

module.exports = router;
