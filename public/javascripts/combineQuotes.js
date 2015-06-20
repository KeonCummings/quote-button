fs = require('fs');
var quotes = require('./quotes.js');
var exportedQuotes = quotes.allQuotes();
var allAuthors = exportedQuotes.author;
var uniqs = {};
var fullQuote = {};

for(var i = 0; i < allAuthors.length ; i++){
		fullQuote[allAuthors[i]] = null;
}
var uniqAuthors = Object.keys(uniqs);

for(var i = 0; i < Object.keys(fullQuote).length; i++){
	for(var j = 0; j < exportedQuotes.author.length; j++){
		if(Object.keys(fullQuote)[i] == exportedQuotes.author[j]){
			if(fullQuote[exportedQuotes.author[j]] == null){
				fullQuote[exportedQuotes.author[j]] = [exportedQuotes.quote[j]]
			} else {
				fullQuote[exportedQuotes.author[j]].push(exportedQuotes.quote[j])
			}
		}
	}
}

// fs.writeFile('allQuotes.js', JSON.stringify(fullQuote, null, 4));
