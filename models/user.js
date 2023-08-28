const Sequelize = require('sequelize');
const database = require('../config/database');

const User = database.define('User',{
    id : {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull : true
    },
    name:{
        type: Sequelize.DataTypes.STRING,
        allowNull : true
    },
    phone:{
        type: Sequelize.DataTypes.STRING,
        allowNull : true
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull : true
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull : true
    }
});


module.exports = User;