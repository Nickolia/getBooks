var fs = require('fs'),
    request = require("request"),
    Iconv = require("iconv"),
    _ = require("lodash-node"),
    CronJob = require('cron').CronJob,
    ObjectID = require("bson-objectid"),
    sex = require('sex'),
    EventEmitter = require("events").EventEmitter;

var listAbc = function(){
    this.date =  new Date();
    this.list = [];
    this.counter = 0;
};
listAbc.prototype.getListAbc = function(){
    var url = "http://samlib.ru/cgi-bin/areader?q=jlist",
        self = this;
    request.post({
        uri:url,
        method: "GET"
    }, function (error, response, body) {
        if (!error  && response.statusCode == 200) {
            var conv = new Iconv.Iconv('windows-1251', 'UTF-8');
            body = new Buffer(body, 'binary');
            body = conv.convert(body).toString();
            var parseArray = body.split(/\n/g);
            _.each(parseArray, function(item){
                var itemArray = item.split("|");
                if(itemArray.length > 1){
                    item = {
                        abc: itemArray[0],
                        code: itemArray[1],
                        count: itemArray[2]
                    };
                    self.list.push(item);
                }

            });
            console.log(body);
            //self.getListAuthorCounter();
        } else {
            console.log("Произошла ошибка: " + error);
        }
    });
};
listAbc.prototype.getListAuthorCounter = function(){
    var self = this;
    console.log("Список начал обновление");
    self.getListAuthor();
    var interval = setInterval(function() {
        ++self.counter;
        console.log("Список начал обновление");
        if(self.counter > self.list.length) clearInterval(interval);
        self.getListAuthor();
    }, 300000);
};
listAbc.prototype.getListAuthor = function(){
    var self = this,
        abcObj = self.list[self.counter],
        url = "http://samlib.ru/cgi-bin/areader?q=alpha&anum="+abcObj.code+"&page=1&pagelen="+abcObj.count;
    request.get({
        "uri":url,
        method: 'GET',
        "Content-Type":"text/plain",
        encoding: null
    }, function (error, response, body) {
        if (!error  && response.statusCode == 200) {
            var conv = new Iconv.Iconv('windows-1251', 'UTF-8');
            body = new Buffer(body, 'binary');
            body = conv.convert(body).toString();
            fs.appendFile('./lib/tmp/lib_author_abc', body, function (err) {
                if (err)
                    return console.log(err);
                console.log('Символ '+self.list[self.counter].abc+' записан');
            });
        } else {
            console.log("Произошла ошибка: " + error);
        }
    });
};
var parser =  new listAbc();
parser.getListAbc();

module.exports = parser;


