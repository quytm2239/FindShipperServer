const Account = require('./../../model').Account;
const Profile = require('./../../model').Profile;

const sequelize = require('./../../dbconnection/mysql');

module.exports =
{
    create: function (email,password,type,full_name,gender,birthday,address,phone,rate,callback) {
        Account
        .findOne({
            where: {
                email:email
            }
        }).then(account => {
            console.log(account);
            if (account && account.dataValues) {
                // [EXIST], do nothing, just return a error message
                callback('Email đã tồn tại',null);
            } else {
                var temp = birthday.split('/');
                //YYYY-MM-DDTHH:MM:SS
                var dateStr = temp[2] + '-' + temp[1] + '-' + temp[0] + 'T' + '12:00:00';
                var correctBirthday = new Date(dateStr);
                console.log(correctBirthday);
                sequelize.transaction().then(function (t) {
                    return Account.create({
                        email: email,
                        password: password,
                        type: type
                    }, {transaction: t}).then(function (account) {
                        return Profile.create({
                            account_id: account.dataValues.id,
                            full_name: full_name,
                            gender: gender,
                            birthday: correctBirthday,
                            address: address,
                            phone: phone,
                            rate: rate
                            }, {transaction: t}
                        );
                    }).then(function (value) {
                        // console.log(value);
                        t.commit();
                        callback(null,value);
                    }).catch(function (err) {
                        console.log(err);
                        t.rollback();
                        callback(err,null);
                    });
                });
            }
        }).catch(err => { // ERROR when check email exist or not
            callback(err,null);
            return;
        });
    }
};
