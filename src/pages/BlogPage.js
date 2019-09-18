import React, { Component } from 'react';
import Navbar from 'components/Navbar/Navbar';
import Contact from 'components/Contact/Contact';
import Blog from 'components/Blog/Blog';

class BlogPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const { id, title } = this.props.match.params;
        return (
            <div>
                <Navbar />
                <Blog id={id} title={title} />
                <Contact />
            </div>
        );
    }
}

export default BlogPage;
