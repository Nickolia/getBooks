var mongoose = require('mongoose'),
    db = mongoose.createConnection('mongodb://localhost/auth');


db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback () {
    console.log("Connected!")
});

var AuthSchema = new mongoose.Schema( {
    email: { type: String },
    password: { type: String },
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date },
    buff: Buffer
} );