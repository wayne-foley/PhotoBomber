var Flickr = require('flickrapi');

var getPhotoPage = function(pageNumber, user_id, flickr, callback) {
  var searchOptions = {
    user_id: user_id,
    page: pageNumber,
    per_page: 50,
    extras: "url_t,url_m, url_l,url_o"
  }

  flickr.photos.search(searchOptions, function(err, result) {
    var items = [];

    result.photos.photo.forEach(function(photo) {
      var photoObject = {};
      photoObject.id = photo.id;
      photoObject.src = photo.url_l;
      photoObject.downloadUrl =  photo.url_o;
      photoObject.thumb = photo.url_m;

      items.push(photoObject);
    });
    var ret = { totalPages: result.photos.pages, photos: items };

    callback(false, ret);
  });
};

module.exports = function(flickrOptions, pageNumber, callback) {
  Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    getPhotoPage(pageNumber, flickrOptions.user_id, flickr, function(err, payload) {
      callback(payload);
    });
  });
}