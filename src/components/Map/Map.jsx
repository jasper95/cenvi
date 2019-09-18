import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet';
import 'leaflet-easyprint';
import 'leaflet-draw';
import 'leaflet-ajax';
import 'leaflet-easybutton';
import { Row, Col } from 'reactstrap';
import MapSidebar from '../MapSidebar/MapSidebar';
import './Map.css';

const mapPosition = [10.9, 123.9];

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            m: null,
            mapAdded: false,
            drawnItems: null,
            baseLayers: null,
            baseMap1: null,
            baseMap2: null,
            baseMap3: null,
            baseMap4: null,
            baseMap5: null,
            baseMap6: null,
        };
    }

    render() {
        let mapAdded = this.state.mapAdded;
        return (
            <div id="mapsMainDiv">
                <Row>
                    <Col xs="12" sm="12" md="12" lg="3" id="sideBarMapsCol">
                        {mapAdded && (
                            <div>
                                <MapSidebar map={this.state.m} />
                            </div>
                        )}
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="9" id="map-container">
                        <div id="map" />
                    </Col>
                </Row>
            </div>
        );
    }

    componentDidMount() {
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            osmAttrib =
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            mapBoxUrl =
                'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
            mapBoxAttrib =
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            googleSatUrl = 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            googleStreets = 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            googleHybrid =
                'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
            googleTerrain = 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';

        var m = null;

        var that = this;

        var baseMap1 = L.tileLayer(mapBoxUrl, {
                attribution: mapBoxAttrib,
                continuousWorld: false,
                maxZoom: 19,
                minZoom: 4,
                id: 'mapbox.streets',
                accessToken:
                    'pk.eyJ1IjoiYXNhbGJvcmVzIiwiYSI6ImNqaWptYm1yNDFiOXAzcXJ2Z3VhYWpsdm8ifQ.Qy1LHYXNKcbP2R1RDZO0zA',
            }),
            baseMap2 = L.tileLayer(osmUrl, {
                attribution: osmAttrib,
                continuousWorld: false,
                maxZoom: 19,
                minZoom: 4,
            }),
            baseMap3 = L.tileLayer(googleSatUrl, {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                continuousWorld: false,
                maxZoom: 19,
                minZoom: 4,
            }),
            baseMap4 = L.tileLayer(googleHybrid, {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                continuousWorld: false,
                maxZoom: 19,
                minZoom: 4,
            }),
            baseMap5 = L.tileLayer(googleStreets, {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                continuousWorld: false,
                maxZoom: 20,
                minZoom: 4,
            }),
            baseMap6 = L.tileLayer(googleTerrain, {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                continuousWorld: false,
                maxZoom: 19,
                minZoom: 4,
            });

        m = L.map('map', {
            layers: [baseMap2],
        }).setView(mapPosition, 8);
        var baseLayers = {
            Mapbox: baseMap1,
            'OSM Mapnik': baseMap2,
            'Google Satellite': baseMap3,
            'Google Hybrid': baseMap4,
            'Google Streets': baseMap5,
            'Google Terrain': baseMap6,
        };

        L.control.layers(baseLayers).addTo(m);

        var popup = L.popup();

        /* Coordinates */
        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent('You clicked the map at ' + e.latlng.toString())
                .openOn(that.state.m);
        }

        m.on('click', onMapClick);

        var printer = L.easyPrint({
            tileLayer: baseMap1,
            sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
            filename: 'myMap',
            exportOnly: true,
            hideClasses: ['leaflet-control-easyPrint'],
            hideControlContainer: true,
        });
        printer.addTo(m);

        /* MEASURES */
        var drawnItems = new L.FeatureGroup();
        m.addLayer(drawnItems);
        var drawControl = new L.Control.Draw({
            position: 'bottomright',
            draw: {
                polygon: {
                    shapeOptions: {
                        color: 'purple',
                    },
                },
                polyline: {
                    shapeOptions: {
                        color: 'red',
                    },
                },
                rect: {
                    shapeOptions: {
                        color: 'green',
                    },
                },
                circle: {
                    shapeOptions: {
                        color: 'steelblue',
                    },
                },
            },
            edit: {
                featureGroup: drawnItems,
            },
        });

        m.addControl(drawControl);
        m.on('draw:created', function(e) {
            var layer = e.layer;
            drawnItems.addLayer(layer);
        });

        var easyButton = L.easyButton('fa-home', function(btn, m) {
            m.setView(mapPosition, 8);
        });
        easyButton.addTo(m);

        this.setState({
            m: m,
            baseMap: m,
            mapAdded: true,
        });
    }
}

export default Map;
