const Account = require('./../../model').Account;

module.exports =
{
    changePassword: function (email,new_password,callback) {
        Account.update({
            password: new_password,
        }, {
            where: {
                email: email
            }
        }).then(updated => {
            callback(null,updated);
            console.log(updated);
        }).catch(err => {
            callback(err,null);
            console.log(err);
        });
    },
    selectByEmail: function (email,callback) {
        Account.findOne({
            where: {
                email: email,
            }
        }).then(found => {
            if (found && found.dataValues) {
                callback(null,found.dataValues);
            } else {
                callback(null,null);
            }
        }).catch(err => {
            callback(err,null);
        })
    }
};
