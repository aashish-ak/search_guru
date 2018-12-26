var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

var schema = require('../models/schema');

var scraper = require('../scrapers/scraper');
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
    setTimeout(function(){
    schema.find(function(err, data){
        if(!err){
            console.log(JSON.stringify(data));
            res.json(data);
            var dt = JSON.parse(JSON.stringify(data));
            for(var i =0 ;i<dt.length-1;i++)
            {
                delete dt[i]['_id'];
                const options = {
                  uri: 'http://localhost:9200/search_guru/prof/'+(i+1),
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                   // 'Content-Length': Buffer.byteLength(postData)
                  },
                  json: dt[i]
                };
                request(options,function(error,response,body){
                    console.log(response.statusCode);
                    console.log(body);
                });
            }
        }
        else{
            console.log(err);
        }
    });
},5000);
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