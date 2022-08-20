const { Model, DataTypes, Sequelize } = require('sequelize');
const CL_TABLE = 'checklist';

const checklistSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  itemId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'items',
      key: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  },
  reservationId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'reservations',
      key: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  },
  status: {
    allowNull: false,
    defaultValue: true,
    type: DataTypes.BOOLEAN
  },
  observations: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
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

class Checklist extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'})
  }
  
  static config(sequelize) {
    return {
      sequelize,
      tableName: CL_TABLE,
      modelName: 'Checklist'
    }
  }
}

module.exports = {CL_TABLE, checklistSchema, Checklist};