const { findUserIfExists, createNewUser } = require('./helpers');

exports.getAuth = (req, res) => {
  res.json({
    message: 'hello, auth route',
  });
};

// POST /auth/signup
exports.signUp = (req, res, next) => {
  createNewUser(req, res, next);
};

// POST /auth/signup
exports.logIn = (req, res, next) => {
  findUserIfExists(req, res, next);
};
