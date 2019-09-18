import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import MapShapefiles from '../MapShapefiles/MapShapefiles';
import './MapSearch.css';

const apiURL = process.env.REACT_APP_API_HOST_PORT;

class MapSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchVal: '',
            allShapefilesIds: [],
        };
    }

    filterUpdate() {
        var searchValue = this.refs.val.value;
        if (searchValue === '') {
            document.getElementById('shapefilesUl').style.display = 'none';
        } else {
            document.getElementById('shapefilesUl').style.display = 'block';
            document.getElementById('shapefilesUl').style.zIndex = '2';
        }
        var searchValueSpaceRep = searchValue.split(' ').join('%20');
        fetch(
            `${apiURL}/shapefiles/searchVal?searchVal=${searchValueSpaceRep}`,
            { credentials: 'include' },
        )
            .then(resposne => resposne.json())
            .then(resposne =>
                this.setState({ allShapefilesIds: resposne.data }),
            );
    }

    render() {
        return (
            <div>
                <form>
                    <input
                        id="searchBox"
                        type="text"
                        placeholder="Search for..."
                        ref="val"
                        onChange={this.filterUpdate.bind(this)}
                    />
                </form>
                <div id="shapefilesUl">
                    {this.state.allShapefilesIds.map((shapefile, idx) => {
                        return (
                            <div key={idx}>
                                <Container className="search-layers" key={idx}>
                                    <Row>
                                        <MapShapefiles
                                            id={shapefile.id}
                                            updateLoadedLayers={
                                                this.props.updateLoadedLayers
                                            }
                                        />
                                    </Row>
                                </Container>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            componentDidMount: true,
        });
    }
}

export default MapSearch;
