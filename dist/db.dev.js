"use strict";

var mongoose = require('mongoose');

require('dotenv').config();

var connecttodb = function connecttodb() {
  mongoose.connect("mongodb+srv://".concat(process.env.MONGO_ID, ":").concat(process.env.MONGO_PASS, "@blogapp.bmtet.mongodb.net/?retryWrites=true&w=majority&appName=blogapp")).then(function () {
    return console.log('Connected mongodb successfully');
  })["catch"](function (err) {
    return console.error('Could not connect to mongodb', err);
  });
};

module.exports = connecttodb;