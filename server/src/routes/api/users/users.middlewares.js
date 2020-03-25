const Joi = require('joi');
const schema = require('./users.schema');

const validateUser = (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    next();
  } else {
    const error = new Error(result.error.details[0].message);
    res.status(422);
    next(error);
  }
};

module.exports = validateUser;
