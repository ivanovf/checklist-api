'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');
const { ItemSchema, ITEM_TABLE } = require('../models/item.model');
const { checklistSchema, CL_TABLE } = require('../models/checklist.model');
const { ReservationSchema, RESERVE_TABLE } = require('../models/reservation.model');

module.exports = {
  async up (queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(ITEM_TABLE, ItemSchema);
    await queryInterface.createTable(RESERVE_TABLE, ReservationSchema);
    await queryInterface.createTable(CL_TABLE, checklistSchema);
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(ITEM_TABLE);
    await queryInterface.dropTable(RESERVE_TABLE);
    await queryInterface.dropTable(CL_TABLE);
  }
};
