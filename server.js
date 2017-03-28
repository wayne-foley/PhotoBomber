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

var allowCrossDomain = function(req, res, next) {
    //this is here to deal with www.domain.com vs. just domain.com
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', httpsRedirect(true));
app.use('/', allowCrossDomain);
app.use('/', routes.index(flickrOptions, fetchUrl));
app.use('/page', routes.page(flickrOptions));

console.log("Listening on port 3000");
app.listen(3000);