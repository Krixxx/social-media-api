const express = require('express');
const router = express.Router();

// import auth controllers
const { login, register } = require('../controllers/authController');

// register route, with POST method
router.post('/register', register);

// login route, with POST method
router.post('/login', login);

module.exports = router;
