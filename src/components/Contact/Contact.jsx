import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { mapMarker } from 'react-icons-kit/fa/mapMarker';
import { phone } from 'react-icons-kit/fa/phone';
import { envelope } from 'react-icons-kit/fa/envelope';
import { facebook } from 'react-icons-kit/fa/facebook';
import './Contact.css';

let contactDetails = {
    address:
        'University of the Philippines Cebu, Gorordo Ave., Lahug, Cebu City',
    telNoCenvi: '(032) 231-0223',
    telNoUp: '(032) 232-8185',
    localCenvi: '(local) 109',
    email: 'upcebunicer@gmail.com',
    fbPage: 'https://www.facebook.com/upcenvi/',
};

function GetContactDetails(props) {
    const contactDetails = (
        <div>
            <h6>
                <div className="contact-detail-container">
                    <Icon icon={mapMarker} size={13} className="contact-icon" />
                    {props.details.address}
                </div>
                <div className="contact-detail-container">
                    <Icon icon={phone} size={13} className="contact-icon" />
                    {props.details.telNoCenvi} <br />
                    {props.details.telNoUp} <br />
                    {props.details.localCenvi}
                </div>
                <Icon icon={envelope} size={12} className="contact-icon" />
                {props.details.email}
                <br />
                <div className="contact-detail-container">
                    <Icon icon={facebook} size={13} className="contact-icon" />
                    <a href={props.details.fbPage}>{props.details.fbPage}</a>
                </div>
            </h6>
        </div>
    );

    return contactDetails;
}

class Contact extends Component {
    render() {
        return (
            <div id="contact-container">
                <Container>
                    <h1>CONTACT US</h1>
                    <GetContactDetails details={contactDetails} />
                    <hr />
                    <h6 id="copyright">
                        Copyright © {new Date().getFullYear()} Central Visayas
                        Center for Environmental Informatics
                    </h6>
                </Container>
            </div>
        );
    }
}

export default Contact;
