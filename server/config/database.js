const mongoose = require('mongoose');
require('dotenv').config()

function initDatabase(){
    mongoose.set('strictQuery', true)
    return mongoose.connect("mongodb://localhost:27017");
}

module.exports = initDatabase;