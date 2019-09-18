import React, { Component } from 'react';
// import { customFileInput } from '../scripts/custom-file-input';
import Navbar from 'components/Navbar/Navbar';
import FileUpload from 'components/FileUpload/FileUpload';
import Contact from 'components/Contact/Contact';

class FileUploadPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    customFileInput();
  }

  render() {
    return (
          <div id="page-container">
              <Navbar />
              <section id="file-upload-section">
                  <FileUpload />
                </section>
              <Contact />
            </div>
    );
  }
}

export default FileUploadPage;
