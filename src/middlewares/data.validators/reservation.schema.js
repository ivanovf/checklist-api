const Joi = require('joi');

const id = Joi.number().integer();
const date = Joi.string();
const description = Joi.string();


const createSchema = Joi.object({
  date: date.required(),
  description: description,
});

const updateSchema = Joi.object({
  date: date,
});

const getSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSchema, updateSchema, getSchema }