
var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    parser = require('./parser_samlib'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    errorHandler = require('errorhandler');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


app.set('port', process.env.PORT || 4300);
/*app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true,
    secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({
    dest: './uploads'
}));*/
app.use(express.static(path.join(__dirname, 'public')));



/*if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

if (app.get('env') === 'production') {
  // TODO
}

app.get('/', routes.index);

app.get('/api/name', api.name);


app.get('*', routes.index);*/

io.sockets.on('connection', require('./routes/auth'));

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
