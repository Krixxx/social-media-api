const express = require('express');
const router = express.Router();

const { getAllPosts } = require('../controllers/postsController');
const { getAllPostComments } = require('../controllers/commentsController');

router.route('/').get(getAllPosts);

router.route('/:id/comment').get(getAllPostComments);

module.exports = router;
