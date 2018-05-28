var request = require('request');
var cheerio = require('cheerio');

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

function callback(error, response, html) {
    if (!error && response.statusCode == 200) {
        
        var $ = cheerio.load(html);
        var fac = $('div.item-page').children('table').children('tbody').children('tr').filter(function(i, el){
            var name = $(this).children().find('a').text().trim();
            return name != "" && name != '\n';
        });

        fac.each(function (i, el) {
            var name = $(this).children().find('a').text();
            var desig = $(this).children().find('a').parent().text().trim();
            console.log(desig);
        });
    }
    else {
        console.log(response.statusCode)
        console.log(error)
    }
}

request(options, callback);