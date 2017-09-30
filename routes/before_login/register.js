// ---------------------------------------------------------
// REGISTER (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var Sequelize = require('sequelize');

module.exports = function(app,apiRouter,controller){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	apiRouter.post('/register', function(req, res) {

		var email 	= req.body.email;
		var password 		= req.body.password;
		var full_name 		= req.body.full_name;
		var gender 			= req.body.gender;
		var birthday 		= req.body.birthday;
		var address 		= req.body.address;
		var phone 			= req.body.phone;
		var type			= req.body.type;
		// Validate email
		if (!(utils.chkObj(email)) || !(utils.validateEmail(email)))
		{
			res.status(400).send(utils.responseConvention(errcode.code_null_invalid_email,[]));
			return;
		}

		// Validate password
		if (!(utils.chkObj(password))) {
			res.status(400).send(utils.responseConvention(errcode.code_null_invalid_password,[]));
			return;
		}

		// Validate full_name
		if (!(utils.chkObj(full_name))) {
			res.status(400).send(utils.responseConvention(errcode.code_null_invalid_full_name,[]));
			return;
		}

		// Validate gender
		if (!(utils.chkObj(gender)) || isNaN(gender) || gender < 0 || gender > 5) {
			res.status(400).send(utils.responseConvention(errcode.code_null_invalid_gender,[]));
			return;
		}

		// Validate birthday
		if (!(utils.chkObj(birthday)) || !(utils.validateBirthday(birthday)))
		{
			res.status(400).send(utils.responseConvention(errcode.code_null_invalid_birthday,[]));
			return;
		} else {
			if (!(utils.checkAge(birthday))) {
				res.status(400).send(utils.responseConvention(errcode.code_invalid_age,[]));
				return;
			}
		}

		// Validate address
		if (!(utils.chkObj(address))) {
			res.status(400).send(utils.responseConvention(errcode.code_null_invalid_address,[]));
			return;
		}

		// Validate phone
		if (!(utils.chkObj(phone))) {
			res.status(400).send(utils.responseConvention(errcode.code_null_invalid_phone,[]));
			return;
		}

		if (!(utils.chkObj(type))) {
			res.status(400).send(utils.response(errcode.code_null_invalid_account_type,[]));
			return;
		}

		var password_hash = utils.hashPass(password);
		controller
		.Account_Profile
		.create(email,password_hash,type,full_name,gender,birthday,address,phone,0,function (err,result) {
			if (err) {
				res.status(500).send(utils.responseWithSuccess(false,err,[]));
			} else {
				res.status(200).send(utils.responseWithSuccess(true,'Thành công',result));
			}
		});
	});
};
