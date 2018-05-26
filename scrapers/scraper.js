var request = require('request');
var cheerio = require('cheerio');

request('https://www.iitmandi.ac.in', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        console.log('FuckOU');
    }
    else{
        console.log(error)
    }
    // console.log(response.statusCode);
})
