var request = require('request');
var cheerio = require('cheerio');
var iitr = require('../models/iitr');

function iitrScraper() {
    var options = {
        url: 'https://www.iitr.ac.in/departments/CSE/pages/People+Faculty_List.html',
        method: 'GET',
        proxy: 'http://10.7.0.1:8080',
        headers: {
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36'
        }
    };

    request(options, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            
            var $ = cheerio.load(html);
            var fac = $('div.list-wrapper');
            fac.each(function (i, el) {
                var name = $(this).children('div').children().find('a').text();
                var link = $(this).children('div').children().find('a').attr('href');
                link = "https://www.iitr.ac.in" + link;
                var research = $(this).children('div').children('div').eq(2).children('p').text();
                var phone =$(this).children('div').children('span').eq(1).text();
                var email = $(this).children('div').children('span').eq(0).text().replace('[at]',"@");
                var image = $(this).children('img').attr('src');

                "use strict";
                
                var iitr_fac = {
                    name : name,
                    research : research,
                    image : image,
                    phone : phone,
                    link : link,
                    email : email
                };

                var query = {image: image};

                iitr.update(query,iitr_fac,{upsert: true},function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Upserted IITR");
                    }
                })
                
                console.log(iitr_fac);
            });
        }
        else {
            console.log(response.statusCode)
            console.log(error)
        }
    });
}

module.exports = {
    iitrScraper
}