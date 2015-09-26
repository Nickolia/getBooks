
var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


app.set('port', process.env.PORT || 4300);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);


if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

if (app.get('env') === 'production') {
  // TODO
}

app.get('/', routes.index);

app.get('/api/name', api.name);


app.get('*', routes.index);

io.sockets.on('connection', require('./routes/socket'));

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
