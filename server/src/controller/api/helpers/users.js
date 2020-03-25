const bcrypt = require('bcryptjs');

const User = require('../../../models/User');

const { getUsersWithoutAdminAccount } = require('../../../helpers');

function findUsers(req, res, next) {
  const { email } = req.user;
  return User.find()
    .select('-password')
    .sort({ date: -1 })
    .then((users) => {
      if (!users) {
        res.json({
          message: 'No Users Found.',
        });
      } else {
        // return all users without admin account
        users = getUsersWithoutAdminAccount(users, email);
        res.json({
          users,
        });
      }
    })
    .catch((err) => next(err));
}

function findUserById(req, res, next) {
  const { email } = req.body;
  const { id } = req.params;
  // validate the id params
  // find the user with the request id
  // validate the req.body
  User.findById(id)
    .then((user) => {
      // if not exists - send 404 error (with user not found)
      if (!user) {
        const error = new Error('User Not Found.');
        res.status(404);
        next(error);
      } else {
        // check if user enter a email already existe
        // I'am HERE..
        User.findOne({ email }, async (err, data) => {
          if (data) {
            // if there is a user
            const error = new Error('This email already token.');
            res.status(422);
            next(error);
          } else {
            // hashed password before insert it to db
            if (req.body.password) {
              req.body.password = await bcrypt.hash(req.body.password, 12);
            }

            // if valid update the user in db
            const updateUser = await User.findOneAndUpdate(
              { _id: id },
              { $set: req.body },
              { useFindAndModify: false },
            );

            updateUser.password = undefined;

            res.json({
              message: 'User updated.',
              updateUser,
            });
          }
        });
      }
    })
    .catch((err) => next(err));
}

module.exports = { findUsers, findUserById };
