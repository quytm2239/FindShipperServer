// var sequelize = require('./../../dbconnection/mysql');
// //Create Item Table Structure
//
// var Order = sequelize.define('Order', {
//     id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
//     account_id: Sequelize.INTEGER,
//     status: Sequelize.INTEGER, // (0 open, 1 choosing, 2 delivering, 3 closed, 4 expired)
//     open_time: Sequelize.STRING,
//     close_time: Sequelize.STRING,
//     expired_time: Sequelize.STRING,
//     content: Sequelize.STRING,
//     total: Sequelize.STRING,
//     deposit: Sequelize.STRING, //( tiền cọc cho shipper)
//     from: Sequelize.STRING, //(địa chỉ lấy hàng)
//     to: Sequelize.STRING, //(địa chỉ ship hàng đến)
// });
//
// // force: true will drop the table if it already exists
// Order.sync({force: false}).then(() => {
// });

//-------------------------------------
const Order = require('./../../model').Order;
const sequelize = require('./../../dbconnection/mysql');

module.exports =
{
    create: function (account_id,status,open_time,close_time,expired_time,content,total,deposit,from,to,callback) {
        Order.create({
            account_id: account_id,
            status: status,
            open_time: open_time,
            close_time: close_time,
            expired_time: expired_time,
            content: content,
            total: total,
            deposit: deposit,
            from: from,
            to: to
        }).then(created => {
            callback(null,updated);
        }).catch(err => {
            callback(err,null);
        });
    },
    selectById: function (id,account_id,callback) {
        Order.findOne({
            where: {
                account_id: account_id,
                id: id
            }
        }).then(found => {
            if (found && found.dataValues) {
                callback(null,found.dataValues);
            } else {
                callback(null,null);
            }
        }).catch(err => {
            callback(err,null);
        });
    }
};
