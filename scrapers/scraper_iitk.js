var request = require('request');
var cheerio = require('cheerio');
var iitk = require('../models/iitk');

function iitkScraper() {
    var options = {
        url: 'https://www.cse.iitk.ac.in/pages/Faculty.html',
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
            var fac = $('div.team-w3ls').children('a');
            fac.each(function (i, el) {
                var details = $(this).children('div').children('div');
                var name = details.children('h5').text();
                var link = details.children('h6').text().replace('(',"").replace(')',"/");
                link = "https://www.cse.iitk.ac.in/users/"+link;
                var research = details.children('p').eq(-1).text();
                // var office = details.eq(3).text().replace('Office: ',"");
                var phone = details.children('p').eq(1).text();
                // var email = details.children().eq(2).text().replace('cseiitbacin','@cse.iitb.ac.in').replace('iitbacin','@iitb.ac.in').replace('iitdacin','@iitd.ac.in');
                var image = $(this).children('div').children('img').attr('src').replace('..',"https://www.cse.iitk.ac.in");
                var email = "";
                "use strict";
                var iitk_fac = {
                    name : name,
                    research : research,
                    image : image,
                    email : email,
                    phone : phone,
                    link : link
                };

                var query = {image: image};

                iitk.update(query,iitk_fac,{upsert: true},function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Upserted IITK");
                    }
                });

                console.log(phone);
            })
        }
        else {
            console.log(response.statusCode)
            console.log(error)
        }
    });
}
module.exports = {
    iitkScraper
}