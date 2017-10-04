var sequelize = require('./../../dbconnection/mysql');
var Sequelize = require('sequelize');
//Create Item Table Structure

var Account = sequelize.define('Account', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    type: Sequelize.STRING // 0 - seller, 1 - shipper
});

// force: true will drop the table if it already exists
Account.sync({force: false}).then(() => {
});

module.exports = Account;
