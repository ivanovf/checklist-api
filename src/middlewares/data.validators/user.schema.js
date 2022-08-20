const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string();

const createSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateSchema = Joi.object({
  email: email,
});

const getSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSchema, updateSchema, getSchema }