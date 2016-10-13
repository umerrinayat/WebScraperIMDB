var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var port = 3000;
var app = express();

app.get('/scrap', function(req, res){
    console.log('Hello');
     url = 'http://www.imdb.com/title/tt1229340/';

     request(url, function(error, response, html){
         if(!error){

             var $ = cheerio.load(html);

             var title, release, rating;
             var json = { title : "", release : "", rating : ""};

             $('.title_wrapper').filter(function(){
                 
                 var data = $(this);
                
                 //Get title from html 
                 title = data.children().first().text();

                 //Get release date from html
                 release = data.children().last().children().last().text();

                 //Save into json object
                 json.title = title;
                 json.release = release;

                 console.log(title);
                 console.log(release);
             });

             //This is for rating 
             $('.ratingValue').filter(function(){
                 var dataRating = $(this);

                //Get rating from html 
                 rating = dataRating.children().text();
                 json.rating = rating;

                 console.log(rating);
             });

            console.log(json);

            //Saving data into the file
            fs.writeFile('data.json', JSON.stringify(json, null, 4), function(err){
                if(err)
                    console.log('Something went wrong!');
                else
                    console.log('Data is retrive and store in file successfully');
            });
         }
     });


     


     res.send('Check your console');
});


app.listen(port);
console.log('App is at port ' + port);