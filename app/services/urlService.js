var urlModel = require('../models/urlModel');

var redis = require('redis'); 
var host = "172.17.0.3"
//var host = process.env.REDIS_PORT_6379_TCP_ADD || '127.0.0.1'; // input environment variable
var port = process.env.REDIS_PORT_6379_TCP_ADD || '6379';

var redisClient = redis.createClient(port, host);

var encode = [];

var genCharArray = function (charA, charZ) {
	var arr = [];
	var i = charA.charCodeAt(0);
	var j = charZ.charCodeAt(0);

	for(; i<=j; i++) {
		arr.push(String.fromCharCode(i)); //change i from charCode to String
	}

	return arr;
}

encode = encode.concat(genCharArray('A','Z'));
encode = encode.concat(genCharArray('0','9'));
encode = encode.concat(genCharArray('a','z'));

var getShortUrl = function(longUrl, callback) {
	 
	 if(longUrl.indexOf('http') === -1) {
 		longUrl = "http://" + longUrl;
 	}

 	redisClient.get(longUrl, function(err, shortUrl) {
 		if(shortUrl) {
 			callback({
 				longUrl: longUrl,
 				shortUrl: shortUrl
 			});
 		}else {
 			urlModel.findOne({longUrl: longUrl}, function(err, url){
 			if(url) {
 				callback(url);
 			}else {
 				generateUrl(function(shortUrl){
 					var url = new urlModel({shortUrl: shortUrl, longUrl: longUrl});
 					url.save();
 					redisClient.set(shortUrl, longUrl);
 					redisClient.set(longUrl, shortUrl);
 					callback(url);
 			})
 		}

 	})

 		}
 	})


}

var generateUrl = function(callback) {
		
	urlModel.find({}, function(err, urls){
	callback(convertTo62(urls.length));
	
	})
		
}

var convertTo62 = function(num) {

	var ret = ""
	
	do {
		ret = ret + encode[num % 62];
		num = Math.floor(num / 62);
	} while(num);

	return ret;

}

var getLongUrl = function(shortUrl, callback) {
	
	redisClient.get(shortUrl, function(err, longUrl) {
		if(longUrl) {
			callback({
				longUrl: longUrl,
				shortUrl: shortUrl
			});
		}else {
			urlModel.findOne({shortUrl: shortUrl}, function(err, url){
				callback(url);
			});
		}
	})


}

module.exports = {
	getShortUrl: getShortUrl,
	generateUrl: generateUrl,
	getLongUrl: getLongUrl
}