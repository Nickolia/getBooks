var fs = require('fs'),
    request = require("request"),
    Iconv = require("iconv"),
    _ = require("lodash-node"),
    ObjectID = require("bson-objectid"),
    sex = require('sex'),
    EventEmitter = require("events").EventEmitter;

var libraryAbc = function(){
    this.date =  new Date();
    this.list = [];
    this.list_composition = [];
    this.list_composition_not_loaded = [];
    this.counter = 0;
    this.counter_composition = 0;
};












//Create author list in tmp folder
libraryAbc.prototype.getListAbc = function(){
    var url = "http://samlib.ru/cgi-bin/areader?q=alist",
        self = this;
    request.get({
        uri:url,
        method: "GET",
        headers: {
            'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36"
        },
        "Content-Type":"application/octet-stream",
        encoding: null
    }, function (error, response, body) {
        if (!error  && response.statusCode == 200) {
            var conv = new Iconv.Iconv('KOI8-R', 'UTF-8');
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
            self.getListAuthorCounter();
        } else {
            console.log("Произошла ошибка: " + error);
        }
    });
};
libraryAbc.prototype.getListAuthorCounter = function(){
    var self = this;
    console.log("Список авторов начал обновление");
    self.getListAuthor(self.list[self.counter]);
    var interval = setInterval(function() {
        self.counter++;
        console.log("Список авторов начал обновление");
        if(self.counter >= self.list.length){
            clearInterval(interval);
            console.log("Запись завершена");
            self.getListCompositionAbc();
            return false;
        } else {
            self.getListAuthor(self.list[self.counter]);
        }
    }, 15000);
};
libraryAbc.prototype.getListAuthor = function(abcObj){
    var self = this,
        url = "http://samlib.ru/cgi-bin/areader?q=alpha&anum="+abcObj.code+"&page=1&pagelen="+abcObj.count;
    request.get({
        uri:url,
        method: "GET",
        headers: {
            'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36"
        },
        "Content-Type":"application/octet-stream",
        encoding: null
    }, function (error, response, body) {
        if (!error  && response.statusCode == 200) {
            var conv = new Iconv.Iconv('KOI8-R', 'UTF-8');
            body = new Buffer(body, 'binary');
            body = conv.convert(body).toString();
            fs.appendFile('./lib/tmp/lib_author', body, function (err) {
                if (err)
                    return console.log(err);
                console.log('Символ '+self.list[self.counter].abc+' записан');
            });
        } else {
            console.log("Произошла ошибка: " + error);
        }
    });
};








//create composition list in composition folder
libraryAbc.prototype.getListCompositionAbc = function(){
    var url = "http://samlib.ru/cgi-bin/areader?q=jlist",
        self = this;
    request.get({
        uri:url,
        method: "GET",
        headers: {
            'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36"
        },
        "Content-Type":"application/octet-stream",
        encoding: null
    }, function (error, response, body) {
        if (!error  && response.statusCode == 200) {
            var conv = new Iconv.Iconv('KOI8-R', 'UTF-8');
            body = new Buffer(body, 'binary');
            body = conv.convert(body).toString();
            var parseArray = body.split(/\n/g);
            _.each(parseArray, function(item){
                var itemArray = item.split("|");
                if(itemArray.length > 1 && !!itemArray[0]){
                    item = {
                        name: itemArray[0],
                        code: itemArray[1],
                        count: itemArray[2]
                    };
                    self.list_composition.push(item);
                }

            });
            console.log(self.list_composition);
            self.getListCompositionCounter();
        } else {
            console.log("Произошла ошибка: " + error);
        }
    });
};
libraryAbc.prototype.getListCompositionCounter = function(){
    var self = this;
    console.log("Список произведений жанра "+self.list_composition[self.counter_composition].name+" начал обновление");
    var length_composition = self.list_composition.length,
        length_composition_not_loaded = 0,
        counter_composition_not_loaded = 0,
        time_for_update = 0,
        counter_list = 0,
        timer_interval =  function(){
            setTimeout(function(){
                self.counter_composition++;
                if(self.counter_composition >= length_composition){
                    if(self.list_composition_not_loaded.length > 0 ){
                        console.log("Запись завершена с ошибками, приступаем к перезаписи");
                        self.getListNotLoadedComposition(self.list_composition_not_loaded[counter_composition_not_loaded]);
                        timer_not_loader();
                    } else {
                        console.log("Запись завершена без ошибок");
                    }

                    return false;
                } else {
                    self.getListComposition(self.list_composition[self.counter_composition]);
                    time_for_update = Math.ceil((self.list_composition[self.counter_composition].count*1)/3000)*20000;
                    console.log("Список произведений жанра "+self.list_composition[self.counter_composition].name+" начал обновление");
                    timer_interval();
                }
            },time_for_update)},
        timer_not_loader =  function(){
            setTimeout(function(){
                counter_composition_not_loaded++;
                if(counter_composition_not_loaded >= length_composition_not_loaded){
                    console.log("Запись произведений завершена");
                    return false;
                } else {
                    self.getListNotLoadedComposition(self.list_composition_not_loaded[counter_composition_not_loaded]);
                    console.log("Список произведений жанра "+self.list_composition[self.counter_composition].name+" начал обновление");
                    timer_not_loader();
                }
            },20000)};



    self.getListComposition(self.list_composition[self.counter_composition]);
    time_for_update = Math.ceil((self.list_composition[self.counter_composition].count*1)/3000)*20000;
    timer_interval();

};
libraryAbc.prototype.getListComposition = function(abcObj){
    var self = this,
        counter = Math.ceil((abcObj.count*1)/3000),
        count_page = 0;
    var start_request = function(count,page){
        url = "http://samlib.ru/cgi-bin/areader?q=janr&jnum="+abcObj.code+"&order=title&page="+page+"&pagelen="+count;
        request.get({
            uri:url,
            method: "GET",
            headers: {
                'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36"
            },
            "Content-Type":"application/octet-stream",
            encoding: null
        }, function (error, response, body) {
            if (!error  && response.statusCode == 200) {
                var conv = new Iconv.Iconv('KOI8-R', 'UTF-8');
                body = new Buffer(body, 'binary');
                body = conv.convert(body).toString();
                fs.appendFile('./lib/tmp/composition/lib_'+abcObj.code, body, function (err) {
                    if (err)
                        return console.log(err);
                    if(counter > 1){
                        console.log('Часть '+ page +' из '+ counter +' Жанр - '+abcObj.name+' записан');
                    } else {
                        console.log('Жанр - '+abcObj.name+' записан');
                    }

                });
            } else {
                if(counter > 1){
                    console.log('Часть '+ count_page +' из '+ counter +' Жанр - '+abcObj.name+' не  записан');
                } else {
                    console.log('Жанр - '+abcObj.name+' не  записан');
                }
                var not_append = JSON.parse(JSON.stringify(abcObj));
                not_append.page = page;
                not_append.counter = counter;
                self.list_composition_not_loaded.push(not_append);
            }
        });
    };

    if(counter > 1){
        var interval_page = setInterval(function() {
            ++count_page;
            if(count_page > counter){
                clearInterval(interval_page);
                console.log('Жанр - '+abcObj.name+' полностью записан');
                return false;
            } else {
                start_request(3000, count_page);
            }
        }, 20000);
    } else {
        start_request(abcObj.count, count_page)
    }

};
libraryAbc.prototype.getListNotLoadedComposition = function(abcObj){
    var url = "http://samlib.ru/cgi-bin/areader?q=janr&jnum="+abcObj.code+"&order=title&page="+abcObj.page+"&pagelen="+abcObj.counter;
    request.get({
        uri:url,
        method: "GET",
        headers: {
            'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36"
        },
        "Content-Type":"application/octet-stream",
        encoding: null
    }, function (error, response, body) {
        if (!error  && response.statusCode == 200) {
            var conv = new Iconv.Iconv('KOI8-R', 'UTF-8');
            body = new Buffer(body, 'binary');
            body = conv.convert(body).toString();
            fs.appendFile('./lib/tmp/composition/lib_'+abcObj.code, body, function (err) {
                if (err)
                    return console.log(err);
                if(abcObj.counter > 1){
                    console.log('Часть '+ abcObj.page +' из '+ abcObj.counter +' Жанр - '+abcObj.name+' записан');
                } else {
                    console.log('Жанр - '+abcObj.name+' перезаписан');
                }
            });
        } else {
            if(abcObj.counter > 1){
                console.log('Часть '+ abcObj.page +' из '+ abcObj.counter +' Жанр - '+abcObj.name+' не  записан');
            } else {
                console.log('Жанр - '+abcObj.name+' не  записан');
            }
        }
    });
};



libraryAbc.prototype.addAuthorToDatabase = function(){
    fs.readFile('./lib/tmp/lib_author', 'utf8', function(err, contents) {
        var contentsArray = contents.split(/\n/g);
        console.log(contentsArray[0]);
    })
};









var library =  new libraryAbc();

module.exports = library;





