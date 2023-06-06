const mongoose = require('mongoose');
require('dotenv').config()

function initDatabase(){
    mongoose.set('strictQuery', true)
    return mongoose.connect("mongodb://127.0.0.1:27017/friendify");
}

module.exports = initDatabase;