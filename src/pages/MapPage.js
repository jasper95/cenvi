import React, { Component } from 'react';
import Map from 'components/Map/Map';
import Navbar from 'components/Navbar/Navbar';
import Contact from 'components/Contact/Contact';

class MapPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <Navbar />
                <section id="map-section">
                    <Map />
                </section>
                <Contact />
            </div>
        );
    }
}

export default MapPage;
