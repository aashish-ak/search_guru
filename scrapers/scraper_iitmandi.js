var request = require('request');
var cheerio = require('cheerio');
var iitmandi = require('../models/iitmandi');

function iitmandiScraper() {
    var options = {
        url: 'http://www.iitmandi.ac.in/Schools/SCEE/faculty.php',
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
            var fac = $('div.col-md-6').children('address').filter(function (i, el) {
                var name = $(this).find('a').text().trim();
                return name != "" && name != '\n';
            });

            fac.each(function (i, el) {
                var string = $(this).text(); 
                var str = string.split("\n\t\t\t\t\t");
                var name = str[1];
                var work_area = str[3];
                var eml = str[7].split(" ");
                var email = eml[1].trim()+"@iitmandi.ac.in"; 
                var phn = str[6].split(" ");
                if(phn[1]!="")
                var phone = "01905-"+phn[1];
                var image = $(this).parent().find('img').attr('src');
                var link = $(this).find('a').attr('href');
                if (image.indexOf("http://www.iitmandi.ac.in") < 0) {
                    image = "http://iitmandi.ac.in/Schools/SCEE/" + image;
                }
                "use strict";
                var iitmandi_fac = {
                    image: image,
                    name: name,
                    research: work_area,
                    email: email,
                    phone: phone,
                    link: link
                };

                var query = {image: image};
                
                // Upsert - Insert if not found else update
                
                iitmandi.update(query,iitmandi_fac,{upsert: true},function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Upserted IITMandi");
                        }
                    }
                )
                console.log(iitmandi_fac)
            });
        }
        else {
            console.log(response.statusCode)
            console.log(error)
        }
    });
}

module.exports = {
    iitmandiScraper
}