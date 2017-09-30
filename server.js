var rootDir = __dirname
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')
io.listen(server)

const bodyParser = require('body-parser')
const morgan = require('morgan')
require('./filelogger')(app,morgan)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// get our predefined file
// var model = require('./model')
var config = require('./config')
var errcode = require('./errcode')
var utils = require('./utils')
var show_clientip = require('./middleware/show_clientip')

// plug config and module
// app.set('model', model)
app.set('port', config.PORT || process.env.port || 1234)
app.set('utils',utils)
app.set('config',config)
app.set('errcode',errcode)
app.set('upload_dir',__dirname + '/uploaded_image')

var apiRouter = express.Router();
app.use(config.api_path,apiRouter);
routes = require('./routes')(app,apiRouter)

server.listen(process.env.PORT || 9090, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
})
