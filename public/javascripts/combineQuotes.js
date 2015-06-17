fs = require('fs');
var quotes = require('./quotes.js');
var exportedQuotes = quotes.allQuotes();
var fullQuote = {};

for(i in exportedQuotes.author) {
	fullQuote[exportedQuotes.author[i]] = exportedQuotes.quote[i];
}

fs.writeFile('allQuotes.js', JSON.stringify(fullQuote, null, 4));
