const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {}

Card.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        api_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        card_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        set_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        card_rarity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        isTrade: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isWant: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'card'
    }
);

module.exports = Card;