import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './Downloads.css';

const apiURL = process.env.REACT_APP_API_HOST_PORT;

class Downloads extends Component {
    state = {
      downloads: [],
      categories: [],
    };

    componentDidMount() {
      // this.getDownloads();
      // this.getDownloadCategories();
    }

    getDownloads = (_) => {
      fetch(`${apiURL}/download`, { credentials: 'include' })
        .then(response => response.json())
        .then(response => this.setState({ downloads: response.data }))
        .catch(err => console.error(err));
    };

    getDownloadCategories = (_) => {
      fetch(`${apiURL}/download-category`, { credentials: 'include' })
        .then(response => response.json())
        .then(response => this.setState({ categories: response.data }))
        .catch(err => console.error(err));
    };

    render() {
      const { downloads, categories } = this.state;

      return (
          <div id="downloads-container">
              <h1>DOWNLOADS</h1>
              <Row>
                  <Col xs="12" sm="12" md="4" className="col-categories">
                      <div id="category-container">
                          {categories.map((category) => {
                                return (
                                    <div key={category.id}>
                                        <CategoryButton
                                            categoryName={category.name}
                                            key={category.id}
                                            id={category.id}
                                            categoriesSize={categories.length}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </Col>
                  <Col xs="12" sm="12" md="8" className="col-downloads">
                      {downloads.map((download, id) => {
                            return (
                                <Download
                                    titleFile={'• ' + download.title}
                                    hrefVal={
                                        apiURL +
                                        '/download/uid/' +
                                        download.uid +
                                        '/filename/' +
                                        download.filename
                                    }
                                    key={id}
                                    id={download.category}
                                />
                            );
                        })}
                    </Col>
                </Row>
            </div>
      );
    }
}

function Download(props) {
  return (
      <div>
          <Col xs="12" sm="12">
              <div
                  id="collapse"
                  key={props.id}
                  className={`dowload-file collapse${  props.id}`}
                  style={{ display: 'none' }}
                >
                  <a href={props.hrefVal} className="download-link">
                      {props.titleFile}
                    </a>
                </div>
            </Col>
        </div>
  );
}

function CategoryButton(props) {
  return (
      <div
          className="btn btn-info btn-category"
          data-toggle="collapse"
          role="button"
          id={`button${  props.id}`}
          onClick={() => chooseCatDisplay(props.id, props.categoriesSize)}
        >
          {props.categoryName}
          <span className="arrow">❯</span>
        </div>
  );
}

function chooseCatDisplay(id, categoriesSize) {
  collapseShow(id, categoriesSize);
  changeBtnBackgrnd(id, categoriesSize);
}

function changeBtnBackgrnd(id, categoriesSize) {
  for (let i = 1; i <= categoriesSize; i++) {
    if (id === i) {
      document.getElementById(`button${  id}`).style.background = '#bdc3c7';
    } else {
      document.getElementById(`button${  i}`).style.background = '#f5f6fa';
    }
  }
}

function collapseShow(id, categoriesSize) {
  let i; var j; var 
elements;
  for (i = 1; i <= categoriesSize; i++) {
    if (id === i) {
      elements = document.getElementsByClassName(`collapse${  id}`);
      for (j = 0; j < elements.length; j++) {
        elements[j].style.display = 'block';
      }
    } else {
      elements = document.getElementsByClassName(`collapse${  i}`);
      for (j = 0; j < elements.length; j++) {
        elements[j].style.display = 'none';
      }
    }
  }
}

export default Downloads;
