var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

var iitd = require('../models/iitd');
var iitb = require('../models/iitb');
var iitmandi = require('../models/iitmandi');
var iitk = require('../models/iitk');

var iitdScraper = require('../scrapers/scraper_iitd');
var iitbScraper = require('../scrapers/scraper_iitb');
var iitmandiScraper = require('../scrapers/scraper_iitmandi');
var iitkScraper = require('../scrapers/scraper_iitk');

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

// IIT Mandi

router.get('/iitmandi', (req, res, next)=>{
    iitmandiScraper.iitmandiScraper();
    res.json({ msg:'Scraping IIT Mandi Started'});
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

// IIT Kanpur

router.get('/iitk', (req, res, next)=>{
    iitkScraper.iitkScraper();
    res.json({ msg:'Scraping IITK Started'});
});

router.get('/iitk/data', (req, res, next) => {
    iitk.find(function(err, iitk){
        if(!err){
            res.json(iitk);
        }
        else{
            console.log(err);
        }
    });
});

module.exports = router;