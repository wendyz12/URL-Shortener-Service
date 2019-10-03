var express = require('express');
var app = express();
var restRouter = require('./routes/rest'); // if the package created by yourself, you need to specify the path
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var useragent = require('express-useragent');

mongoose.connect('mongodb://wendy:s376595051@ds227664.mlab.com:27664/tiny_url');

// app.shortToLongHash = {};
// app.longToShortHash = {};

app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/public', express.static(__dirname + "/public")); // if url starts with "/public", node js should go to public folder in the current path and fetch the static file; otherwise, node js may take it as line16


app.use(useragent.express()); // useragent process the useragent info in the request and put it back;

app.use('/api/v1', restRouter); // backend

app.use('/', indexRouter);

app.use('/:shortUrl', redirectRouter);

app.listen(3000);