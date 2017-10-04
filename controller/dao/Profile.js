const Profile = require('./../../model').Profile;

module.exports =
{
    update: function (account_id,province,district,street,phone,rate,callback) {
        Profile.update({
            province: province,
            district: district,
            street: street,
            phone: phone,
            rate: rate
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
    selectById: function (id,account_id,callback) {
        var condition;
        if (id) {
            condition = {
                id: id
            };
        } else {
            condition = {
                account_id: account_id
            };
        }
        Profile.findOne({
            where: condition
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
