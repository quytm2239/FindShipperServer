// ---------------------------------------------------------
// LOGIN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

module.exports = function(app,config,beforeRouter,controller){
	var jwt = require('jsonwebtoken');
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	beforeRouter.post('/login', function(req, res) {
		console.log('/login: ' + req.body.email);

		var email 			= req.body.email;
		var password 		= req.body.password;
		// var device_token	= req.body.device_token;

		// Validate email_login
		if (!(utils.isNotNull(email)) || !(utils.validateEmail(email)))
		{
			res.status(400).send(utils.responseWithSuccess(false,errcode.wrong_email_password,[]));
			return;
		}

		// Validate password
		if (!(utils.isNotNull(password))) {
			res.status(400).send(utils.responseWithSuccess(false,errcode.wrong_email_password,[]));
			return;
		}
		console.log(password);
		controller.Account.selectByEmail(email,function (err, found) {
			if (err) {
				res.status(500).send(utils.responseWithSuccess(false,errcode.internal_error,[]));
			} else {
				if (found && utils.isExactPass(password,found.password)) {
					var token = jwt.sign(found, config.super_secret, {
						expiresIn: 86400 // expires in 24 hours
					});
					var responseContent = utils.responseWithSuccess(true,errcode.success,[found]);
					responseContent.token = token;
					res.status(200).send(responseContent);
				} else {
					res.status(400).send(utils.responseWithSuccess(false,errcode.wrong_email_password,[]));
				}
			}
		});
	});
};
