const sequelize = require('sequelize');

const database = new sequelize.Sequelize('chatApp','root','root',{
    dialect: 'mysql',
    host: 'localhost'
});


module.exports = database;