import React, { Component } from 'react';
import Lightbox from 'react-images';
import InfiniteScroll from 'react-infinite-scroller';

class PhotoGallery extends Component {
    constructor() {
        super();
        this.state = { photos: [], 
                        hasMore: true, 
                        fetchUrl: 'https://lj7i692fk3.execute-api.us-west-2.amazonaws.com/prod/GetPhotos?page=',
                        lightboxIsOpen: false,
                        lightboxImage: [{ src: '' }]
                    };
        this.openLightbox = this.openLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
    }

    openLightbox(photo, event) {
        event.preventDefault();
        this.setState({
            lightboxIsOpen: true,
            lightboxImage: [{ src: photo.src }]
        });
    };

    closeLightbox () {
		this.setState({
			lightboxIsOpen: false
		});
	};

    loadMorePhotos(pageNumber) {
        var self = this;
        var photos = self.state.photos;
        this.loadPhotoPageFromFlickr(pageNumber, (err, resp) => {
            if (!err && resp) {
                var hasMore = resp.totalPages - pageNumber > 0;
                resp.photos.map(function (photo) {
                    photos.push(photo);
                    return null;
                });
                self.setState({photos : photos, hasMore : hasMore });
            }
        });
    };

    loadPhotoPageFromFlickr(page, callback) {
        let uri = this.state.fetchUrl + page;
        fetch(uri)
            .then(result =>result.json())
            .then(req => callback(null, req))
            .catch(err=>console.log(err));
    };

    render() {
        const self = this;
        const photos = this.state.photos.map(function (photo) { 
            return (
                <div key={photo.id} className="col-md-4">
                    <div className="thumbnail">
                        <a href={photo.src} onClick={ (e) => self.openLightbox(photo, e) } >
                            <img src={photo.thumb} alt='' style={{width:'100%'}}/>
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
                        pageStart={0}
                        initialLoad={true}
                        loadMore={(page) => this.loadMorePhotos(page)}
                        hasMore={this.state.hasMore}
                        loader={<div className="loader">Loading ...</div>}>
                        {photos}
                        <Lightbox
                            images={this.state.lightboxImage}
                            isOpen={this.state.lightboxIsOpen}
                            onClose={this.closeLightbox}
                            backdropClosesModal={true}
                            showCloseButton={false}
                            showImageCount={false}
                        />
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default PhotoGallery;