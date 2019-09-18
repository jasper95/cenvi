import React, { Component } from 'react';
import Team from 'components/Team/Team';
import Navbar from 'components/Navbar/Navbar';
import Contact from 'components/Contact/Contact';

class TeamPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <Navbar />
                <section id="team-section">
                    <Team />
                </section>
                <Contact />
            </div>
        );
    }
}

export default TeamPage;
