import React, { Component } from 'react';
import './SubProjects.css';

class SubProjects extends Component {
    render() {
        return (
            <div id="sub-projects-page-container">
                <div id="page-header">
                    <h1>SUB-PROJECTS</h1>
                    <hr />
                    <p id="description" xs="12" sm="12">
                        The field of environmental informatics uses analytical
                        and ICT-based methods to monitor, assess, and protect
                        natural resources. UP Cebu's Center for Environmental
                        Informatic intends to contribute in strengthening the
                        leadership of Central Visayas in the ICT industry,
                        particularly in the emerging fields of data science,
                        remote sensing, and artificial intelligence by
                        contributing to environmental conservation, research,
                        and development. Under CENVI are these sub-projects:
                    </p>
                </div>
                <div id="sub-projects-container" xs="12" sm="12">
                    <div className="sub-project-container">
                        <h1>
                            MANGO MONITORING USING MICROCONTROLLER-BASED SENSOR
                            SYSTEMS
                        </h1>
                        <div className="sub-project-details">
                            <div className="sub-project-img">
                                <img
                                    src="images/sub-projects/mango.png"
                                    alt="mango"
                                />
                            </div>
                            <div className="sub-projects-objectives">
                                <p>Project Objectives:</p>
                                <ul>
                                    <li>
                                        Develop affordable microcontroller-based
                                        sensor systems (pole/UAV) for
                                        high-throughput monitoring and early
                                        warning against infestation and disease
                                        in mango tree plantations in Bohol,
                                        Bantayan, Siquijor, and Guimaras.
                                    </li>
                                    <li>
                                        Develop a spectral signature database of
                                        mango plant diseases and infestation.
                                    </li>
                                    <li>
                                        Spatial distribution map and analyses of
                                        mango pests and diseases in Cebu.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="sub-project-container">
                        <h1>CEBU BIODIVERSITY SPATIAL INFORMATION STUDY</h1>
                        <div className="sub-project-details">
                            <div className="sub-project-img">
                                <img
                                    src="images/sub-projects/tree.png"
                                    alt="tree"
                                />
                            </div>
                            <div className="sub-project-objectives">
                                <p>Project Objectives:</p>
                                <ul>
                                    <li>
                                        Inventory the native trees including the
                                        centennial mango trees in Cebu Island.
                                    </li>
                                    <li>
                                        Assess the environmental risk profiles
                                        of the native trees including the
                                        centennial mango trees in Cebu Island.
                                    </li>
                                    <li>
                                        Propose measures for the protection and
                                        conservation of native trees and
                                        centennial mango trees.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="sub-project-container">
                        <h1>CEBU WATER SOURCE MAPPING AND ASSESSMENT</h1>
                        <div className="sub-project-details">
                            <div className="sub-project-img">
                                <img
                                    src="images/sub-projects/droplet.png"
                                    alt="droplet"
                                />
                            </div>
                            <div className="sub-projects-objectives">
                                <p>Project Objectives:</p>
                                <ul>
                                    <li>
                                        Generate maps of potential water sources
                                        in Cebu.
                                    </li>
                                    <li>
                                        Characterize discharge/recharge profile
                                        of major river basins.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubProjects;
