import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import 'leaflet-ajax';
import './MapLegends.css';

const polygonStr = 'geometrycollection';
const lineStr = 'linestring';
const pointStr = 'point';

class MapLegends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            legends: [],
            shapefile_names: [],
        };
    }

    render() {
        let legend = this.props.legend;
        let shapefile_name = this.props.shapefile_name;

        return (
            <div>
                <Container className="maps-layers">
                    <Row>
                        <h6 className="legend-title">• {shapefile_name}</h6>
                    </Row>
                    <Row>
                        <label className="label">
                            <div>
                                {legend.map((value, idx) => {
                                    if (
                                        value.type.toLowerCase() === polygonStr
                                    ) {
                                        return (
                                            <div key={idx}>
                                                <div className="legend-container">
                                                    <div
                                                        id="polygonIcon"
                                                        style={{
                                                            background:
                                                                value.color,
                                                            color: value.color,
                                                        }}
                                                    />
                                                    {value.name}
                                                </div>
                                            </div>
                                        );
                                    } else if (
                                        value.type.toLowerCase() === lineStr
                                    ) {
                                        return (
                                            <div key={idx}>
                                                <div className="legend-container">
                                                    <div
                                                        id="lineIcon"
                                                        style={{
                                                            background:
                                                                value.color,
                                                            color: value.color,
                                                        }}
                                                    />
                                                    {value.name}
                                                </div>
                                            </div>
                                        );
                                    } else if (
                                        value.type.toLowerCase() === pointStr
                                    ) {
                                        return (
                                            <div key={idx}>
                                                <div className="legend-container">
                                                    <div
                                                        id="pointIcon"
                                                        style={{
                                                            background:
                                                                value.color,
                                                            color: value.color,
                                                        }}
                                                    />
                                                    {value.name}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </label>
                    </Row>
                </Container>
            </div>
        );
    }

    componentDidMount() {}
}

export default MapLegends;
