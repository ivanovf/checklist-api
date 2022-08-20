const { models } = require('../../db/sequelize');
const boom = require('@hapi/boom');

class User {
  constructor() {
		this.model = models.User;
	}

	async create(data) {
		try {
			data.password = await crypt.hash(data.password, 5);
			
			console.log(data);
			return await this.model.create(data);
			
		} catch (error) {
			boom.badData('No all data was provided.');
			return null;
		}
	}

	async update(id, changes) {
		const user = await this.model.findOne(id);
		const rta = user.update(changes);
		return rta;
	}

	async findByEmail(email) {
		const user = await this.model.findOne({
			where: { email: email }
		});

		if (!user) {
			boom.notFound('User not found');
		}

		return user;
	}

	async findOne(id) {
		const user = await this.model.findByPk(id);
		if (!user) {
			boom.notFound('User not found');
		}

		return user;
	}

	async find() {
		const rta = await this.model.findAll();
		return rta;
	}

	async delete(id) {
		const user = await this.model.findOne(id);
		await  user.destroy(id);
		return { id };
	}
}

module.exports = User;