const { Model, DataTypes, Sequelize } = require('sequelize');
const ITEM_TABLE = 'items';

const ItemSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    defaultValue: true,
    type: DataTypes.BOOLEAN
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
};

class Item extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ITEM_TABLE,
      modelName: 'Item'
    }
  }
}

module.exports = {ITEM_TABLE, ItemSchema, Item};