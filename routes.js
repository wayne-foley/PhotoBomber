var React = require('react');
var Router = require('router');
var Flickr = require('./flickr');
var ReactDOMServer = require('react-dom/server');
var PhotoGallery = React.createFactory(require('./components/PhotoGallery'));

module.exports = {
  index: function(flickrOptions, fetchUrl, options) {
    var app = Router();

    app.get('/', function(req, res) {
        Flickr(flickrOptions, 1, function(payload) {
          var hasMore = payload.totalPages - 1 > 0; 
          var props = { fetchUrl: fetchUrl, gallery: payload, hasMore: hasMore };
          var reactHtml = ReactDOMServer.renderToString(<PhotoGallery data={props} />);
          res.render('index.ejs', {reactOutput: reactHtml, reactProps: JSON.stringify(props)});
      });
    });

    return app;
  },

  page: function(flickrOptions, options) {
    var app = Router();

    app.get('/:pageNumber', function(req, res) {
        Flickr(flickrOptions, req.params.pageNumber, function(payload) {
          res.send(payload);
      });
    });

    return app; 
  },
}