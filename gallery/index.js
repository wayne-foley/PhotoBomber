var fs = require('fs');
var Router = require('router');
var static = require('serve-static');
var getFlickrPayload = require(__dirname + '/lib/get_flkr_payload');
var mustache = require('mustache');
var template = fs.readFileSync(__dirname + '/lib/template.html').toString();
mustache.parse(template);

var resolveModulePath = function(packageName) {
  var path = require.resolve(packageName);
  return path.split(packageName)[0] + packageName;
}

module.exports = function(flickrOptions, options) {
  var app = Router();

  options = options || {};

  app.use(static(resolveModulePath('lightgallery') + '/dist'));
  app.use('/js', static(resolveModulePath('lg-zoom') + '/dist'));
  app.use('/js', static(resolveModulePath('lg-thumbnail') + '/dist'));
  app.use('/js', static(resolveModulePath('lg-fullscreen') + '/dist'));

  app.get('/', function(req, res) {
      getFlickrPayload(flickrOptions, options, function(payload) {
        res.send(mustache.render(template, {
          title: options.title || 'Photo Gallery',
          data: JSON.stringify(payload)
        }));
      });
  });

  return app;
};