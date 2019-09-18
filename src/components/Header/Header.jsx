import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const logo = `images/logo.png`;
const upc = `images/upc.png`;
const up = `images/up.png`;

class Header extends Component {
    render() {
        return (
            <div>
                <div id="screen">
                    <Container>
                        <Row>
                            <Col xs="12" sm="12" md="7" className="column1">
                                <div className="img-container">
                                    <img
                                        id="img-logo"
                                        src={logo}
                                        alt="cenvi_logo"
                                    />
                                    <img
                                        id="img-upc"
                                        src={upc}
                                        alt="upc_logo"
                                    />
                                    <img id="img-up" src={up} alt="up_logo" />
                                </div>
                                <div className="header-title">
                                    <h1 id="header-region">CENTRAL VISAYAS </h1>
                                    <h1 id="header-office">
                                        CENTER FOR ENVIRONMENTAL INFORMATICS
                                    </h1>
                                </div>
                                <hr />
                                <p>
                                    Providing technical solutions to
                                    environmental problems
                                </p>

                                <Link className="nav-link" to="map">
                                    <Button
                                        id="header-button"
                                        color="primary"
                                        size="lg"
                                        active>
                                        Explore
                                    </Button>
                                </Link>
                            </Col>
                            <Col xs="12" sm="12" md="5" className="column2" />
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Header;
