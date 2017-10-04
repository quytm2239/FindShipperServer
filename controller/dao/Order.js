const Order = require('./../../model').Order;
const sequelize = require('./../../dbconnection/mysql');
const Op = require('sequelize').Op;

module.exports =
{
    create: function (account_id,shipper_id,status,open_time,close_time,expired_time,content,total,deposit,from,to,callback) {
        Order.create({
            account_id: account_id,
            shipper_id: shipper_id,
            status: status, //(0 - open, 1 - choosing, 2 - delivering, 3 - closed, 4 - expired)
            open_time: open_time,
            close_time: close_time,
            expired_time: expired_time,
            content: content,
            total: total,
            deposit: deposit,
            from: from,
            to: to
        }).then(created => {
            callback(null,created);
        }).catch(err => {
            callback(err,null);
        });
    },
    selectById: function (id,account_id,shipper_id,callback) {
        Order.findOne({
            where: {
                account_id: account_id,
                shipper_id: shipper_id,
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
    },
    update: function (account_id,shipper_id,status,open_time,close_time,expired_time,content,total,deposit,from,to,callback) {
        Order.update({
            shipper_id  : shipper_id,
            status      : status, //(0 - open, 1 - choosing, 2 - delivering, 3 - closed, 4 - expired)
            open_time   : open_time,
            close_time  : close_time,
            expired_time: expired_time,
            content     : content,
            total       : total,
            deposit     : deposit,
            from        : from,
            to          : to
        }, {
            where: {
                account_id: account_id
            }
        }).then(updated => {
            callback(null,updated);
            console.log(updated);
        }).catch(err => {
            callback(err,null);
            console.log(err);
        });
    },
    updatePartial: function (account_id,shipper_id,pStatus,pClose_time,pExpired_time,callback) {
        var status = pStatus, //(0 - open, 1 - choosing, 2 - delivering, 3 - closed, 4 - expired)
            open_time = null,
            close_time = pClose_time,
            expired_time = pExpired_time,
            content = null,
            total = null,
            deposit = null,
            from = null,
            to = null;
        module.exports.update(account_id,shipper_id,status,open_time,close_time,expired_time,content,total,deposit,from,to,callback);
    },
    scheduleUpdateStatus: function (callback) {
        Order.update({
            status: 4, //(0 - open, 1 - choosing, 2 - delivering, 3 - closed, 4 - expired)
        }, {
            where: {
                expired_time: {
                  [Op.gt]: new Date()
                }
            }
        }).then(updated => {
            callback(null,updated);
            console.log(updated);
        }).catch(err => {
            callback(err,null);
            console.log(err);
        });
    }
};
