const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {}

Card.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
        // add additional columns here
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'card'
    }
);

module.exports = Card;