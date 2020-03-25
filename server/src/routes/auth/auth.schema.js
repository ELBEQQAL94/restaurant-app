const Joi = require('joi');

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().trim().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().min(6).required(),
});

module.exports = { signUpSchema, loginSchema };
