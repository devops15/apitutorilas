var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://127.0.0.1:27017/beerlocker');

mongoose.connection.once('connected', function() {
	console.log("Database connected successfully")
});

mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
});
