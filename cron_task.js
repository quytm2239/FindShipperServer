var schedule = require('node-schedule');
module.exports = function (controller) {
    var j = schedule.scheduleJob('* /5 * * * *', function(){
        console.log('Start update order to specify which order expired....');
        controller.Order.scheduleUpdateStatus(function (err, updated) {
            if (err) {
                console.log('SCHEDULE update order FAIL!');
            } else {
                console.log('SCHEDULE update order SUCCESSFULLY!');
            }
        });
    });
};
