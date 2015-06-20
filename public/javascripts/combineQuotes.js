fs = require('fs');
var quotes = require('./quotes.js');
var exportedQuotes = quotes.allQuotes();
var fullQuote = {};
authors = [];
quoteList = [];

for(i in quotes.quote){
	authors.push(quotes.authors[i])
}

for(i in exportedQuotes.author) {
	var dupCounter = 1;
	//needed for duplicate authors, if the author is a duplicate 
	if(exportedQuotes.author[i] == authors[i] ) {
		dupCounter = dupCounter + 1;
		fullQuote[exportedQuotes.author[i]] = [];
		fullQuote[exportedQuotes.author[i]].push(fullQuote[exportedQuotes.quote[i]]);
	}
		fullQuote[exportedQuotes.author[i]] = exportedQuotes.quote[i];
}

// fs.writeFile('allQuotes.js', JSON.stringify(fullQuote, null, 4));
