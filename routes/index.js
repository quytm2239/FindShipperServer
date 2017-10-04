// Divide all of your modules in different files and
// require them here
// app is express's app
// pool is mySql "pool" connection
// setting is defined in /config
var bef_path = './before_login';
var aft_path = './after_login';
var check_token = require('./../middleware/check_token');
var controller = require('./../controller');

module.exports = function(app,express,config){

	var beforeRouter = express.Router();
	app.use(config.api_path,beforeRouter);

	require(bef_path + '/register')(app,config,beforeRouter,controller);
	require(bef_path + '/login')(app,config,beforeRouter,controller);
	require(bef_path + '/forgot')(app,config,beforeRouter,controller);

	// Use this to verify token from request
	app.use(check_token);

	var afterRouter = express.Router();
	app.use(config.api_path,afterRouter);

	require(aft_path + '/profile')(app,config,afterRouter,controller);
	require(aft_path + '/order')(app,config,afterRouter,controller);
};
