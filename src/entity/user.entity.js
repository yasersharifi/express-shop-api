const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize.db');

const UserEntity = sequelize.define(
    'User', 
    {
        fullName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'user',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        tableName: 'user',
    }
);

module.exports = UserEntity;