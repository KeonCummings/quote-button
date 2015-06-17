var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
//set object to be populated by scraped DOM elements
var author, quote;
var json = { author : [], quote : []};
var url = []

//Initialize the scraper the scraper url in the DOM
app.get('/scrape', function(req, res){
    //set the scraper url
    for(var i = 1; i < 101; i++){
    	  url.push('http://www.goodreads.com/quotes?page=' + i);
    }
  
  	for(i in url){
  		request(url[i], function(error, response, html){
	        if(!error){
	        	//use cheerio to use jquery to select DOM elements
	            var $ = cheerio.load(html);
	            
	            //select DOM elements using jquery selectors
	            $('.quoteText > a').filter(function(){
	                var data = $(this);
	                author = data.text();

	                json.author.push(author);
	                // all.push(data.text());
	            })
	            //select DOM elements using jquery selectors
	            $('.quoteText').filter(function(){
	                var data = $(this);
	                quote = data.text();

	                json.quote.push(quote);
	            })
	        }
		})
  	}

  	res.send('Check your console!')
})

function cleanUp(){
	//loop through json object to clean up stings
  	for(var i = 0; i < json.quote.length; i++) {
		//find the index of where the quote ends
		endQuote = json.quote[i].indexOf("―")
		//select only the part of the string that contains a quote
		json.quote[i] = json.quote[i].substring(0, endQuote - 1);
		//remove non breaking spaces from string
		json.quote[i] = json.quote[i].replace(/(\r\n|\n|\r)/gm,"");
	}
	//write the json file to folder 
	fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
		console.log('File successfully written! - Check your project directory for the output.json file');
	})
}


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;