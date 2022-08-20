const { Model, DataTypes, Sequelize } = require('sequelize');
const RESERVE_TABLE = 'reservations';

const ReservationSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  date: {
    allowNull: false,
    unique: true,
    type: DataTypes.DATEONLY
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
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

class Reservation extends Model {
  static associate() {

  }
  
  static config(sequelize) {
    return {
      sequelize,
      tableName: RESERVE_TABLE,
      modelName: 'Reservation'
    }
  }
}

module.exports = {RESERVE_TABLE, ReservationSchema, Reservation};