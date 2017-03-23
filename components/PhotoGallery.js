/** @jsx React.DOM */
var React = require('react');
var React2 = require('react');

var PhotoGallery = React2.createClass({
      componentDidMount: function () {
      },
      render: function () {
        const photos = this.props.photos.map((photo) => { 
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
                    {photos}
                </div>
            </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = PhotoGallery;