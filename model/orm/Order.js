var sequelize = require('./../../dbconnection/mysql');
var Sequelize = require('sequelize');
//Create Item Table Structure

var Order = sequelize.define('Order', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    account_id: Sequelize.INTEGER,
    status: Sequelize.INTEGER, // (0 open, 1 choosing, 2 delivering, 3 closed, 4 expired)
    open_time: Sequelize.STRING,
    close_time: Sequelize.STRING,
    expired_time: Sequelize.STRING,
    content: Sequelize.STRING,
    total: Sequelize.STRING,
    deposit: Sequelize.STRING, //( tiền cọc cho shipper)
    from: Sequelize.STRING, //(địa chỉ lấy hàng)
    to: Sequelize.STRING, //(địa chỉ ship hàng đến)
});

// force: true will drop the table if it already exists
Order.sync({force: false}).then(() => {
});

module.exports = Order;
