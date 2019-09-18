import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import { Icon } from 'react-icons-kit';
import { calendar } from 'react-icons-kit/fa/calendar';
import './Album.css';

const cmsURL = process.env.REACT_APP_CMS_HOST_PORT;

class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            album: '',
            pictures: [],
            photoIndex: 0,
            isViewerOpen: false,
        };
    }

    componentDidMount() {
        this.getAlbum();
    }

    getAlbum = _ => {
        fetch(`${cmsURL}/albums/${this.state.id}/${this.state.title}`)
            .then(response => response.json())
            .then(response =>
                this.setState({
                    album: response,
                    pictures: response.pictures,
                }),
            )
            .catch(err => console.error(err));
    };

    render() {
        const { album, pictures, photoIndex, isViewerOpen } = this.state;

        if (album) {
            const timestamp = new Date(album.created_at);
            const date = timestamp.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
            let cover_photo;
            try {
                cover_photo = `${cmsURL}${album.cover_photo.url}`;
            } catch (err) {
                console.error(err);
            }
            return (
                <div>
                    <div id="page-header">
                        <h1>ALBUM</h1>
                        <hr />
                        <div className="album-details">
                            <div className="album-titles">
                                <h3 className="album-title">{album.title}</h3>
                                <p className="album-description">
                                    {album.description}
                                </p>
                            </div>
                            <div className="album-date">
                                <h6 className="album-created_at">
                                    <Icon
                                        icon={calendar}
                                        size={13}
                                        className="album-icon"
                                    />
                                    {date}
                                </h6>
                            </div>
                            <div className="album-cover_photo">
                                <img src={cover_photo} alt={album.title} />
                            </div>
                        </div>
                    </div>
                    <ul className="album-pictures-container">
                        {pictures.map((picture, index) => {
                            return (
                                <li key={index}>
                                    <img
                                        className="album-picture"
                                        src={cmsURL + picture.url}
                                        alt={picture.name}
                                        onClick={() =>
                                            this.setState({
                                                photoIndex: index,
                                                isViewerOpen: true,
                                            })
                                        }
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    {isViewerOpen && (
                        <Lightbox
                            mainSrc={cmsURL + pictures[photoIndex].url}
                            nextSrc={
                                cmsURL + pictures[(photoIndex + 1) % pictures.length].url
                            }
                            prevSrc={
                                cmsURL + pictures[
                                    (photoIndex + pictures.length - 1) %
                                        pictures.length
                                ].url
                            }
                            onCloseRequest={() =>
                                this.setState({ isViewerOpen: false })
                            }
                            onMovePrevRequest={() =>
                                this.setState({
                                    photoIndex:
                                        (photoIndex + pictures.length - 1) %
                                        pictures.length,
                                })
                            }
                            onMoveNextRequest={() =>
                                this.setState({
                                    photoIndex:
                                        (photoIndex + 1) % pictures.length,
                                })
                            }
                        />
                    )}
                </div>
            );
        } else {
            return <div />;
        }
    }
}

export default Album;
