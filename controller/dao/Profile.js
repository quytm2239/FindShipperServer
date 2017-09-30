const Profile = require('./../../model').Profile;
const Sequelize = require('sequelize');

module.exports =
{
    update: function (account_id,address,phone,rate,callback) {
        return Profile.create({
            address: address,
            phone: phone,
            rate: rate
        }, {
            where: {
                account_id: account_id
            }
        }).then(updated => {
            return updated;
        }).catch(err => {
            return err;
        });
    },
    selectById: function (id,account_id) {
        return Profile.findOne({
            where: {
                account_id: account_id,
                id: id
            }
        }).then(found => {
            return found;
        }).catch(err => {
            return err;
        });
    }
};
