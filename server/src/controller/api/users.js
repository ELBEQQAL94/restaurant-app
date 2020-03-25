const { findUsers, findUserById } = require('./helpers/users');

// Route to list all USERS
// @admin.route()
// GET Request /api/v1/users
// ------------------------------------
exports.listAllUsers = (req, res, next) => {
  findUsers(req, res, next);
};

// Route to update the user
// @admin.route()
// Update USER by Request to PUT /api/v1/users/:id
// ----------------------------------------------
exports.updateUser = (req, res, next) => {
  findUserById(req, res, next);
};
