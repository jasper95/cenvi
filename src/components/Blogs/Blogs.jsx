import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Blogs.css';
import { Icon } from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { calendar } from 'react-icons-kit/fa/calendar';

const cmsURL = process.env.REACT_APP_CMS_HOST_PORT;

class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            count: 0,
            hasMore: true,
            totalCount: 0,
        };
    }

    componentDidMount() {
        this.getTotalCount();
    }

    getTotalCount = _ => {
        fetch(`${cmsURL}/blogs/count`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    this.setState({ totalCount: response, hasMore: true });
                    this.getBlogs();
                    return;
                }
                this.setState({ hasMore: false });
            })
            .catch(err => console.error(err));
    };

    getBlogs = _ => {
        if (this.state.count >= this.state.totalCount) {
            this.setState({ hasMore: false });
            return;
        }

        fetch(`${cmsURL}/blogs?_start=0&_limit=${this.state.count + 5}`)
            .then(response => response.json())
            .then(response =>
                this.setState({ blogs: response, count: this.state.count + 5 }),
            )
            .catch(err => console.error(err));
    };

    render() {
        const { blogs } = this.state;

        return (
            <div>
                <div id="page-header">
                    <h1>BLOGS</h1>
                </div>
                <div id="blogs-container">
                    <InfiniteScroll
                        dataLength={this.state.count}
                        next={this.getBlogs}
                        hasMore={this.state.hasMore}
                        loader={
                            <p className="blogs-scroll-message">
                                Loading blogs...
                            </p>
                        }
                        endMessage={
                            <EndMessage totalCount={this.state.totalCount} />
                        }>
                        {blogs.map(function(blog, id) {
                            const timestamp = new Date(blog.created_at);
                            const date = timestamp.toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            });
                            let cover_photo;
                            try {
                                cover_photo = `${cmsURL}${
                                    blog.cover_photo.url
                                }`;
                            } catch (err) {
                                console.error(err);
                            }

                            return (
                                <BlogDetails
                                    title={blog.title}
                                    subtitle={blog.subtitle}
                                    author={blog.author.username}
                                    created_at={date}
                                    cover_photo={cover_photo}
                                    hrefVal={
                                        '/blogs/' + blog.id + '/' + blog.title
                                    }
                                    key={id}
                                    id={'blog-' + id}
                                />
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

function BlogDetails(props) {
    return (
        <a className="blogs-container" href={props.hrefVal}>
            <div className="blogs-cover_photo">
                <img src={props.cover_photo} alt={props.title} />
            </div>
            <div className="blogs-details">
                <h3 className="blogs-title">{props.title}</h3>
                <p className="blogs-subtitle">{props.subtitle}</p>
                <h6 className="blogs-author">
                    <Icon icon={pencil} size={13} className="blogs-icon" />
                    {props.author}
                </h6>
                <h6 className="blogs-created_at">
                    <Icon icon={calendar} size={13} className="blogs-icon" />
                    {props.created_at}
                </h6>
            </div>
        </a>
    );
}

function EndMessage(props) {
    const { totalCount } = props;

    if (totalCount) {
        return <p className="blogs-scroll-message">That's all the blogs!</p>;
    }
    return <p className="blogs-scroll-message">No blogs yet</p>;
}

export default Blogs;
