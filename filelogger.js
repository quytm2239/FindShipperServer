var winston = require('winston')
module.exports = function (app,morgan) {
    //=========================== write log to file ================================
    var logger = new winston.Logger({
      transports: [
        new winston.transports.File({
          level:            'debug',
          filename:         './all-logs.log',
          handleExceptions: true,
          json:             false,
          maxsize:          104857600, //100MB
          maxFiles:         10,
          colorize:         false
        })
        ,
        new winston.transports.Console({
          level:            'debug',
          handleExceptions: true,
          json:             false,
          colorize:         true
        })
      ],
      exitOnError: false
    });
    logger.stream = {
      write: function(message, encoding){
        logger.info(message);
      }
    };
    app.use(morgan(
    	'{"remote_addr": ":remote-addr", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "user_agent": ":user-agent", "response_time": ":response-time"}', {stream: logger.stream}));
    //=========================== write log to file ================================
}
