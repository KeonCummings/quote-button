var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    
    url = 'http://www.goodreads.com/quotes';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var author, quote;
            var json = { author : "", quote : ""};

            $('.quoteText > a').filter(function(){
                var data = $(this);
                author = data.text();

                json.author = author;
            })

            // Since the rating is in a different section of the DOM, we'll have to write a new jQuery filter to extract this information.

            $('.quoteText').filter(function(){
                var data = $(this);

                // The .star-box-giga-star class was exactly where we wanted it to be.
                // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

                quote = data.text();

                json.quote = quote;
            })
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        	console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
	})
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;