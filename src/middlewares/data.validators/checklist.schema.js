const Joi = require('joi');
const id = Joi.number();
const status = Joi.boolean();
const observations = Joi.string();

const createSchema = Joi.object({
  itemId: id.required(),
  reservationId: id.required(),
  userId: id.required(),
  status: status.required(),
  observations: observations
});

const updateSchema = Joi.object({
  itemId: id.required(),
  reservationId: id.required(),
  userId: id.required(),
  status: status
});

const getSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSchema, updateSchema, getSchema }