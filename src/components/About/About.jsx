import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './About.css';

class About extends Component {
    render() {
        return (
            <div id="about-container">
                <Row>
                    <Col
                        id="col-left"
                        className="col-about"
                        xs="12"
                        sm="4"
                        md="4">
                        <h1>WHAT WE DO</h1>
                        <p>
                            CENVI uses analytical and ICT-based methods to
                            monitor, assess, and protect natural resources.
                            CENVI intends to contribute in strengthening the
                            leadership of Central Visayas in the ICT industry,
                            particularly in the emerging fields of data science,
                            remote sensing, and artificial intelligence, by
                            contributing to environmental conservation,
                            research, and development.
                        </p>
                        <p>
                            The center also hopes to be a long-term partner of
                            the local governments in Central Visayas in
                            developing livable and resilient communities while
                            ensuring ecological integrity.
                        </p>
                    </Col>
                    <Col
                        id="col-center"
                        className="col-about"
                        xs="12"
                        sm="4"
                        md="4">
                        <h1>WEB PORTAL</h1>
                        <p>
                            As a web-based platform, CENVI web portal provides
                            its audience access to various tools (e.g map
                            viewer, downloads), appropriate access to important
                            information, and effective channels of communication
                            through single sign on. Users can also sign up for
                            an account.
                        </p>
                    </Col>
                    <Col
                        id="col-right"
                        className="col-about"
                        xs="12"
                        sm="4"
                        md="4">
                        <h1>WHO WE ARE</h1>
                        <p>
                            We are a team comprised of members who can handle a
                            variety of tasks and are able to transition
                            throughout the company at a moment's notice. There
                            are important components that a team must have in
                            order to be the efficient and effective force that
                            most managers desire of them.
                        </p>
                        <p>
                            CENVI is implemented by the University of the
                            Philippines Cebu through the Niche Centers in the
                            Regions for R&D (NICER) program of the Department of
                            Science and Technology.
                        </p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default About;
