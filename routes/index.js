var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

router.get('/', (req, res, next) => {
    res.send('foobar');
});

router.get('/fuckyouapp', (req, res, next)=>{
    res.send('Fuck you too');
});

module.exports = router;