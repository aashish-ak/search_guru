var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var iitd = require('../models/iitd');
var iitdScraper = require('../scrapers/scraper');
router.get('/', (req, res, next) => {
    res.send('foobar');
});

router.get('/iitd', (req, res, next)=>{
    iitdScraper.iitdScraper();
    res.json({ msg:'Scraping Started'});
});

router.get('/iitd/data', (req, res, next) => {
    iitd.find(function(err, iitd){
        if(!err){
            res.json(iitd);
        }
        else{
            console.log(err);
        }
    });
});
module.exports = router;