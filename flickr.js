var phin = require('./phin');

var getPhotoPage = function(pageNumber, user_id, api_key, callback) {
    var per_page = 50;
    var extras = "url_t,url_m, url_l,url_o";
    var flickrMethodUri = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json";
    var uri = `${flickrMethodUri}&api_key=${api_key}&user_id=${user_id}&per_page=${per_page}&extras=${extras}&page=${pageNumber}`;
    
    phin( {"url": uri }, function(err, body, response) {
        if (!err && response.statusCode == 200) {
          var items = [];
          var startPos = body.indexOf('({');
          var endPos = body.indexOf('})');
          var jsonString = body.substring(startPos+1, endPos+1);
          var result = JSON.parse(jsonString);

          result.photos.photo.forEach(function(photo) {
            var photoObject = {};
            photoObject.id = photo.id;
            photoObject.src = photo.url_l;
            photoObject.downloadUrl =  photo.url_o;
            photoObject.thumb = photo.url_m;

            items.push(photoObject);
          });
          var ret = { totalPages: result.photos.pages, photos: items };

          callback(ret);
        }
    }); 
};

module.exports = function(flickrOptions, pageNumber, callback) {
    getPhotoPage(pageNumber, flickrOptions.user_id, flickrOptions.api_key, callback);
}