import React, { Component } from 'react';
import 'leaflet-ajax';
import './MapShapefiles.css';

const apiURL = process.env.REACT_APP_API_HOST_PORT;

class MapShapefiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shapefile: [
                {
                    id: 0,
                    shapefile_name: '',
                    filename: '',
                    filepath: '',
                    category: '',
                    uid: '',
                },
            ],
            id: this.props.id,
            tags: [],
        };
        this.getShapefile();
        //this.getTags();
    }
    getShapefile = _ => {
        fetch(`${apiURL}/shapefile/id/${this.state.id}`, {
            credentials: 'include',
        })
            .then(response => response.json())
            .then(response => this.setState({ shapefile: response.data }))
            .catch(err => console.error(err));
    };
    /*getTags = _ => {
        fetch(`http://localhost:4000/tags?shapefile_id=${this.state.id}`, {credentials: 'include'})
            .then(response => response.json())
            .then(data => this.setState({ tags: response.data }))
            .catch(err => console.error(err));
    };*/
    render() {
        const filename = this.state.shapefile[0].filename;
        const id = this.state.shapefile[0].id;
        let uid = this.state.shapefile[0].uid;
        let updateLoadedLayers = this.props.updateLoadedLayers;

        return (
            <div className="shapefile-container">
                <button
                    className="shapefile-button"
                    onClick={() => updateLoadedLayers(id)}>
                    <h6 className="shapefile-title">
                        {this.state.shapefile[0].shapefile_name}
                    </h6>
                </button>
                <a
                    href={
                        apiURL +
                        '/shapefile/download/uid/' +
                        uid +
                        '/filename/' +
                        filename
                    }
                    download={filename}>
                    <button id="shapefile-download" className="btn">
                        <i className="fa fa-arrow-down" />
                    </button>
                </a>
                <button
                    title={stringifyTags(this.state.tags)}
                    id="shapefile-tags"
                    className="btn">
                    <i className="fa fa-ellipsis-v" />
                </button>
            </div>
        );
    }
}

function stringifyTags(tags) {
    var strTags = '';
    tags.map((tag, idx) => {
        return (strTags = strTags + ' #' + tag.tag);
    });
    return strTags;
}

export default MapShapefiles;
