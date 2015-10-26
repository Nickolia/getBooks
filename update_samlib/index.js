var request = require("request"),
    Iconv = require("iconv"),
    _ = require("lodash-node"),
    url = "http://samlib.ru/logs/",
    CronJob = require('cron').CronJob,
    ObjectID = require("bson-objectid"),
    sex = require('sex'),
    EventEmitter = require("events").EventEmitter;

var updateList = function(){
    this.date =  new Date();
    this.list = [];
    this.ignoreList = [];
    this.time_stamp_update = 0;
    this.ee = new EventEmitter();
};
updateList.prototype.getList = function(){
    var self = this;
    self.date = new Date();
    self.time_stamp_update = self.date * 1000;

    request.get({
        "uri":url+self.date.getFullYear()+"/"  + ('0' + (self.date.getMonth()+1)).slice(-2) + '-'+('0' + self.date.getDate()).slice(-2)+".log",
        method: 'GET',
        "Content-Type":"text/plain",
        encoding: null
    }, function (error, response, body) {
        if (!error  && response.statusCode == 200) {
            var conv = new Iconv.Iconv('windows-1251', 'UTF-8');
            body = new Buffer(body, 'binary');
            body = conv.convert(body).toString();
            var parseArray = body.split(/\n/g);
            var convId = new Iconv.Iconv('UTF-8', 'UTF-16');
            _.each(parseArray, function(item){
                var itemArray = item.split("|");
                if(itemArray.length > 1){
                    var itemAuthDataArray = itemArray[0].split("/"),
                        parentId = ObjectID(new Buffer(itemAuthDataArray[2])),
                        id = ObjectID(new Buffer(itemAuthDataArray[2].concat(itemAuthDataArray[3]))),
                        unix_time = setUnixTime(itemArray[2]);
                    if(!_.findWhere(self.list,{id: id,unix_time: unix_time})){
                        item = {
                            id: id.str,
                            url: itemArray[0],
                            parentId: parentId.str,
                            tag: itemArray[1],
                            ctime: itemArray[2],
                            title: itemArray[3],
                            author: itemArray[4],
                            type: itemArray[5],
                            janr: itemArray[6],
                            note: itemArray[7],
                            adate: itemArray[8],
                            img_cnt: itemArray[9],
                            unix_time: unix_time,
                            size: itemArray[11],
                            time_stamp: self.time_stamp_update
                        };
                        if(!_.findWhere(self.list,{id: item.id})){
                            self.list.push(item);
                        } else {
                            if(!_.findWhere(self.ignoreList,{id: item.id})){
                                self.ignoreList.push({id:item.id, unix_time:item.unix_time});
                            } else {
                                self.ignoreList = _.filter(self.ignoreList, function(num){ return num.id != item.id; });
                                self.ignoreList.push({id:item.id, unix_time:item.unix_time});
                            }
                        }
                    }
                }

            });
            _.each(self.ignoreList, function(item){
                self.list = _.filter(self.list, function(num){ return (num.id != item.id)||(num.id == item.id && num.unix_time == item.unix_time); });
            });
            console.log("Список обновлен");
            self.ee.emit('clear&update:samlib:list', self.ignoreList,  _.where(self.list,{time_stamp: self.time_stamp_update}));
        } else {
            console.log("Произошла ошибка: " + error);
        }
    });
};
var setUnixTime = function (date) {
    return (new Date(date))*1;
};
var parser =  new updateList();
parser.getList();
/*
new CronJob({
    cronTime: '* *//*
5 * * * *',
    onTick: function() {
        console.log("Список начал обновление");
        parser.getList();
    },
    start: true
});
*/

setInterval(function() {
    console.log("Список начал обновление");
    parser.getList();
}, 300000);


module.exports = parser;


