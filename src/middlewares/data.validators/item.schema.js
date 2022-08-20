const Joi = require('joi');

const id = Joi.number();
const name = Joi.string();
const status = Joi.boolean();

const createSchema = Joi.object({
  name: name.required(),
  status: status.required()
});

const updateSchema = Joi.object({
  name: name
});

const getSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSchema, updateSchema, getSchema }