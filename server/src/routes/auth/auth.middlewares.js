const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { signUpSchema, loginSchema } = require('./auth.schema');

// secret code
const secret = process.env.jwtSecrete;

function IsLoogedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    const error = new Error('unauthorized.');
    res.status(401);
    next(error);
  }
}

function checkTokenSetUser(req, res, next) {
  const authHeader = req.get('authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (token) {
      jwt.verify(token, secret, (error, user) => {
        if (error) {
          next(error);
        }

        req.user = user;

        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
}

function isAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    next();
  } else {
    const error = new Error('unauthorized.');
    res.status(401);
    next(error);
  }
}


const validateSignUpUser = (req, res, next) => {
  const result = Joi.validate(req.body, signUpSchema);
  if (result.error === null) {
    next();
  } else {
    const error = new Error(result.error.details[0].message);
    res.status(422);
    next(error);
  }
};

const validateLoginUser = (req, res, next) => {
  const result = Joi.validate(req.body, loginSchema);
  if (result.error === null) {
    next();
  } else {
    const error = new Error(result.error.details[0].message);
    res.status(422);
    next(error);
  }
};


module.exports = {
  checkTokenSetUser,
  IsLoogedIn,
  isAdmin,
  validateSignUpUser,
  validateLoginUser,
};
