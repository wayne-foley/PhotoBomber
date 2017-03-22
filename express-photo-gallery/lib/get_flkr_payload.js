var _ = require('lodash');
var Flickr = require('flickrapi');
var async = require("async");


var getPhotoPage = function(pageNumber, user_id, flickr, callback) {
  var searchOptions = {
    user_id: user_id,
    page: pageNumber,
    per_page: 500,
    extras: "url_t,url_m, url_l,url_o"
  }

  flickr.photos.search(searchOptions, function(err, result) {
    var items = [];
    result.photos.photo.forEach(function(photo) {
      var photoObject = {};

      photoObject.src = photo.url_l;
      photoObject.downloadUrl =  photo.url_o;
      photoObject.thumb = photo.url_m;

      items.push(photoObject);
    });

    callback(false, items);
  });
};

module.exports = function(flickrOptions, userOptions, callback) {
  Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  getPhotoPage(1, flickrOptions.user_id, flickr, function(err, items) {
    var allPhotos = [].concat.apply([], items);
    var mandatorySettings = {
      dynamic: true,
      dynamicEl: allPhotos,
      closable: false,
      escKey: false,
    };

    var optionalSettings = {
      download: true
    };

    var payload = _.assign(optionalSettings, userOptions, mandatorySettings);

    callback(payload);
    });
  });
}