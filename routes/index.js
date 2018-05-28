var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var iitd = require('../models/iitd');
var iitdScraper = require('../scrapers/scraper');
var iitmandiScraper = require('../scrapers/scraperiitmandi');
var count = 0;

router.get('/', (req, res, next) => {
    res.send('foobar');
});

router.get('/iitd', (req, res, next)=>{
    iitdScraper.iitdScraper();
    res.json({ msg:'Scraping Started for IIT Delhi'});
});

router.get('/iitmandi', (req, res, next)=>{
    iitmandiScraper.iitmandiScraper();
    res.json({ msg:'Scraping Started for IIT Mandi'});
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

router.get('/iitmandi/data', (req, res, next) => {
    iitmandi.find(function(err, iitmandi){
        if(!err){
            res.json(iitmandi);
        }
        else{
            console.log(err);
        }
    });
});
module.exports = router;