import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './Team.css';

class Team extends Component {
    render() {
        return (
            <div id="team">
                <div id="page-header">
                    <h1>CENVI TEAM</h1>
                </div>
                <Row>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="flores"
                            className="team-icon"
                            src={'/images/team/flores.png'}
                        />
                        <div className="team-name">
                            Dr. Mary Joyce Flores, PhD
                        </div>
                        <div className="team-role">Project Leader</div>
                        <div className="team-links" />
                    </Col>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="sinogaya"
                            className="team-icon"
                            src={'/images/team/sinogaya.png'}
                        />
                        <div className="team-name">
                            Dr. Jonnifer Sinogaya, PhD
                        </div>
                        <div className="team-role">Project Consultant</div>
                    </Col>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="silapan"
                            className="team-icon"
                            src={'/images/team/silapan.jpg'}
                        />
                        <div className="team-name">Prof. Judith Silapan</div>
                        <div className="team-role">Project Staff L3</div>
                    </Col>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="ai"
                            className="team-icon"
                            src={'/images/team/ai.jpg'}
                        />
                        <div className="team-name">Prof. Aileen Vicente</div>
                        <div className="team-role">Project Staff L2</div>
                    </Col>
                </Row>

                <Row>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="chito"
                            className="team-icon"
                            src={'/images/team/chito.webp'}
                        />
                        <div className="team-name">Chito Patino</div>
                        <div className="team-role">Supervising SRS</div>
                    </Col>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="terai"
                            className="team-icon"
                            src={'/images/team/terai.jpg'}
                        />
                        <div className="team-name">Terai Alicaba</div>
                        <div className="team-role">Information Officer III</div>
                    </Col>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="enzo"
                            className="team-icon"
                            src={'/images/team/enzo.jpg'}
                        />
                        <div className="team-name">Enzo Campomanes</div>
                        <div className="team-role">Senior SRS</div>
                    </Col>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="pau"
                            className="team-icon"
                            src={'/images/team/pau.jpg'}
                        />
                        <div className="team-name">
                            Isabella Pauline Lopez Quijano
                        </div>
                        <div className="team-role">Senior SRS</div>
                    </Col>
                </Row>

                <Row>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="liela"
                            className="team-icon"
                            src={'/images/team/liela.jpg'}
                        />
                        <div className="team-name">Liela Juntilla</div>
                        <div className="team-role">PDO 1 Procurement</div>
                    </Col>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="anj"
                            className="team-icon"
                            src={'/images/team/anj.jpg'}
                        />
                        <div className="team-name">Angeli Louise Cando</div>
                        <div className="team-role">PDO 1 Administration</div>
                    </Col>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="faye"
                            className="team-icon"
                            src={'/images/team/faye.jpg'}
                        />
                        <div className="team-name">Faye Lorraine Cuaresma</div>
                        <div className="team-role">
                            Clerk IV Processing of Documents
                        </div>
                    </Col>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="den"
                            className="team-icon"
                            src={'/images/team/den.jpg'}
                        />
                        <div className="team-name">Deneir Uy</div>
                        <div className="team-role">SRS II - Biodiversity</div>
                    </Col>
                </Row>

                <Row>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="justine"
                            className="team-icon"
                            src={'/images/team/justine.jpg'}
                        />
                        <div className="team-name">Justine Navaja</div>
                        <div className="team-role">
                            SRS II - Mango Disease & Pest
                        </div>
                    </Col>
                    <Col className="team-column" xs="12" sm="12" md="6" lg="3">
                        <img
                            alt="flor"
                            className="team-icon"
                            src={'/images/team/flor.jpg'}
                        />
                        <div className="team-name">Florwilyn Cayson</div>
                        <div className="team-role">SRS II - Water Resource</div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Team;
