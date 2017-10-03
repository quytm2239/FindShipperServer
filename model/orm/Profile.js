var sequelize = require('./../../dbconnection/mysql');
var Sequelize = require('sequelize');
//Create Item Table Structure

var Profile = sequelize.define('Profile', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    account_id: Sequelize.STRING,
    full_name: Sequelize.STRING,
    gender: Sequelize.INTEGER, // (0-M,1-F,2-Other)
    birthday: Sequelize.DATE,
    province: Sequelize.STRING,
    district: Sequelize.STRING,
    street: Sequelize.STRING,
    phone: Sequelize.STRING,
    rate: Sequelize.INTEGER
});

// force: true will drop the table if it already exists
Profile.sync({force: false}).then(() => {
});

module.exports = Profile;
