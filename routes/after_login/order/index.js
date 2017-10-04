module.exports = function(app,config,afterRouter,controller){
	require('./common')(app,config,afterRouter,controller);
    require('./seller')(app,config,afterRouter,controller);
    require('./shipper')(app,config,afterRouter,controller);
};
