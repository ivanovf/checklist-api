const { models } = require('../../db/sequelize');
const boom = require('@hapi/boom');

class Reservation {
  constructor() {

	}

	async create(data) {
		const newReservation = await models.Reservation.create(data);
		return newReservation;
	}

	async update(id, changes) {
		const reservation = await this.findOne(id);
		const rta = reservation.update(changes);
		return rta;
	}

	async findOne(id) {
		const reservation = await models.Reservation.findByPk(id);
		if (!reservation) {
			boom.notFound('Reservation not found');
		}

		return reservation;
	}

	async find() {
		const rta = await models.Reservation.findAll();
		return rta;
	}

	async delete(id) {
		const Reservation = await this.findOne(id);
		await  Reservation.destroy(id);
		return { id };
	}
}

module.exports = Reservation;