var mongoose = require('mongoose'),
    db = mongoose.createConnection('mongodb://users:realisation001@localhost:27017/getbook');


db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback () {
    console.log("Connected!")
});

module.exports = db;