module.exports = function(app,config,afterRouter,controller){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	afterRouter.get('/order', function(req, res) {

		var id	 			= req.query.id;

		if (id && id.length > 0) {
			if (isNaN(id)) {
				res.status(400).send(utils.response('Không tìm thấy order cho id: ' + id,[]));
				return;
			}
		}

		controller.Order.selectById(id,null,null,function(err, found) {
			if (err) {
				res.status(500).send(utils.response(err,[]));
			} else {
				var responseContent = utils.response(errcode.success,found ? [found] : []);
				res.status(200).send(responseContent);
			}
		});
	});

	afterRouter.get('/my-order', function(req, res) {

		var request_id	 	= req.decoded.id;
		var type 			= req.decoded.type;
		var account_id 		= type == config.acc_type.SELLER ? request_id : null;
		var shipper_id 		= type == config.acc_type.SHIPPER ? request_id : null;

		controller.Order.selectById(null,account_id,shipper_id,function(err, found) {
			if (err) {
				res.status(500).send(utils.response(err,[]));
			} else {
				var responseContent = utils.response(errcode.success,found ? [found] : []);
				res.status(200).send(responseContent);
			}
		});
	});
};
