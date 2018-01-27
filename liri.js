// Modules--------------------------

var dotenv = require("dotenv").config();
var fs = require('fs');
var tweetsArray = [];
var request = require('request');
var Twitter = require('twitter');
// var spotify = require('spotify');
var key = require("./key.js")
var inputCmnd = process.argv[2];
var cmndParam = process.argv[3];
var defaultSong = "The Sign";

var twitter= key.twitter;



var client = new Twitter  ({
   		consumer_key: key.twitter.consumer_key,
		 consumer_secret: key.twitter.consumer_secret,
		  access_token_key: key.twitter.access_token_key,
		   access_token_secret: key.twitter.access_token_secret, 
		 });

  
function commands(command,cmndParam){

	switch(commands){
		case 'my-tweets':
		getTweets(); break;
		case'spotify-this-song':
		if(cmndParam === undefined){
			cmndParam = defaultSong;
		}
		spotifyThis(cmndParam); break;
		case 'do-what-it-says':
		doWhatItSays(); break;
		default:
			text="wrong,try again";
	}
}



  function getTweets(){

  	var arguements = {screen_name:"NicePantsRP",count:20,exclude_replies:true};
 	
 	client.get('statuses/user_timeline', arguements, function(error, tweets, response){
 		if(!error) {
 			tweetsArray = tweets;

 			for(i=0;i<tweetsArray.length;i++){
 				console.log("Created at:" + tweetsArray[i].created_at);
 				console.log("text: " + tweetsArray[i].text);
 				// console.log(JSON.stringify(data, null,20));
 				console.log('')
 			}
 		}
 		else{
 			console.log(error);
 	}
 
  	

})

function spotifyThis(song) {
	if(song === ""){
		song = "The Sign"
	}

	spotify.search({type:'track', query: song}, function(err, data){
		if(err) {
			console.log('Error:' + err);
			return;
		}

var song = data.tracks.items[0];
console.log("Artists:");
for(i=0; i <song.artists.length; i++){
	console.log(song.artists[i].name);
}

console.log("Song:")
console.log(song.name);

console.log("Preview");
console.log(song.preview_url);

console.log("Album");
console.log(song.album.name);

	});


}

function doWhatItSays(){

	fs.appendFile('random.txt', 'utf8', function(err, data){
		if(err){
			return console.log(err);
		}

		var dataArr = data.split(',');

		commands(dataArr[0], dataArr[1]);
	});
}

commands(inputCmnd, cmndParam);

};
getTweets();