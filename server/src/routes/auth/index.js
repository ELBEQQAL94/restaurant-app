const express = require('express');

const router = express.Router();
const {
  signUp,
  logIn,
  getAuth,
} = require('../../controller/auth');

const { validateLoginUser, validateSignUpUser } = require('./auth.middlewares');

// any route in here is pre-pended with /auth
router.get('/', getAuth);

// POST /auth/signup
router.post('/signup', validateSignUpUser, signUp);

// POST /auth/signup
router.post('/login', validateLoginUser, logIn);

module.exports = router;
