import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import 'leaflet-ajax';
import MapCategories from '../MapCategories/MapCategories';
import MapLoadedLayers from '../MapLoadedLayers/MapLoadedLayers';
import MapLegends from '../MapLegends/MapLegends';
import MapSearch from '../MapSearch/MapSearch';
import './MapSidebar.css';

const shapefiles_categories = [
    'All',
    'Disaster Risk',
    'Social',
    'Political',
    'Economical',
    'Environmental',
    'Others',
];

class MapSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedLayersIds: [],
            id: '',
            legends: [],
            shapefile_name: '',
        };
    }

    updateLoadedLayers(addedLayerId) {
        let newLoadedLayers = this.state.loadedLayersIds.slice();
        if (!this.state.loadedLayersIds.includes(addedLayerId)) {
            newLoadedLayers.push(addedLayerId);
            this.setState({ loadedLayersIds: newLoadedLayers });
        }
    }

    updateLegends(id, shapefile_name, legend) {
        let newLegends = this.state.legends;
        let legendExists = newLegends.find(x => x.id === id);

        if (!legendExists && shapefile_name.length) {
            newLegends.push({
                id: id,
                shapefile_name: shapefile_name,
                legend: legend,
            });
            this.setState({ legends: newLegends });
        }
    }

    render() {
        return (
            <div id="sideBar">
                <Row>
                    <Col className="sidebar-title" xs="12">
                        <h1 className="maps-label">Map Viewer</h1>
                    </Col>
                    <Col className="sidebar-layerTitle" xs="12">
                        <p className="panel-heading">Available Layers</p>
                    </Col>
                    <Col className="sidebar-search" xs="12">
                        <MapSearch
                            updateLoadedLayers={this.updateLoadedLayers.bind(
                                this,
                            )}
                        />
                    </Col>
                    <Col className="sidebar-box1" xs="12">
                        <Row>
                            <Col className="sidebar-tabs" xs="4">
                                {shapefiles_categories.map((category, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className="sidebar-space">
                                            <button
                                                className="sidebar-buttons"
                                                id={
                                                    'categoryShapefileBtn' + idx
                                                }
                                                onClick={() =>
                                                    collapseShow(idx)
                                                }>
                                                {category}
                                            </button>
                                        </div>
                                    );
                                })}
                            </Col>
                            <Col className="sidebar-layers" xs="8">
                                <div className="layers1">
                                    {shapefiles_categories.map(
                                        (category, idx) => {
                                            return (
                                                <div
                                                    id={
                                                        'categoryShapefile' +
                                                        idx
                                                    }
                                                    style={{ display: 'none' }}
                                                    key={idx}>
                                                    <MapCategories
                                                        category={category}
                                                        key={idx}
                                                        updateLoadedLayers={this.updateLoadedLayers.bind(
                                                            this,
                                                        )}
                                                    />
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="sidebar-layerTitle" xs="12">
                        <p className="panel-heading1">Loaded Layers</p>
                    </Col>
                    <Col className="sidebar-box2" xs="12">
                        <div className="layers2">
                            {this.state.loadedLayersIds.map(
                                (loadedLayerId, idx) => {
                                    return (
                                        <div key={idx}>
                                            <MapLoadedLayers
                                                loadedLayerId={loadedLayerId}
                                                map={this.props.map}
                                                updateLegends={this.updateLegends.bind(
                                                    this,
                                                )}
                                            />
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </Col>
                    <Col className="sidebar-layerTitle" xs="12">
                        <p className="panel-heading1">Legend</p>
                    </Col>
                    <Col className="sidebar-box3" xs="12">
                        <div className="layers3">
                            {this.state.legends.map(legend => {
                                return (
                                    <div
                                        style={{ display: 'inline-block' }}
                                        key={legend.id}>
                                        <MapLegends
                                            shapefile_name={
                                                legend.shapefile_name
                                            }
                                            legend={legend.legend}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

function collapseShow(categoryId) {
    for (var i = 0; i < shapefiles_categories.length; i++) {
        if (i === categoryId) {
            document.getElementById(
                'categoryShapefile' + categoryId,
            ).style.display = 'block';
            document.getElementById(
                'categoryShapefileBtn' + categoryId,
            ).style.background = '#34495e';
            document.getElementById(
                'categoryShapefileBtn' + categoryId,
            ).style.color = '#fff';
        } else {
            document.getElementById('categoryShapefile' + i).style.display =
                'none';
            document.getElementById(
                'categoryShapefileBtn' + i,
            ).style.background = '#fff';
            document.getElementById('categoryShapefileBtn' + i).style.color =
                '#000';
        }
    }
}

export default MapSidebar;
