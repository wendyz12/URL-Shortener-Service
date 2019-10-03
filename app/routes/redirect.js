var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jasonParser = bodyParser.json();
var urlService = require('../services/urlService');
var statsService = require('../services/statsService')

router.get('*', function(req, res) {

	var shortUrl = req.originalUrl.slice(1);
	urlService.getLongUrl(shortUrl, function(url){
		if(url){
			res.redirect(url.longUrl);
			statsService.logRequest(shortUrl, req);
		}else {
			res.sendfile('./public/views/404.html');
		}
	});

});

module.exports = router;