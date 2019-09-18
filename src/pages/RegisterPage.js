import React, { Component } from 'react';
import Register from 'components/Register/Register';
import Navbar from 'components/Navbar/Navbar';
import Contact from 'components/Contact/Contact';
// import { comparePasswordFields } from '../scripts/compare-password-fields';

class RegistrationPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    comparePasswordFields();
  }

  render() {
    return (
          <div>
              <Navbar />
              <section id="register-section">
                  <Register />
                </section>
              <Contact />
            </div>
    );
  }
}

export default RegistrationPage;
