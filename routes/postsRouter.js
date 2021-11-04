const express = require('express');
const router = express.Router();

const {
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postsController');

const {
  createComment,
  deletePostComment,
} = require('../controllers/commentsController');

const { like, unLike } = require('../controllers/likesController');

router.route('/').post(createPost);

router.route('/:id').get(getPost).delete(deletePost).patch(updatePost);

router.route('/:id/comment').post(createComment);

router.route('/:id/comment/:com').delete(deletePostComment);

router.route('/:id/like').post(like);

router.route('/:id/like/:like').delete(unLike);

module.exports = router;
