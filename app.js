var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var index = require('./routes/index.js')
var app= express();
const port = 3000;
app.use(cors());
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/', index);
app.listen(port, () => {
    console.log('server started at port: ' + port);
});

exports = module.exports = app;
