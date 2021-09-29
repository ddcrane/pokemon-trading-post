const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class PostCard extends Model {}

PostCard.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        card_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'card',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post_card',
    }
);

module.exports = PostCard;