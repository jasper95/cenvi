import React, { Component } from 'react';
import 'leaflet-ajax';
import MapShapefiles from '../MapShapefiles/MapShapefiles';

const allStr = 'All';
const apiURL = process.env.REACT_APP_API_HOST_PORT;

class MapCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.category,
            categorizedShapefilesIds: [],
            allShapefilesIds: [],
            componentDidMount: false,
        };
        this.getLayersByCategory();
    }

    getLayersByCategory = _ => {
        if (this.props.category === allStr) {
            fetch(`${apiURL}/shapefile/id`, { credentials: 'include' })
                .then(response => response.json())
                .then(response =>
                    this.setState({ categorizedShapefilesIds: response.data }),
                )
                .catch(err => console.error(err));
        } else {
            fetch(`${apiURL}/shapefile/category/${this.state.category}`, {
                credentials: 'include',
            })
                .then(response => response.json())
                .then(response =>
                    this.setState({ categorizedShapefilesIds: response.data }),
                )
                .catch(err => console.error(err));
        }
    };

    render() {
        return (
            <div>
                {this.state.categorizedShapefilesIds.map((shapefileId, idx) => {
                    return (
                        <div key={idx}>
                            <MapShapefiles
                                id={shapefileId.id}
                                updateLoadedLayers={
                                    this.props.updateLoadedLayers
                                }
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    componentDidMount() {
        this.getLayersByCategory();
    }
}

export default MapCategories;
