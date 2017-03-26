var jsx = require('node-jsx').install();
var express = require('express');
var httpsRedirect = require('express-https-redirect');
var routes = require('./routes');
var path = require('path');

var app = express();
var fetchUrl = process.env.FETCH_URL;
var flickrOptions = {
    api_key: process.env.FLICKR_KEY,
    secret: process.env.FLICKR_SECRET,
    user_id: process.env.FLICKR_USER.toUpperCase()
};

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', httpsRedirect(true));
app.use('/', routes.index(flickrOptions, fetchUrl));
app.use('/page', routes.page(flickrOptions));

console.log("Listening on port 3000");
app.listen(3000);