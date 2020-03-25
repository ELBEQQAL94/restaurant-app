const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../../models/User');
const { showError, createTokenSendResponse } = require('../../../helpers');

// secret code
const secret = process.env.jwtSecrete;

const tokenError = "You couldn't create TOKEN.";


function findUserIfExists(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      next(err);
    }

    // check user is in db
    if (user && user.active) {
      // compare password
      bcrypt.compare(password, user.password).then((data) => {
        // if result is true, the password is correct
        if (data) {
          createTokenSendResponse(user, secret, res, next, tokenError);
        } else {
          // else return error
          showError(res, next, 'Password is incorrect.');
        }
      });
    } else {
      // user not existe
      showError(res, next, `${email} Not Found.`);
    }
  });
}

function createNewUser(req, res, next) {
  const { username, email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      next(err);
    }

    // make email is unique
    if (user) {
      showError(res, next, `${email} is already exists.`);
    } else {
      // hash password before save it
      // Auto-gen a salt and hash
      bcrypt.hash(password, 12).then((hash) => {
        // create token to new user
        jwt.sign(
          { email, hash },
          secret,
          { expiresIn: '1d' },
          (error, token) => {
            if (error) {
              showError(res, next, tokenError);
            }

            // res.cookie('access_token', token, {
            //   maxAge: 86400,
            //   httpOnly: true,
            //   // secure: true
            // });

            // create new user
            const newUser = new User({
              username,
              email,
              password: hash,
              active: true,
              role: 'user',
            });

            // insert user to db
            newUser.save().then((data) => {
              data.password = undefined;
              data.__v = undefined;

              res.status(200).json({
                token,
                user: newUser,
              });
            });
          },
        );
      });
    }
  });
}

module.exports = { findUserIfExists, createNewUser };
