// ---------------------------------------------------------
// REGISTER (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var Sequelize = require('sequelize');

module.exports = function(app,config,beforeRouter,controller){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	beforeRouter.post('/register', function(req, res) {

		var email 			= req.body.email;
		var password 		= req.body.password;
		var full_name 		= req.body.full_name;
		var gender 			= req.body.gender;
		var birthday 		= req.body.birthday;
		var province 		= req.body.province;
		var district 		= req.body.district;
		var street 			= req.body.street;
		var phone 			= req.body.phone;
		var type			= req.body.type;

		// Validate email
		if (!(utils.validateEmail(email)))
		{
			res.status(400).send(utils.responseWithSuccess(false,errcode.invalid_email,[]));
			return;
		}

		// Validate password
		if ((utils.isNotNull(password)) && (password.length > 16 || password.length < 8)) {
			res.status(400).send(utils.responseWithSuccess(false,errcode.invalid_password,[]));
			return;
		}

		if (!(utils.checkAge(birthday))) {
			res.status(400).send(utils.responseWithSuccess(false,errcode.invalid_age,[]));
			return;
		}

		// Validate phone
		if (!(utils.isValidPhone(phone))) {
			res.status(400).send(utils.responseWithSuccess(false,errcode.invalid_phone,[]));
			return;
		}

		var password_hash = utils.hashPass(password);
		controller
		.Account_Profile
		.create(email,password_hash,type,full_name,gender,birthday,province,district,street,phone,0,function (err,result) {
			if (err) {
				res.status(500).send(utils.responseWithSuccess(false,errcode.internal_error,[]));
			} else {
				if (result) {
					res.status(200).send(utils.responseWithSuccess(true,errcode.success,[result]));
				} else {
					res.status(400).send(utils.responseWithSuccess(false,errcode.exist_email,[]));
				}
			}
		});
	});
};
