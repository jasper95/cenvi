import React, { Component } from 'react';
import Login from 'components/Login/Login';
import Navbar from 'components/Navbar/Navbar';
import Contact from 'components/Contact/Contact';

class LoginPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        let referrer = undefined;
        try {
            referrer = this.props.location.state.referrer;
        } catch (ignore) {}
        return (
            <div>
                <Navbar />
                <section id="login-section">
                    <Login referrer={referrer} />
                </section>
                <Contact />
            </div>
        );
    }
}

export default LoginPage;
