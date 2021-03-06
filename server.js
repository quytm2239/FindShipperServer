var rootDir = __dirname
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')
io.listen(server)

const bodyParser = require('body-parser')
const morgan = require('morgan')
require('./filelogger')(app,morgan)

// get our predefined file
// var model = require('./model')
var config = require('./config')
var errcode = require('./errcode')
var utils = require('./utils')
var show_clientip = require('./middleware/show_clientip')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('utils',utils)
app.set('errcode',errcode)
app.set('upload_dir',__dirname + '/uploaded_image')

cron_task = require('./cron_task')(require('./controller'));

routes = require('./routes')(app,express,config);

server.listen(process.env.PORT || config.PORT, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
})
