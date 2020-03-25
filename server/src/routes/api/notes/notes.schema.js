const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .required(),
  description: Joi.string()
    .trim()
    .required(),
});
module.exports = schema;
