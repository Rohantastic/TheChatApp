const Sequelize = require('sequelize');
const database = require('../config/database');

const Message = database.define('message',{
    id : {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull : true
    },
    message:{
        type: Sequelize.DataTypes.STRING,
        allowNull : true
    }
});


module.exports = Message;