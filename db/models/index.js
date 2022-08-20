const { User, UserSchema } = require('./user.model');
const { Item, ItemSchema } = require('./item.model');
const { Reservation, ReservationSchema } = require('./reservation.model');
const { Checklist, checklistSchema } = require('./checklist.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Item.init(ItemSchema, Item.config(sequelize));
    Checklist.init(checklistSchema, Checklist.config(sequelize));
    Reservation.init(ReservationSchema, Reservation.config(sequelize));
    Checklist.associate(sequelize.models);
}

module.exports = setupModels;