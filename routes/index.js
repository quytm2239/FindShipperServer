// Divide all of your modules in different files and
// require them here
// app is express's app
// pool is mySql "pool" connection
// setting is defined in /config
var bef_path = './before_login';
var aft_path = './after_login';
var check_token = require('./../middleware/check_token');
var controller = require('./../controller');

module.exports = function(app,apiRouter){
	// before login
	require(bef_path + '/register')(app,apiRouter,controller);
	// require(bef_path + '/loginFB')(app);
	require(bef_path + '/login')(app,apiRouter,controller);
	require(bef_path + '/forgot')(app,apiRouter,controller);

	app.use(check_token);
	// after login
	// require(aft_path + '/notify')(app);
	// require(aft_path + '/change_pass')(app);
	// require(aft_path + '/profile')(app);
	// require(aft_path + '/upload')(app);
};
