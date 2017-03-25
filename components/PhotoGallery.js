/** @jsx React.DOM */

var React = require('react');
var phin = require("../phin");
var ReactDOM = require('react-dom');
var InfiniteScroll = require('react-infinite-scroller');

var PhotoGallery = React.createClass({
    getInitialState : function() {
        return {
            fetchUrl : this.props.data.fetchUrl,
            photos : this.props.data.gallery.photos,
            hasMore  : this.props.data.hasMore
        };
    },

    loadMorePhotos: function (pageNumber) {
        var self = this;
        var photos = self.state.photos;
        var uri = this.state.fetchUrl +pageNumber;
        phin( {"url": uri }, function(err, body, response) {
            if (!err && response.statusCode == 200) {
                var payload = JSON.parse(body);
                var hasMore = payload.totalPages - pageNumber > 0;
                payload.photos.map(function (photo) {
                    photos.push(photo);
                });
                self.setState({photos : photos, hasMore : hasMore });
            }
        }); 
    },

    render: function () {
        const photos = this.state.photos.map(function (photo) { 
        return (
            <div key={photo.id} className="col-md-4">
                <div className="thumbnail">
                    <a href={photo.src} data-toggle="lightbox">
                        <img src={photo.thumb} style={{width:'100%'}}/>
                    </a>
                </div>
            </div>
        );
    });

    return (
        <div className="container">
            <h1 id="main-title">Photos!</h1>
            <div className="row">
                <InfiniteScroll
                    pageStart={1}
                    loadMore={this.loadMorePhotos}
                    hasMore={this.state.hasMore}
                    loader={<div className="loader">Loading ...</div>}>
                    {photos}
                </InfiniteScroll>
            </div>
        </div>
    )}
  });

/* Module.exports instead of normal dom mounting */
module.exports = PhotoGallery;