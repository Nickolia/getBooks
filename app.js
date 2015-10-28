
var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    //update = require('./update_samlib'),
    lib = require('./lib'),
    db = require('./db'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    logger = require('morgan'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    _ = require('lodash-node'),
    errorHandler = require('errorhandler');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var allowCrossDomain = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);

    next();
};


var init = function(){
    app.all(allowCrossDomain);
    app.use(logger('dev'));
    app.use(methodOverride());
    app.use(session({ resave: true, saveUninitialized: true,secret: 'uwotm8' }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

    fs.readFile('./lib/tmp/lib_author', 'utf8', function(err, contents) {
        if(!contents){
            lib.getListAbc();
        } else {
            fs.readdir("./lib/tmp/composition", function(err, files) {
                if(!files.length){
                    lib.getListCompositionAbc();
                }
            });
        }

    });
    io = require('socket.io').listen(server);

    io.on('connection', Connect);

};

app.set('port', process.env.PORT || 4300);





/*update.ee.on('clear&update:samlib:list',function(list_clear, list_update){
    io.sockets.emit('clear&update:samlib:list', list_clear,list_update);
});*/

var Connect =  function (socket) {
    var socketId = socket.id;

    //socket.emit('clear&update:samlib:list',[], update.list);


};

server.listen(app.get('port'), function (err) {
    if (err) {
        throw err
    }
    console.log('Start server listening on port ' + app.get('port'));
    init()
});
