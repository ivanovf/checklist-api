const { models } = require('../../db/sequelize');
const boom = require('@hapi/boom')

class Item {

  constructor() {

	}

	async create(data) {
		const newItem = await models.Item.create(data);
		return newItem;
	}

	async update(id, changes) {
		const Item = await this.findOne(id);
		const rta = Item.update(changes);
		return rta;
	}

	async findOne(id) {
		const Item = await models.Item.findByPk(id);
		if (!Item) {
			boom.notFound('Item not found');
		}

		return Item;
	}

	async find() {
		const rta = await models.Item.findAll();
		return rta;
	}

	async delete(id) {
		const Item = await this.findOne(id);
		await  Item.destroy(id);
		return { id };
	}
}

module.exports = Item;