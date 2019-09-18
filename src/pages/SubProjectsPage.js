import React, { Component } from 'react';
import Navbar from 'components/Navbar/Navbar';
import SubProjects from 'components/SubProjects/SubProjects';
import Contact from 'components/Contact/Contact';

class SubProjectsPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <Navbar />
                <section id="projectsId">
                    <SubProjects />
                </section>
                <Contact />
            </div>
        );
    }
}

export default SubProjectsPage;
