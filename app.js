var express = require('express');
var httpsRedirect = require('express-https-redirect');
var gallery = require('./express-photo-gallery');

var app = express();

var options = {
  title: 'Sailing Priorities'
};

flickrOptions = {
    api_key: process.env.FLICKR_KEY,
    secret: process.env.FLICKR_SECRET,
    user_id: process.env.FLICKR_USER.toUpperCase()
};

//app.use('/', httpsRedirect(true));
app.use('/', gallery(flickrOptions, options));

console.log("Listening on port 3000");
app.listen(3000);