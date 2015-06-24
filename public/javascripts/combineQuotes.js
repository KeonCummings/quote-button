//This program reads in scraped data that was exported by the web scraper program. 
//Require the fs node module
fs = require('fs');
var quotes = require('./quotes.js');
//Pulls in the exported function from quotes.js
var exportedQuotes = quotes.allQuotes();
var allAuthors = exportedQuotes.author;
//Create an empty key value object, we use these to coerce unique values to an array
var uniqs = {};
//I create this object to hold all the authors and their quotes
var fullQuote = {};
//Create an object with only unique authors
for(var i = 0; i < allAuthors.length ; i++){
		fullQuote[allAuthors[i]] = null;
}
//Coerce unique authors from javascript object into an array
var uniqAuthors = Object.keys(uniqs);
var quoteKeys = Object.keys(fullQuote);
var n = allAuthors.length

//Loop through all quotes and assign all quotes to a unique author::Each author has many quotes
var iterativeSolution = function(){
	for(var i = 0; i < Object.keys(fullQuote).length; i++){
		for(var j = 0; j < exportedQuotes.author.length; j++){
			//If the author in the unique list is equal to the author in the duplicate list
			if(Object.keys(fullQuote)[i] == exportedQuotes.author[j]){
				//if an author has not had a quote attributed to its name
				if(fullQuote[exportedQuotes.author[j]] == null){
					//assign the author an array with the current quote at the 0 index
					fullQuote[exportedQuotes.author[j]] = [exportedQuotes.quote[j]]
				} else {
					//if an author already has a quote assigned to its name then just add the current quote to the authors quote list
					fullQuote[exportedQuotes.author[j]].push(exportedQuotes.quote[j])
				}
			}
		}
	}
}

//recursive solution
var recursiveSolution = function(arrayLength) {
	//base case
	if(arrayLength <= 1){
		if(fullQuote[exportedQuotes.author[0]] == null){
			fullQuote[exportedQuotes.author[0]] = [exportedQuotes.quote[0]];
		}else{
			fullQuote[exportedQuotes.author[0]].push(exportedQuotes.quote[0])
		}
		return;
	};
	//recursive step
	if(fullQuote[exportedQuotes.author[arrayLength]] == null){
			fullQuote[exportedQuotes.author[arrayLength]] = [exportedQuotes.quote[arrayLength]];
		}else{
			fullQuote[exportedQuotes.author[arrayLength]].push(exportedQuotes.quote[arrayLength])
		}
	newLength = arrayLength - 1;
	return recursiveSolution(newLength);
}

var timeIteration = function(){
	console.time(iterativeSolution);

	iterativeSolution(); // run whatever needs to be timed in between the statements

	return console.timeEnd(iterativeSolution);
}

var timeRecursive = function(){
	console.time(recursiveSolution(n));

	recursiveSolution(n); // run whatever needs to be timed in between the statements

	return console.timeEnd(recursiveSolution(n));
}
// fs.writeFile('allQuotes.js', JSON.stringify(fullQuote, null, 4));