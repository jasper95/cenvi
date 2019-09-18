import React, { Component } from 'react';
// import { customFileInput } from '../scripts/custom-file-input';
import Navbar from 'components/Navbar/Navbar';
import ShapefileUpload from 'components/ShapefileUpload/ShapefileUpload';
import Contact from 'components/Contact/Contact';

class ShapefileUploadPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    customFileInput();
  }

  render() {
    return (
      <div>
        <Navbar />
        <section id="shapefile-upload-section">
          <ShapefileUpload />
        </section>
        <Contact />
      </div>
    );
  }
}

export default ShapefileUploadPage;
