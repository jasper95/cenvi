import React, { Component } from 'react';
import Navbar from 'components/Navbar/Navbar';
import Contact from 'components/Contact/Contact';
import Blogs from 'components/Blogs/Blogs';

class BlogsPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <Navbar />
                <Blogs />
                <Contact />
            </div>
        );
    }
}

export default BlogsPage;
