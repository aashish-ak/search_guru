var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var iitd = require('../models/iitd');
var iitb = require('../models/iitb');
var iitdScraper = require('../scrapers/scraper_iitd');
var iitbScraper = require('../scrapers/scraper_iitb');
router.get('/', (req, res, next) => {
    res.send('foobar');
});

// IIT Delhi

router.get('/iitd', (req, res, next)=>{
    iitdScraper.iitdScraper();
    res.json({ msg:'Scraping IITD Started'});
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

// IIT Bombay

router.get('/iitb', (req, res, next)=>{
    iitbScraper.iitbScraper();
    res.json({ msg:'Scraping IITB Started'});
});

router.get('/iitb/data', (req, res, next) => {
    iitb.find(function(err, iitb){
        if(!err){
            res.json(iitb);
        }
        else{
            console.log(err);
        }
    });
});
module.exports = router;