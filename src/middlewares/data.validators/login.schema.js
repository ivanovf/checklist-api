const Joi = require('joi');

const st = Joi.string();

const loginSchema = Joi.object({
  username: st.required(),
  password: st.required()
});

module.exports = loginSchema;