import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { cloudUpload } from 'react-icons-kit/fa/cloudUpload';
import './FileUpload.css';

const apiURL = process.env.REACT_APP_API_HOST_PORT;

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            fileTitle: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleChange(event) {
        this.setState({ fileTitle: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const uploadURL = `${apiURL}/download/upload`;
        let data = this.fileInput.current.files[0];
        let options = {
            credentials: 'include',
            header: {
                'content-type': 'multipart/form-data',
            },
            method: 'POST',
        };

        options.body = new FormData();
        options.body.append('file', data);
        options.body.append('fileTitle', this.state.fileTitle);

        this.setState({ fileTitle: '', message: '' });

        fetch(uploadURL, options)
            .then(response => response.json())
            .then(
                response =>
                    this.setState({
                        message: response.message,
                    }),
                event.target.reset(),
            )
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <div id="page-header">
                    <h1>UPLOAD</h1>
                    <hr />
                    <h3>Downloadable File</h3>
                </div>
                <div id="form-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            File
                            <br />
                            <input
                                name="file"
                                type="file"
                                id="upload-file"
                                className="form-control-file"
                                ref={this.fileInput}
                            />
                            <label
                                htmlFor="upload-file"
                                id="file-upload-label"
                                className="btn btn-primary">
                                <Icon
                                    icon={cloudUpload}
                                    size={15}
                                    className="contact-icon"
                                />
                                Choose File
                            </label>
                            <br />
                            <label htmlFor="upload-file-name">Title</label>
                            <input
                                name="fileName"
                                type="text"
                                id="upload-file-name"
                                placeholder="Title"
                                className="form-control"
                                value={this.state.fileName}
                                onChange={this.handleChange}
                            />
                            <button type="submit" className="btn btn-primary">
                                Upload
                            </button>
                        </div>
                        {this.state.message}
                    </form>
                </div>
            </div>
        );
    }
}

export default FileUpload;
