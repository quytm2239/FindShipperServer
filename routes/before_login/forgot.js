// ---------------------------------------------------------
// FORGOT (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

module.exports = function(app,config,beforeRouter,controller){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	beforeRouter.post('/forgot', function(req, res) {

		var email = req.body.email;

		// Validate email
		if (!(utils.chkObj(email)) || !(utils.validateEmail(email)))
		{
			res.status(400).send(utils.responseConvention(errcode.code_null_invalid_email,[]));
			return;
		}

		controller.Account.selectByEmail(email,function (err, found) {
			console.log(err);
			if (err) {
				res.status(400).send(utils.responseWithSuccess(false,err,[]));
			} else {
				if (found) {
					var randomPassword = Math.random().toString(36).slice(-8);
					controller.Account.changePassword(email,utils.hashPass(randomPassword),function(err,result) {
						if (err) {
							res.status(500).send(utils.responseWithSuccess(false,err,[]));
						} else {
							utils.sendMailResetPass(email,randomPassword);
							res.status(200).send(utils.responseWithSuccess(true,'Thành công, xin vui lòng check mail để lấy mật khẩu mới',result));
						}
					});
				} else {
					res.status(400).send(utils.responseWithSuccess(false,'Email không tồn tại!',[]));
				}
			}
		});
	});
};
