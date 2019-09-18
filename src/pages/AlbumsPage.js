import React, { Component } from 'react';
import Navbar from 'components/Navbar/Navbar';
import Contact from 'components/Contact/Contact';
import Albums from 'components/Albums/Albums';

class AlbumsPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <Navbar />
                <Albums />
                <Contact />
            </div>
        );
    }
}

export default AlbumsPage;
