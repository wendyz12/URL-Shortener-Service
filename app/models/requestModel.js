var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
	shortUrl: String,
	referer: String,
	platform: String,
	browser: String,
	timestamp: Date
});

var requestModel = mongoose.model('requestModel', requestSchema);

module.exports = requestModel;