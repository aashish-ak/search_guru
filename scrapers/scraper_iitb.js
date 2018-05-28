var request = require('request');
var cheerio = require('cheerio');
var iitb = require('../models/iitb');

function iitbScraper() {
    var options = {
        url: 'https://www.cse.iitb.ac.in/page14',
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
            var fac = $('div.mpart').children('table').children('tbody').children('tr');
            fac.each(function (i, el) {
                var details = $(this).children().find('tr');
                // var desig = $(this).children().find('a').parent().text();
                var name = details.children().find('a').children('b').text();
                var link = details.children().find('a').attr('href');
                link = "https://www.cse.iitb.ac.in"+link;
                var research = details.eq(2).text().replace('Research Interests: ',"");
                var office = details.eq(3).text().replace('Office: ',"");
                var phone = details.eq(4).text().replace('Phone Extension: ',"");
                var email = details.children().eq(2).text().replace('cseiitbacin','@cse.iitb.ac.in').replace('iitbacin','@iitb.ac.in').replace('iitdacin','@iitd.ac.in');
                var image = details.children().find('img').attr('src');
                image = "https://www.cse.iitb.ac.in/"+image;
                "use strict";
                var iitb_fac = {
                    name : name,
                    research : research,
                    image : image,
                    email : email,
                    phone : phone,
                    link : link
                };
                var query = { image: image };
                
                // Upsert - Insert if not found else update
                
                iitb.update(query,iitb_fac,{upsert: true},function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("Upserted IITB");
                        }
                    }
                )
                console.log(iitb_fac);
            });
        }
        else {
            console.log(response.statusCode)
            console.log(error)
        }
    });
}
module.exports = {
    iitbScraper
}