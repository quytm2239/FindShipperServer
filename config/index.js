module.exports={
	PORT:1234,
	super_secret:'findshipper',
	api_path: '/api',
	fb_pass: 'Facebook',
	acc_type: {
		SELLER: 0,
		SHIPPER: 1,
		CUSTOMER: 2
	},
	order_status: {
		OPENING: 0,
		CHOOSING: 1,
		DELIVERING: 2,
		CLOSED: 3,
		EXPIRED: 4
	},
	order_action: {
		DELIVERING: 0,
		CLOSED: 1
	}
};
