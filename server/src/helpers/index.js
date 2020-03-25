const jwt = require('jsonwebtoken');

// page not found
function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

// handle errors
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(req.statusCode || 500);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
}

// display 422 error
function showError(res, next, message) {
  res.status(422);
  const error = new Error(message);
  next(error);
}

// create token send response
// sign Token
function createTokenSendResponse(user, secret, res, next, message) {
  // create token for user
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  jwt.sign(payload, secret, { expiresIn: '1d' }, (err, token) => {
    if (err) {
      showError(res, next, message);
    }

    // res.cookie('access_token', token, {
    //   maxAge: 86400,
    //   httpOnly: true,
    //   // secure: true
    // });

    res.json({ token });
  });
}

function getUsersWithoutAdminAccount(users, email) {
  return users.filter((user) => user.email !== email);
}

module.exports = {
  notFound,
  errorHandler,
  showError,
  createTokenSendResponse,
  getUsersWithoutAdminAccount,
};
