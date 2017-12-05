var keys = require ("./keys.js")
var request= require("request");
var Twitter=  require ("twitter");
var spotify= require ("spotify");
var fs= require ("fs");
var action= process.argv[2];
var value= process.argv[3];
var params= {
    screen_name:'JohnMur82678052 ',
    count:20
}
console.log(keys.twitter)

var client = new Twitter({
  consumer_key:keys.twitter.consumer_key,
  consumer_secret:keys.twitter.consumer_key,
  access_token_key:keys.twitter.access_token_key,
  access_token_secret:keys.twitter.access_token_secret
});

switch (action){

	case  'mytweets':
	    myTweets();
	    break;

	case 'spotify': 
	     spotifyThis(value); 
	     break;

	case 'omdb':
	     omdbThis(value);
	     break;

	case 'random':
	     random();
	     break;


}// end switch


// my tweet function

function myTweets() {

	client.get ('statuses/user_timeline',params, function(error,tweets,response){

     if (!error) {

     	console.log('');
      console.log('last 20 tweets');

     for (i=0; i<tweets.length;i++){
  
    console.log('');
    console.log([i+1]+ ',' +tweets[i].text);
    console.log('created on:  ' + tweets[i].created_at);
    console.log('');

    fs.appendFile('log.txt',tweets[i].text,function(err){ 

    });
}

     	

}

if ( error){

	console.log(error)
}
});


    

}// end of tweets

  

 




 






//spotifyThis function


function spotifyThis(value) {

    if (value == null) {

        value = ' "The Sign" by Ace of Base';

    }

    request('https://api.spotify.com/v1/search?q=' + value + '&type=track', function(error, response, body) {

        if (!error && response.statusCode == 200) {

            jsonBody = JSON.parse(body);

            console.log(' ');

            console.log('Artist: ' + jsonBody.tracks.items[0].artists[0].name);

            console.log('Song: ' + jsonBody.tracks.items[0].name);

            console.log('Preview Link: ' + jsonBody.tracks.items[0].preview_url);

            console.log('Album: ' + jsonBody.tracks.items[0].album.name);

            console.log(' ');

       

} // end spotifyThis function




// omdbThis function

function omdbThis(value) {

    if (value == null) {

        value = 'Mr Nobody';

    }

    request('http://www.omdbapi.com/? t=' + value + '&tomatoes=true&r=json', function(error, response, body) {

        if (!error && response.statusCode == 200) {

            jsonBody = JSON.parse(body);

            console.log(' ');

            console.log('Title: ' + jsonBody.Title);

            console.log('Year: ' + jsonBody.Year);

            console.log('IMDb Rating: ' + jsonBody.imdbRating);

            console.log('Country: ' + jsonBody.Country);

            console.log('Language: ' + jsonBody.Language);

            console.log('Plot: ' + jsonBody.Plot);

            console.log('Actors: ' + jsonBody.Actors);

            console.log('Rotten Tomatoes Rating: ' + jsonBody.tomatoRating);

            console.log('Rotten Tomatoes URL: ' + jsonBody.tomatoURL);

            console.log(' ');

            fs.appendFile('log.txt', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS: ' + process.argv + '\r\nDATA OUTPUT:\r\n' + 'Title: ' + jsonBody.Title + '\r\nYear: ' + jsonBody.Year + '\r\nIMDb Rating: ' + jsonBody.imdbRating + '\r\nCountry: ' + jsonBody.Country + '\r\nLanguage: ' + jsonBody.Language + '\r\nPlot: ' + jsonBody.Plot + '\r\nActors: ' + jsonBody.Actors + '\r\nRotten Tomatoes Rating: ' + jsonBody.tomatoRating + '\r\nRotten Tomatoes URL: ' + jsonBody.tomatoURL + '\r\n =============== LOG ENTRY END ===============\r\n \r\n'), function(err) {

                if (err) throw err;

            });

        }

    });

} //end omdbThis function



// random function

function random() {

    fs.readFile('random.txt', 'utf8', function(error, data) {

        if (error) {

            console.log(error);

        } else {

            var dataArr = data.split(',');

            if (dataArr[0] === 'spotify') {

                spotifyThis(dataArr[1]);

            }

            if (dataArr[0] === 'omdb') {

                omdbThis(dataArr[1]);

            }

        }

 
    });

    // end doWhatItSays function