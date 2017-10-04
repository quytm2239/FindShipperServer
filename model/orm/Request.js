var sequelize = require('./../../dbconnection/mysql');
var Sequelize = require('sequelize');
//Create Item Table Structure

var Request = sequelize.define('Request', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    account_id: Sequelize.INTEGER,
    shipper_id: Sequelize.INTEGER,
    order_id: Sequelize.INTEGER,
    come_time: Sequelize.INTEGER,
    fee: Sequelize.INTEGER
});

// force: true will drop the table if it already exists
Request.sync({force: false}).then(() => {
});

module.exports = Request;
