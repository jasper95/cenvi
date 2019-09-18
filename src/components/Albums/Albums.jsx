import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Albums.css';
import { Icon } from 'react-icons-kit';
import { calendar } from 'react-icons-kit/fa/calendar';

const cmsURL = process.env.REACT_APP_CMS_HOST_PORT;

class Albums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            count: 0,
            hasMore: true,
            totalCount: 0,
        };
    }

    componentDidMount() {
        this.getTotalCount();
    }

    getTotalCount = _ => {
        fetch(`${cmsURL}/albums/count`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    this.setState({ totalCount: response, hasMore: true });
                    this.getAlbums();
                    return;
                }
                this.setState({ hasMore: false });
            })
            .catch(err => console.error(err));
    };

    getAlbums = _ => {
        if (this.state.count >= this.state.totalCount) {
            this.setState({ hasMore: false });
            return;
        }

        fetch(`${cmsURL}/albums?_start=0&_limit=${this.state.count + 5}`)
            .then(response => response.json())
            .then(response =>
                this.setState({ albums: response, count: this.state.count + 5 }),
            )
            .catch(err => console.error(err));
    };

    render() {
        const { albums } = this.state;

        return (
            <div>
                <div id="page-header">
                    <h1>ALBUMS</h1>
                </div>
                <div id="albums-container">
                    <InfiniteScroll
                        dataLength={this.state.count}
                        next={this.getAlbums}
                        hasMore={this.state.hasMore}
                        loader={
                            <p className="albums-scroll-message">
                                Loading albums...
                            </p>
                        }
                        endMessage={
                            <EndMessage totalCount={this.state.totalCount} />
                        }>
                        {albums.map(function(album, id) {
                            const timestamp = new Date(album.created_at);
                            const date = timestamp.toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            });
                            let cover_photo;
                            try {
                                cover_photo = `${cmsURL}${
                                    album.cover_photo.url
                                }`;
                            } catch (err) {
                                console.error(err);
                            }

                            return (
                                <AlbumDetails
                                    title={album.title}
                                    description={album.description}
                                    created_at={date}
                                    cover_photo={cover_photo}
                                    hrefVal={
                                        '/albums/' + album.id + '/' + album.title
                                    }
                                    key={id}
                                    id={'album-' + id}
                                />
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

function AlbumDetails(props) {
    return (
        <a className="albums-container" href={props.hrefVal}>
            <div className="albums-cover_photo">
                <img src={props.cover_photo} alt={props.title} />
            </div>
            <div className="albums-details">
                <h3 className="albums-title">{props.title}</h3>
                <p className="albums-description">{props.description}</p>
                <h6 className="albums-created_at">
                    <Icon icon={calendar} size={13} className="albums-icon" />
                    {props.created_at}
                </h6>
            </div>
        </a>
    );
}

function EndMessage(props) {
    const { totalCount } = props;

    if (totalCount) {
        return <p className="albums-scroll-message">That's all the albums!</p>;
    }
    return <p className="albums-scroll-message">No albums yet</p>;
}

export default Albums;
