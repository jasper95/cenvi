import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import L from 'leaflet';
import 'leaflet-ajax';
import './MapLoadedLayers.css';

const toGeoJSON = require('@mapbox/togeojson');
const apiURL = process.env.REACT_APP_API_HOST_PORT;
var loadedLayers = [];

class MapLoadedLayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.loadedLayerId,
            shapefile: '',
            shapefile_name: '',
        };
        this.getShapefile();
    }

    getShapefile = _ => {
        fetch(`${apiURL}/shapefile/id/${this.state.id}/get`, {
            credentials: 'include',
        })
            .then(response => response.json())
            .then(response =>
                this.setState({
                    shapefile: response.data,
                    shapefile_name: response.shapefile_name,
                }),
            )
            .catch(err => console.error(err));
    };

    render() {
        return (
            <div>
                <Container className="loaded-container">
                    <Row>
                        <input
                            className="loaded-checkbox"
                            type="checkbox"
                            id={'checkLoadedLayer' + this.state.id}
                            onClick={this.update.bind(this)}
                        />
                        <label className="label">
                            <div>
                                <div className="loaded-label">
                                    {this.state.shapefile_name}
                                </div>
                            </div>
                        </label>
                    </Row>
                </Container>
            </div>
        );
    }
    update() {
        toggleShapefile(
            this.state.id,
            this.state.shapefile_name,
            this.state.shapefile,
            this.props.map,
            this.props.updateLegends,
        );
    }
}
function toggleShapefile(id, shapefile_name, shapefile, map, updateLegends) {
    let checkbox = document.getElementById('checkLoadedLayer' + id);
    let layer = loadedLayers.find(x => x.id === id);

    if (!layer) {
        showShapefile(id, shapefile_name, shapefile, map, updateLegends);
    } else {
        if (checkbox.checked) {
            map.addLayer(layer.data);
        } else {
            map.removeLayer(layer.data);
        }
    }
}

function showShapefile(id, shapefile_name, shapefile, map, updateLegends) {
    let doc = new DOMParser().parseFromString(shapefile, 'text/xml');
    let legend = [];
    let geojson = toGeoJSON.kml(doc);
    let data = new L.GeoJSON(geojson, {
        style: function style(feature) {
            return setColorByType(feature);
        },
        onEachFeature: function getLegend(feature) {
            let feature_legend = setLegendByType(feature);
            legend.push(feature_legend);
        },
    });
    map.addLayer(data);
    loadedLayers.push({ id: id, data: data });
    updateLegends(id, shapefile_name, legend);
}

function setColorByType(feature) {
    let type = feature.geometry.type;

    if (type === 'LineString') {
        return {
            color: feature.properties['stroke'],
            width: feature.properties['stroke-width'],
            opacity: feature.properties['opacity'],
        };
    } else {
        return {
            color: feature.properties['fill'],
            width: feature.properties['stroke-width'],
            opacity: feature.properties['opacity'],
            fillColor: feature.properties['fill'],
            fillOpacity: feature.properties['fill-opacity'],
        };
    }
}

function setLegendByType(feature) {
    let type = feature.geometry.type;
    let name = feature.properties.name;
    let color;

    if (type === 'LineString') {
        color = feature.properties.stroke;
    } else if (type === 'GeometryCollection') {
        color = feature.properties.fill;
    }

    return { name: name, color: color, type: type };
}

export default MapLoadedLayers;
