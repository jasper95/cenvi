import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { mapMarker } from 'react-icons-kit/fa/mapMarker';
import { phone } from 'react-icons-kit/fa/phone';
import { file } from 'react-icons-kit/fa/file';
import { envelope } from 'react-icons-kit/fa/envelope';
import './Collaborators.css';

let uscDetails = {
    logo: 'usc.jpg',
    name: 'University of San Carlos',
    address: 'Corner M.J. Cuenco Ave. & R. Palma St., Cebu',
    phone: '412-1399',
    fax: '256-2657',
    email: 'information@usc.edu.ph',
};

let cituDetails = {
    logo: 'cit-u.png',
    name: 'Cebu Institute of Technology - University',
    address: 'N. Bacalso Avenue, Cebu',
    phone: '261-7741',
    fax: '261-7743',
    email: 'info@cit.edu',
};

let ctuDetails = {
    logo: 'ctu.png',
    name: 'Cebu Technological University - Argao Campus',
    address: 'Ed Kintanar St., Lamacan, Argao, Cebu',
    phone: '(6332) 485-8290',
    fax: '(6332) 485-8290',
    email: 'argao@ctu.edu.ph',
};

let upvDetails = {
    logo: 'upv.png',
    name: 'University of the Philippines Visayas',
    address: 'New Administration Building, Miagao, Iloilo',
    phone: '(033) 315-9494',
    fax: '(033) 315-9494',
    email: 'ipo@upv.edu.ph',
};

let nmrdcDetails = {
    logo: 'nmrdc.png',
    name: 'National Mango Research & Development Center',
    address: 'San Miguel, Jordan, Guimaras',
    phone: '(033) 237-1391',
    fax: '(033) 237-1391',
    email: 'bpi.guimaras@gmail.com',
};

function GetContactDetails(props) {
    var contactDetails = (
        <div className="collab-details">
            <img
                src={'/images/collaborators/' + props.details.logo}
                alt={props.details.logo}
            />
            <div>
                <h2>{props.details.name}</h2>
                <h6>
                    <div className="collab-detail-container">
                        <Icon
                            icon={mapMarker}
                            size={13}
                            className="collab-icon"
                        />
                        {props.details.address}
                    </div>
                    <div className="collab-detail-container">
                        <Icon icon={phone} size={13} className="collab-icon" />
                        {props.details.phone}
                    </div>
                    <div className="collab-detail-container">
                        <Icon icon={file} size={12} className="collab-icon" />
                        {props.details.fax}
                    </div>
                    <div className="collab-detail-container">
                        <Icon
                            icon={envelope}
                            size={12}
                            className="collab-icon"
                        />
                        {props.details.email}
                    </div>
                </h6>
            </div>
        </div>
    );

    return contactDetails;
}

class Collaborators extends Component {
    render() {
        return (
            <div id="collaborators-container">
                <h1>COLLABORATORS</h1>
                <Row>
                    <Col className="col-collab col-padding" xs="0" md="1" />
                    <Col className="col-collab" id="usc" xs="12" md="2">
                        <GetContactDetails details={uscDetails} />
                    </Col>

                    <Col className="col-collab" xs="12" md="2">
                        <GetContactDetails details={cituDetails} />
                    </Col>

                    <Col className="col-collab" xs="12" md="2">
                        <GetContactDetails details={ctuDetails} />
                    </Col>

                    <Col className="col-collab" xs="12" md="2">
                        <GetContactDetails details={upvDetails} />
                    </Col>

                    <Col className="col-collab" xs="12" md="2">
                        <GetContactDetails details={nmrdcDetails} />
                    </Col>

                    <Col className="col-collab col-padding" xs="0" md="1" />
                </Row>
            </div>
        );
    }
}

export default Collaborators;
