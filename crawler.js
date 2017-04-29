var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var pageToVisit = "http://www.arstechnica.com";

console.log("Visiting page " + pageToVisit);

request(pageToVisit, function(err, response,body){
    if(err) console.log("error: "+ err);
    console.log("Status code : " + response.statusCode);
    //We should get Status Code 200
    if(response.statusCode == 200){
        var $ = cheerio.load(body);
        console.log("Title: "+ $('title').text());
        collectInternalLinks($);
    }
});

function searchForWord($, word){
    var bodyText = $('html>body').text();

    if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1){
        return true;
    }

    return false;
}

function collectInternalLinks($){
    var allRelativeLinks = [];
    var allAbsoluteLinks = [];

    var relativeLinks = $("a[href^='/']");
    relativeLinks.each(function(){
        allRelativeLinks.push($(this).attr('href'));
    });

    var absoluteLinks = $("a[href^='http']");
    absoluteLinks.each(function(){
        allAbsoluteLinks.push($(this).attr('href'));
    });

    console.log("Found " + allRelativeLinks.length + " relative links");
    console.log("Found " + allAbsoluteLinks.length + " absolute links");

}