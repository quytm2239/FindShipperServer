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
		console.log(password);
		controller.Account.selectByEmail(email,function (err, found) {
			if (err) {
				res.status(500).send(utils.responseWithSuccess(false,err,[]));
			} else {
				if (found && utils.isExactPass(password,found.password)) {
					var token = jwt.sign(found, config.super_secret, {
						expiresIn: 86400 // expires in 24 hours
					});
					var responseContent = utils.responseWithSuccess(true,'Thành công',[found]);
					responseContent.token = token;
					res.status(200).send(responseContent);
				} else {
					res.status(400).send(utils.responseWithSuccess(false,'Email hoặc mật khẩu không chính xác!',[]));
				}
			}
		});
	});
};
