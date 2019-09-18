import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { calendar } from 'react-icons-kit/fa/calendar';
import './Blog.css';

const cmsURL = process.env.REACT_APP_CMS_HOST_PORT;
const showdown = require('showdown');
const converter = new showdown.Converter();

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            blog: '',
            content: {},
        };
    }

    componentDidMount() {
        this.getBlog();
    }

    getBlog = _ => {
        fetch(`${cmsURL}/blogs/${this.state.id}/${this.state.title}`)
            .then(response => response.json())
            .then(response =>
                this.setState({
                    blog: response,
                    content: converter.makeHtml(response.content),
                }),
            )
            .catch(err => console.error(err));
    };

    createHTML = _ => {
        return { __html: this.state.content };
    };

    render() {
        const { blog } = this.state;

        if (blog) {
            const timestamp = new Date(blog.created_at);
            const date = timestamp.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
            let cover_photo;
            try {
                cover_photo = `${cmsURL}${blog.cover_photo.url}`;
            } catch (err) {
                console.error(err);
            }
            return (
                <div>
                    <div id="page-header">
                        <h1>BLOGS</h1>
                        <hr />
                        <div className="blog-details">
                            <div className="blog-titles">
                                <h3 className="blog-title">{blog.title}</h3>
                                <p className="blog-subtitle">{blog.subtitle}</p>
                            </div>
                            <div className="blog-author-date">
                                <h6 className="blog-author">
                                    <Icon
                                        icon={pencil}
                                        size={13}
                                        className="blog-icon"
                                    />
                                    {blog.author.username}
                                </h6>
                                <h6 className="blog-created_at">
                                    <Icon
                                        icon={calendar}
                                        size={13}
                                        className="blog-icon"
                                    />
                                    {date}
                                </h6>
                            </div>
                            <div className="blog-cover_photo">
                                <img src={cover_photo} alt={blog.title} />
                            </div>
                        </div>
                    </div>
                    <div className="blog-container">
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{
                                __html: this.state.content,
                            }}
                        />
                    </div>
                </div>
            );
        } else {
            return <div />;
        }
    }
}

export default Blog;
