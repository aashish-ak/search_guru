var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

var schema = require('../models/schema');

var scraper = require('../scrapers/scraper')

router.get('/', (req, res, next) => {
    res.send('foobar');
});




// IIT

router.get('/scraper', (req, res, next)=>{
    scraper.iitbScraper();
    scraper.iitkScraper();
    scraper.iitrScraper();
    scraper.iitdScraper();
    scraper.iitmandiScraper();
    schema.find(function(err, data){
        if(!err){
            res.json(data);
        }
        else{
            console.log(err);
        }
    });
    //res.json({ msg:'Scraping IIT started'});
});

router.get('/scraper/data', (req, res, next) => {
    schema.find(function(err, data){
        if(!err){
            res.json(data);
        }
        else{
            console.log(err);
        }
    });
});


module.exports = router;