const { models } = require('../../db/sequelize');
const boom = require('@hapi/boom')

class Checklist {

  constructor() {

	}

	async create(data) {
		const newItem = await models.Checklist.create(data);
		return newItem;
	}

	async update(id, changes) {
		const Item = await this.findOne(id);
		const rta = Item.update(changes);
		return rta;
	}

	async findOne(id) {
		const Item = await models.Checklist.findByPk(id);
		if (!Item) {
			boom.notFound('Item not found');
		}

		return Item;
	}

	async find() {
		const rta = await models.Checklist.findAll({
			include: ['user']
		});
		return rta;
	}

	async delete(id) {
		const Item = await this.findOne(id);
		await  Item.destroy(id);
		return { id };
	}
}

module.exports = Checklist;