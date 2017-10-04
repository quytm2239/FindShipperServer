// ---------------------------------------------------------
// LOGIN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

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

	afterRouter.post('/add-order', function(req, res) {

		var account_id		= req.decoded.id;
		var type 			= req.decoded.type;
		var status			= config.order_status.OPENING; // req.body.status; //(0 - open, 1 - choosing, 2 - delivering, 3 - closed, 4 - expired)
		var open_time		= new Date(); // req.body.open_time;
		var close_time 		= null;
		var expired_time	= req.body.expired_time; // seconds
		var content			= req.body.content;
		var total			= req.body.total;
		var deposit			= req.body.deposit;
		var from			= req.body.from;
		var to				= req.body.to;

		if (type == config.acc_type.SHIPPER) {
			res.status(400).send(utils.responseWithSuccess(false, errcode.not_allow_shipper_open,[]));
			return;
		}

		if (
			( utils.isNotNull(total) == false || utils.isNotNull(deposit) == false ) || ( isNaN(total) || isNaN(deposit) )
		) {
			res.status(400).send(utils.responseWithSuccess(false, errcode.invalid_total_deposit,[]));
			return;
		}

		var date_expired_time = utils.addDate(open_time, expired_time);

		controller.Order.add(account_id,status,open_time,close_time,date_expired_time,content,total,deposit,from,to,function(err, created) {
			if (err) {
				res.status(500).send(utils.responseWithSuccess(false,errcode.internal_error,[]));
			} else {
				var responseContent = utils.responseWithSuccess(true, errcode.success,[created]);
				res.status(200).send(responseContent);
			}
		});
	});

	afterRouter.post('/choose-order', function(req, res) {

		var shipper_id		= req.decoded.id;
		var type 			= req.decoded.type;
		var order_id 		= req.body.order_id;

		// Check account type
		if (type == config.acc_type.SELLER) {
			res.status(400).send(utils.responseWithSuccess(false, errcode.not_allow_seller_choose,[]));
			return;
		}

		if (utils.isNotNull(order_id) == false || Number.isInteger(order_id) == false) {
			res.status(400).send(utils.responseWithSuccess(false, errcode.not_exist_order_id + order_id,[]));
			return;
		}

		controller.Order.selectById(order_id,null,null,function (err, found) {
			if (err) {
				res.status(500).send(utils.responseWithSuccess(false,errcode.internal_error,[]));
			} else if (!found) {
				res.status(400).send(utils.responseWithSuccess(false, errcode.not_exist_order_id + order_id,[]));
			} else {
				controller.Order.updatePartial(found.account_id,shipper_id,config.order_status.CHOOSING,null,null,function(err, updated) {
					if (err) {
						res.status(500).send(utils.responseWithSuccess(false,errcode.internal_error,[]));
					} else {
						var responseContent = utils.responseWithSuccess(true, errcode.success,[updated]);
						res.status(200).send(responseContent);
					}
				});
			}
		});
	});

	afterRouter.post('/deliver-order', function(req, res) {

		var account_id		= req.decoded.id;
		var type 			= req.decoded.type;
		var order_id 		= req.body.order_id;

		// Check account type
		if (type == config.acc_type.SHIPPER) {
			res.status(400).send(utils.responseWithSuccess(false, errcode.not_allow_shipper_deliver,[]));
			return;
		}

		if (utils.isNotNull(order_id) == false || Number.isInteger(order_id) == false) {
			res.status(400).send(utils.responseWithSuccess(false, errcode.not_exist_order_id + order_id,[]));
			return;
		}

		controller.Order.selectById(order_id,null,null,function (err, found) {
			if (err) {
				res.status(500).send(utils.responseWithSuccess(false,errcode.internal_error,[]));
			} else if (!found) {
				res.status(400).send(utils.responseWithSuccess(false, errcode.not_exist_order_id + order_id,[]));
			} else {
				controller.Order.updatePartial(account_id,null,config.order_status.DELIVERING,null,null,function(err, updated) {
					if (err) {
						res.status(500).send(utils.responseWithSuccess(false,errcode.internal_error,[]));
					} else {
						var responseContent = utils.responseWithSuccess(true, errcode.success,[updated]);
						res.status(200).send(responseContent);
					}
				});
			}
		});
	});

	afterRouter.post('/close-order', function(req, res) {

		var account_id		= req.decoded.id;
		var type 			= req.decoded.type;
		var order_id 		= req.body.order_id;

		// Check account type
		if (type == config.acc_type.SHIPPER) {
			res.status(400).send(utils.responseWithSuccess(false, errcode.not_allow_shipper_close,[]));
			return;
		}

		if (utils.isNotNull(order_id) == false || Number.isInteger(order_id) == false) {
			res.status(400).send(utils.responseWithSuccess(false, errcode.not_exist_order_id + order_id,[]));
			return;
		}

		controller.Order.selectById(order_id,null,null,function (err, found) {
			if (err) {
				res.status(500).send(utils.responseWithSuccess(false,errcode.internal_error,[]));
			} else if (!found) {
				res.status(400).send(utils.responseWithSuccess(false, errcode.not_exist_order_id + order_id,[]));
			} else {
				var close_time = new Date();
				controller.Order.updatePartial(account_id,null,config.order_status.CLOSED,close_time,null,function(err, updated) {
					if (err) {
						res.status(500).send(utils.responseWithSuccess(false,errcode.internal_error,[]));
					} else {
						var responseContent = utils.responseWithSuccess(true, errcode.success,[updated]);
						res.status(200).send(responseContent);
					}
				});
			}
		});
	});
};
