import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { cloudUpload } from 'react-icons-kit/fa/cloudUpload';
import './ShapefileUpload.css';

const apiURL = process.env.REACT_APP_API_HOST_PORT;

class ShapefileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            shapefileName: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleChange(event) {
        this.setState({ shapefileName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const uploadURL = `${apiURL}/shapefile/upload`;
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
        options.body.append('shapefileName', this.state.shapefileName);

        this.setState({ shapefileName: '', message: '' });

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
                    <h3>Shapefile</h3>
                </div>
                <div id="form-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            Shapefile
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
                                Choose KML File
                            </label>
                            <br />
                            <label htmlFor="upload-shapefile-name">
                                Shapefile Name
                            </label>
                            <input
                                name="shapefileName"
                                type="text"
                                id="upload-shapefile-name"
                                placeholder="Shapefile Name"
                                className="form-control"
                                value={this.state.shapefileName}
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

export default ShapefileUpload;
