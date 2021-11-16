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
  deletePostComment,deleteAllPostComments,
} = require('../controllers/commentsController');

const {
  like,
  unLike,
  removeAllPostLikes,
} = require('../controllers/likesController');

router.route('/').post(createPost);

router.route('/:id').get(getPost).delete(deletePost).patch(updatePost);

router.route('/:id/comment').post(createComment).delete(deleteAllPostComments);

router.route('/:id/comment/:com').delete(deletePostComment);

router.route('/:id/like').post(like).delete(removeAllPostLikes);

router.route('/:id/like/:like').delete(unLike);

module.exports = router;
