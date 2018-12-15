var request = require('request');
var cheerio = require('cheerio');
var schema = require('../models/schema');

function iitmandiScraper() {
    var options = {
        url: 'http://www.iitmandi.ac.in/Schools/SCEE/faculty.php',
        method: 'GET',
    //    proxy: 'http://10.8.0.1:8080',
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
                var work_area = str[3].replace("Specialization: ","").trim();
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
                    link: link,
                    collegeName : "IIT Mandi"
                };

                var query = {image: image};
                
                // Upsert - Insert if not found else update
                
                schema.update(query,iitmandi_fac,{upsert: true},function(err){
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

function iitrScraper() {
    var options = {
        url: 'https://www.iitr.ac.in/departments/CSE/pages/People+Faculty_List.html',
        method: 'GET',
    //    proxy: 'http://10.8.0.1:8080',
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
                var collegeName = "IIT Roorkee";
                "use strict";
                
                var iitr_fac = {
                    name : name,
                    research : research,
                    image : image,
                    phone : phone,
                    link : link,
                    email : email,
                    collegeName : collegeName
                };

                var query = {image: image};

                schema.update(query,iitr_fac,{upsert: true},function(err){
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

function iitkScraper() {
    var options = {
        url: 'https://www.cse.iitk.ac.in/pages/Faculty.html',
        method: 'GET',
    //    proxy: 'http://10.8.0.1:8080',
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
                    link : link,
                    collegeName : "IIT Kanpur"
                };

                var query = {image: image};

                schema.update(query,iitk_fac,{upsert: true},function(err){
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

function iitbScraper() {
    var options = {
        url: 'https://www.cse.iitb.ac.in/page14',
        method: 'GET',
    //   proxy: 'http://10.8.0.1:8080',
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
                    link : link,
                    collegeName : "IIT Bombay"
                };
                var query = { image: image };
                
                // Upsert - Insert if not found else update
                
                schema.update(query,iitb_fac,{upsert: true},function(err){
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

function iitdScraper() {
    var options = {
        url: 'http://www.cse.iitd.ernet.in/index.php/2011-12-29-23-14-30/faculty',
        method: 'GET',
    //    proxy: 'http://10.8.0.1:8080',
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
                var name = $(this).children().find('a').text().trim();
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
                    link: link,
                    collegeName : "IIT Delhi"
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
                
                schema.update(query,iitd_fac,{upsert: true},function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("Upserted IITD");
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
    iitrScraper,
    iitdScraper,
    iitmandiScraper,
    iitbScraper,
    iitkScraper
}