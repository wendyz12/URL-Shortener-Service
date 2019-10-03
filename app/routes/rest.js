var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jasonParser = bodyParser.json(); // parse what? 

var urlService = require('../services/urlService');
var statsService = require('../services/statsService');

router.post('/urls', jasonParser, function(req, res) {
	var longUrl = req.body.longUrl;

// ======= change from syncronous program to asynchronous program ======
	// var shortUrl = urlService.getShortUrl(longUrl, req.app.longToShortHash, req.app.shortToLongHash);
	// res.json({
	// 	shortUrl: shortUrl,
	// 	longUrl: longUrl
	// });

// =========

	urlService.getShortUrl(longUrl, function(url) {
		res.json(url);
	});

});

router.get("/urls/:shortUrl", function(req, res) {
	var shortUrl = req.params.shortUrl;
	urlService.getLongUrl(shortUrl, function(url){
		if(url) {
			res.json(url);
		}else {
			console.log("error");
		}
	});
})

router.get("/urls/:shortUrl/:info", function(req, res) {
	statsService.getUrlInfo(req.params.shortUrl, req.params.info, function(data) {
		res.json(data);
	})
})

module.exports = router;