// ---------------------------------------------------------
// LOGIN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

module.exports = function(app,config,afterRouter,controller){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	afterRouter.get('/profile', function(req, res) {

		var id	 			= req.query.id;

		if (id && id.length > 0) {
			if (isNaN(id)) {
				res.status(400).send(utils.response('Không tìm thấy profile cho id: ' + id,[]));
				return;
			}
		}
		var account_id	 	= req.decoded.id;

		controller.Profile.selectById(id,account_id,function(err, found) {
			if (err) {
				res.status(500).send(utils.response(err,[]));
			} else {
				var responseContent = utils.response('Thành công',found ? [found] : []);
				res.status(200).send(responseContent);
			}
		});
	});

	afterRouter.post('/profile', function(req, res) {

		var address 		= req.body.address;
		var phone 			= req.body.phone;
		var account_id	 	= req.decoded.id;

		controller.Profile.update(account_id,address,phone,function(err, updated) {
			if (err) {
				res.status(500).send(utils.responseWithSuccess(false, err,[]));
			} else {
				var responseContent = utils.responseWithSuccess(true, 'Thành công',[]);
				res.status(200).send(responseContent);
			}
		});
	});
};
