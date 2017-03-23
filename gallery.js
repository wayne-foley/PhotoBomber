var React = require('react');
var Router = require('router');
var ReactDOMServer = require('react-dom/server');
var PhotoGallery = React.createFactory(require('./components/PhotoGallery'));
var Flickr = require('./flickr');

module.exports = function(flickrOptions, options) {
  var app = Router();

  app.get('/', function(req, res) {
      Flickr(flickrOptions, 1, function(payload) {
        var props = payload;
	    var reactHtml = ReactDOMServer.renderToString(<PhotoGallery photos={props} />);
        res.render('index.ejs', {reactOutput: reactHtml, reactProps: JSON.stringify(props)});
    });
  });

  return app;
};