import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
          <div>
              <div id="padding" />
              <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                  <Link className="navbar-brand" to="/">
                        CENVI
                    </Link>
                  <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapsingNavbar"
                    >
                      <span className="navbar-toggler-icon" />
                    </button>

                  <div
                      className="navbar-collapse collapse"
                      id="collapsingNavbar"
                    >
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <a className="nav-link" href="/#section-header">
                                    HOME
                                </a>
                            </li>
                          <li className="nav-item">
                              <div className="dropdown ml-auto nav-account">
                                  <button
                                      className="nav-link dropdown-toggle"
                                      data-toggle="dropdown"
                                    >
                                        FILES
                                    </button>
                                  <div className="dropdown-menu">
                                      <a
                                          className="nav-link dropdown-item"
                                          href="/#section-downloads"
                                        >
                                            Downloads
                                        </a>
                                      <Link
                                          className="nav-link dropdown-item"
                                          to="/upload/shapefile"
                                        >
                                            Upload Shapefile
                                        </Link>
                                      <Link
                                          className="nav-link dropdown-item"
                                          to="/upload/file"
                                        >
                                            Upload File
                                        </Link>
                                    </div>
                                </div>
                            </li>

                          <li className="nav-item">
                              <Link className="nav-link" to="/sub-projects">
                                    SUB-PROJECTS
                                </Link>
                            </li>

                          <li className="nav-item">
                              <Link className="nav-link" to="/map">
                                    MAPS
                                </Link>
                            </li>

                          <li className="nav-item">
                              <Link className="nav-link" to="/blogs">
                                    BLOGS
                                </Link>
                            </li>

                          <li className="nav-item">
                              <Link className="nav-link" to="/albums">
                                    ALBUMS
                                </Link>
                            </li>

                          <li className="nav-item">
                              <a
                                  className="nav-link"
                                  href="/#section-collaborators"
                                >
                                    COLLABORATORS
                                </a>
                            </li>

                          <li className="nav-item">
                              <div className="dropdown ml-auto nav-account">
                                  <button
                                      className="nav-link dropdown-toggle"
                                      data-toggle="dropdown"
                                    >
                                        ABOUT
                                    </button>
                                  <div className="dropdown-menu">
                                      <a
                                          className="nav-link dropdown-item"
                                          href="/#section-about"
                                        >
                                            About Us
                                        </a>
                                      <Link
                                          className="nav-link dropdown-item"
                                          to="/team"
                                        >
                                            Team
                                        </Link>
                                      <a
                                          className="nav-link dropdown-item"
                                          href="/#section-contact"
                                        >
                                            Contact Us
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>

                      <div className="dropdown ml-auto nav-account">
                          <button
                              className="nav-link dropdown-toggle"
                              data-toggle="dropdown"
                            >
                                USER
                            </button>
                          <div className="dropdown-menu">
                              <Link className="dropdown-item" to="/login">
                                    Login
                                </Link>
                              <Link className="dropdown-item" to="/register">
                                  {' '}
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
    );
  }
}

export default Navbar;
