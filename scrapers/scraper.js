var request = require('request');
var cheerio = require('cheerio');
var iitd = require('../models/iitd');
function iitdScraper() {
    var options = {
        url: 'http://www.cse.iitd.ernet.in/index.php/2011-12-29-23-14-30/faculty',
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
            var fac = $('div.item-page').children('table').children('tbody').children('tr').filter(function (i, el) {
                var name = $(this).children().find('a').text().trim();
                return name != "" && name != '\n';
            });

            fac.each(function (i, el) {
                var name = $(this).children().find('a').text();
                var research = $(this).children().find('a').parent().siblings('p').text().trim();
                var email = $(this).children('td.pic').eq(2).children('p').eq(0).text().replace(" AT ", "@").replace(" ", "").replace("E-mail:", "").replace("Email:", "").trim();
                var phone = $(this).children('td.pic').eq(2).children('p').eq(1).text().trim();
                var image = $(this).children('td.pic').find('img').attr('src');
                var link = $(this).children().find('a').attr('href');
                if (image.indexOf("http://www.cse.iitd") < 0) {
                    image = "http://www.cse.iitd.ernet.in" + image;
                }
                "use strict";
                var iitd_fac = {
                    image: image,
                    name: name,
                    research: research,
                    email: email,
                    phone: phone,
                    link: link
                };
                
                var query = { image: image };
                
                // To remove any entry
                
                // iitd.remove(query, function(err){
                //     if(err){
                //         console.log("Error Removing");
                //     }
                //     else{
                //         console.log("Removed");
                //     }
                // });
                
                // Upsert - Insert if not found else update
                
                iitd.update(query,iitd_fac,{upsert: true},function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("Upserted");
                        }
                    }
                )

                // Allows duplicate entries

                // iitd_fac.save((error) => {
                //     if (!error) {
                //         console.log('Saved');
                //     }
                //     else {
                //         console.log(error);
                //     }
                // });

                console.log(iitd_fac)
            });
        }
        else {
            console.log(response.statusCode)
            console.log(error)
        }
    });
}



module.exports = {
    iitdScraper
}